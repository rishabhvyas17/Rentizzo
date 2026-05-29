import { LandingNav } from './components/LandingNav';
import { HeroSection } from './sections/HeroSection';
import { LocationBrowse } from './sections/LocationBrowse';
import { ValueProps } from './sections/ValueProps';
import { ListProperty } from './sections/ListProperty';
import { Footer } from './sections/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingNav />

      {/* Main content */}
      <main>
        {/* Search hero — the primary action */}
        <HeroSection />

        {/* Browse by college & area */}
        <LocationBrowse />

        {/* Why Rentizzo — honest value props */}
        <ValueProps />

        {/* For owners, managers, brokers */}
        <ListProperty />
      </main>

      {/* Footer with SEO links */}
      <Footer />
    </div>
  );
}
