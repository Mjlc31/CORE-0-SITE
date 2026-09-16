/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CleanLayout } from './components/CleanLayout';
import { Home } from './pages/Home';
import { Manifesto } from './pages/Manifesto';
import { Chassi } from './pages/Chassi';
import { Mercados } from './pages/Mercados';
import { Auditoria } from './pages/Auditoria';
import { Diagnostico } from './pages/Diagnostico';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Institucional (Com Header e Footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/manifesto" element={<Layout><Manifesto /></Layout>} />
        <Route path="/chassi" element={<Layout><Chassi /></Layout>} />
        <Route path="/mercados" element={<Layout><Mercados /></Layout>} />
        
        {/* Landing Pages (Sem menus superiores ou distrações) */}
        <Route path="/auditoria" element={<CleanLayout><Auditoria /></CleanLayout>} />
        <Route path="/diagnostico" element={<CleanLayout><Diagnostico /></CleanLayout>} />
      </Routes>
    </Router>
  );
}
