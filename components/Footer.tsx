import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-sans font-medium text-[#F5F5F5]">AJM Reals</p>
            <p className="text-[#888] text-sm mt-1">
              Cinematic video, drone &amp; photography for real estate.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link
              href="/portfolio"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              Work
            </Link>
            <a
              href="/#packages"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              Packages
            </a>
            <Link
              href="/contact"
              className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
            {/* TODO: Add social media links */}
            &copy; {new Date().getFullYear()} AJM Reals
          </p>
          <p className="text-[#888] text-xs">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
