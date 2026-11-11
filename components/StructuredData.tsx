import { SITE_URL, site } from "@/lib/site";

/**
 * Structured data for search engines and AI answer engines.
 *
 * ProfessionalService (a LocalBusiness subtype) rather than plain
 * LocalBusiness: AJM serves a region rather than trading from a storefront,
 * so there is no postal address to publish. areaServed carries that instead.
 */
export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: site.name,
        description: site.description,
        url: SITE_URL,
        email: site.email,
        telephone: site.phone,
        foundingDate: site.founded,
        priceRange: site.priceRange,
        image: `${SITE_URL}/opengraph-image`,
        sameAs: [site.instagram],
        areaServed: site.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        // The certificate the FAA requires for commercial drone work. Worth
        // publishing as structured data rather than only as prose: it's the
        // first thing a brokerage's compliance desk asks about.
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "FAA Part 107 Remote Pilot Certificate",
          credentialCategory: "license",
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Federal Aviation Administration",
          },
        },
        knowsAbout: [
          "Real estate videography",
          "Listing walkthrough video",
          "Drone aerial photography",
          "Real estate photography",
          "2D floor plans",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Real estate content packages",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Single listing film",
              description:
                "One cinematic walkthrough video for homes up to 1,000 sq ft, delivered within 4 days of the shoot. Photos and a 2D floor plan available as add-ons.",
              price: "500",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Starter retainer",
              description:
                "2 videos a month plus edited photography and drone aerials, delivered within 4 days of each shoot. Month to month, no minimum term.",
              price: "1250",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Growth retainer",
              description:
                "5 videos a month plus edited photography, drone and social cuts, delivered within 4 days of each shoot. 3-month minimum.",
              price: "2875",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Partner retainer",
              description:
                "10 videos a month plus edited photography, drone, social cuts and usage rights, delivered within 4 days of each shoot. 6-month minimum.",
              price: "5250",
              priceCurrency: "USD",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Built from our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
