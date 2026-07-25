import type { Metadata } from "next";

// Private area — must never be indexed. Applies to the login page too.
export const metadata: Metadata = {
  title: "CRM — AJM Reals",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
