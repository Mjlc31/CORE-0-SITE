import { HeroSection } from '../components/HeroSection';
import { CoreAcronym } from '../components/CoreAcronym';
import { BentoBox } from '../components/BentoBox';
import { MarketStrategy } from '../components/MarketStrategy';

export function Home() {
  return (
    <>
      <HeroSection />
      <CoreAcronym />
      <BentoBox />
      <MarketStrategy />
    </>
  );
}
