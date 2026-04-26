import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Pricing from "@/components/sections/Pricing";
import WhyAJM from "@/components/sections/WhyAJM";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Pricing />
      <WhyAJM />
      <HowItWorks />
      <CTABanner />
    </main>
  );
}
