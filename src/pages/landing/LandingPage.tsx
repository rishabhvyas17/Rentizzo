import { LandingNav } from './components/LandingNav';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { EcosystemSection } from './sections/EcosystemSection';
import { FeaturesGrid } from './sections/FeaturesGrid';
import { SocialProof } from './sections/SocialProof';
import { HowItWorks } from './sections/HowItWorks';
import { CTASection } from './sections/CTASection';
import { Footer } from './sections/Footer';

export function LandingPage() {
  return (
    <div className="relative">
      {/* Navigation — always on top */}
      <LandingNav />

      {/* ACT 1: Cinematic Hero */}
      <HeroSection />

      {/* ACT 2: The Problem Statement */}
      <ProblemSection />

      {/* ACT 3: The Ecosystem Reveal */}
      <EcosystemSection />

      {/* ACT 4: Features Bento Grid */}
      <FeaturesGrid />

      {/* ACT 5: Social Proof */}
      <SocialProof />

      {/* ACT 6: How It Works */}
      <HowItWorks />

      {/* ACT 7: The Closer */}
      <CTASection />

      {/* ACT 8: Footer */}
      <Footer />
    </div>
  );
}
