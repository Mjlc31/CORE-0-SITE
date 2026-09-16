import { HeroSection } from '../components/HeroSection';
import { CoreAcronym } from '../components/CoreAcronym';
import { BentoBox } from '../components/BentoBox';
import { SocialProof } from '../components/SocialProof';
import { ProcessSteps } from '../components/ProcessSteps';
import { MarketStrategy } from '../components/MarketStrategy';
import { MidPageCTA } from '../components/MidPageCTA';

export function Home() {
  return (
    <>
      <HeroSection />
      <CoreAcronym />
      <BentoBox />
      <SocialProof />
      <ProcessSteps />
      <MarketStrategy />
      <MidPageCTA />
    </>
  );
}
