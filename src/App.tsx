/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Layout } from './components/Layout';
import { HeroSection } from './components/HeroSection';
import { CoreAcronym } from './components/CoreAcronym';
import { BentoBox } from './components/BentoBox';
import { MarketStrategy } from './components/MarketStrategy';
import { TerminalFooter } from './components/TerminalFooter';

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <CoreAcronym />
      <BentoBox />
      <MarketStrategy />
      <TerminalFooter />
    </Layout>
  );
}
