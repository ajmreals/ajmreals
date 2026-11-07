import Link from "next/link";

// The lead detail page calls notFound() for an id that isn't in the database.
// Without this, that fell through to the public 404 and showed a signed-in
// operator the marketing site's navigation.
export default function AdminNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-4">
        404
      </p>
      <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-3">
        That lead isn&apos;t here.
      </h1>
      <p className="text-[#888] text-sm leading-relaxed mb-8">
        It may have been deleted, or the link may be stale — lead links from
        old alert emails stop working once a lead is removed.
      </p>
      <Link
        href="/admin"
        className="inline-block text-sm text-[#888] border border-[#222] px-5 py-2.5 rounded hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
      >
        ← All leads
      </Link>
    </div>
  );
}
