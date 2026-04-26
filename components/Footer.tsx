import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-semibold text-[#F5F5F5]">AJM Reals</p>
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
        <div className="mt-8 pt-6 border-t border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
            &copy; {new Date().getFullYear()} AJM Reals
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:acruz928@gmail.com"
              className="text-[#888] text-xs hover:text-[#F5F5F5] transition-colors"
            >
              acruz928@gmail.com
            </a>
            <a
              href="tel:+13477887898"
              className="text-[#888] text-xs hover:text-[#F5F5F5] transition-colors"
            >
              347-788-7898
            </a>
            <a
              href="https://instagram.com/ajmreals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] text-xs hover:text-[#F5F5F5] transition-colors"
            >
              @ajmreals
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
