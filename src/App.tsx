/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Manifesto } from './pages/Manifesto';
import { Chassi } from './pages/Chassi';
import { Mercados } from './pages/Mercados';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/chassi" element={<Chassi />} />
          <Route path="/mercados" element={<Mercados />} />
        </Routes>
      </Layout>
    </Router>
  );
}
