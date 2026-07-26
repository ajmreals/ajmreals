"use client";

// Renders a timestamp in the VIEWER's timezone.
//
// Server components format dates in the server's timezone (UTC on Railway),
// client components in the browser's. Mixing the two made a lead's "Received"
// time and its notes appear hours apart. Everything user-facing goes through
// here so the clock is consistent.
export default function LocalTime({
  iso,
  relative = false,
}: {
  iso: string;
  relative?: boolean;
}) {
  return (
    <span suppressHydrationWarning>
      {relative ? formatRelative(iso) : new Date(iso).toLocaleString()}
    </span>
  );
}

function formatRelative(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
