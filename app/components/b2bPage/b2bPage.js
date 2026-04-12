import { CTASection } from "./cta-section";
import { FeaturesSection } from "./featuresSection";
import { Footer } from "./footer";
import { HeroSection } from "./heroSection";
import { HowItWorksSection } from "./how-it-works-section";
import { Navbar } from "./navbar/navbar";
import { PricingSection } from "./pricing-section";
import { TestimonialsSection } from "./testimonials-section";


export default function B2bPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}