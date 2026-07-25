import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Public marketing shell. The CRM under /admin deliberately does not use this.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
