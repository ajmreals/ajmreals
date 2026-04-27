import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import WhyAJM from "@/components/sections/WhyAJM";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <WhatWeDo />
      <FeaturedWork />
      <Testimonials />
      <Pricing />
      <WhyAJM />
      <HowItWorks />
      <CTABanner />
    </main>
  );
}
