"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget.
 *
 * Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the forms
 * behave exactly as before until Cloudflare is configured.
 *
 * The pairing matters and is easy to get wrong. lib/turnstile.ts rejects a
 * submission with no token as soon as TURNSTILE_SECRET_KEY exists. Without
 * this component the token never arrives, so setting the secret would reject
 * every real inquiry while the form looked completely normal. Both variables
 * go in together or neither does.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";

export default function Turnstile({
  onToken,
}: {
  /** Called with the token, or "" when it expires and must be solved again. */
  onToken: (token: string) => void;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep the newest callback without re-rendering the widget on every keystroke.
  const cb = useRef(onToken);
  cb.current = onToken;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!siteKey || !box.current) return;
    const el = box.current;

    const render = () => {
      if (!window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(el, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token: string) => cb.current(token),
        // A solved token is only good for a few minutes. Clearing it forces a
        // fresh challenge rather than letting the form submit a stale one.
        "expired-callback": () => cb.current(""),
        "error-callback": () => {
          cb.current("");
          setFailed(true);
        },
      });
    };

    if (window.turnstile) {
      render();
    } else {
      window.onTurnstileLoad = render;
      if (!document.getElementById(SCRIPT_ID)) {
        const s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        // Cloudflare blocked or offline. The server fails open in that case,
        // and the other three spam layers still apply.
        s.onerror = () => setFailed(true);
        document.head.appendChild(s);
      }
    }

    return () => {
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div>
      <div ref={box} />
      {failed && (
        <p className="text-[#888] text-xs mt-2">
          Verification could not load. You can still send this — we check
          submissions on our side too.
        </p>
      )}
    </div>
  );
}
