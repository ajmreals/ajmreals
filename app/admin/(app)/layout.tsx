import Link from "next/link";
import { signOut } from "../actions";

// Chrome for the signed-in CRM. The login page sits outside this group.
export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#222] sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="font-heading font-semibold text-[#F5F5F5] tracking-tight"
          >
            AJM Reals
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent align-middle">
              CRM
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
