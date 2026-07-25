"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }

    router.push(params.get("next") || "/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="login-email"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#0A0A0A] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="login-password"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#0A0A0A] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-[#E8756B] bg-[#E8756B]/10 border border-[#E8756B]/25 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="bg-accent text-[#06231F] font-medium py-3.5 rounded text-sm hover:bg-accent-light transition-all disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
            AJM Reals
          </p>
          <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5]">
            Sign in to your CRM.
          </h1>
        </div>

        <div className="bg-[#141414] border border-[#222] shadow-card rounded-xl p-8">
          <Suspense
            fallback={<p className="text-[#888] text-sm">Loading…</p>}
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
