/**
 * Cloudflare Turnstile verification.
 *
 * Inactive until TURNSTILE_SECRET_KEY is set, so the forms keep working
 * before Cloudflare is configured. Once the key exists, a missing or invalid
 * token is rejected — so setting the secret without also rendering the widget
 * (NEXT_PUBLIC_TURNSTILE_SITE_KEY) would block every submission.
 */
const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured — nothing to check

  if (!token) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      // Never let a slow Cloudflare hang a form submission.
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    // Cloudflare unreachable. Accept rather than lose a real inquiry — the
    // other layers (schema, honeypot, rate limit) still apply.
    console.error("[turnstile] verification failed open:", (err as Error).message);
    return true;
  }
}
