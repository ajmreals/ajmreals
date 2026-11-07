import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribe } from "./actions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

// Confirmation step on purpose. Mail clients prefetch links to scan them, so
// a GET that unsubscribed on load would silently opt people out of emails
// they never chose to leave. The actual change happens on POST.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { id?: string; state?: string };
}) {
  const { state } = searchParams;
  // Reject a malformed id here rather than after the visitor clicks.
  const id =
    searchParams.id && UUID.test(searchParams.id) ? searchParams.id : undefined;

  const content =
    state === "done" ? (
      <>
        <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-3">
          You&apos;re unsubscribed.
        </h1>
        <p className="text-[#888] text-sm leading-relaxed">
          You won&apos;t get any more emails from us. If you ever want back in,
          just email{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-[#F5F5F5]"
          >
            {site.email}
          </a>
          .
        </p>
      </>
    ) : state === "error" ? (
      <>
        <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-3">
          That didn&apos;t work.
        </h1>
        <p className="text-[#888] text-sm leading-relaxed">
          Something went wrong on our end. Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-[#F5F5F5]"
          >
            {site.email}
          </a>{" "}
          and we&apos;ll take you off the list by hand.
        </p>
      </>
    ) : !id ? (
      <>
        <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-3">
          Link incomplete.
        </h1>
        <p className="text-[#888] text-sm leading-relaxed">
          This link is missing the part that identifies you. Use the
          unsubscribe link at the bottom of one of our emails, or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-[#F5F5F5]"
          >
            {site.email}
          </a>
          .
        </p>
      </>
    ) : (
      <>
        <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-3">
          Stop receiving emails?
        </h1>
        <p className="text-[#888] text-sm leading-relaxed mb-8">
          We&apos;ll take you off the list straight away. Your inquiry stays
          with us so we can still reply if you reach out.
        </p>
        <form action={unsubscribe}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="bg-accent text-[#06231F] font-medium px-6 py-3 rounded text-sm hover:bg-accent-light transition-all"
          >
            Yes, unsubscribe me
          </button>
        </form>
      </>
    );

  return (
    <main id="main-content" className="min-h-[70vh] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-4">
            {site.name}
          </p>
          {content}
          <div className="mt-10 pt-8 border-t border-[#222]">
            <Link
              href="/"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              ← Back to the site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
