/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navigation from './components/Navigation';
import DetectionPanel from './components/DetectionPanel';
import FeatureGrid from './components/FeatureGrid';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-neon-lime selection:text-true-black">
      <Navigation />
      
      <main className="flex-1 lg:max-w-7xl lg:mx-auto w-full pt-16 px-6 pb-6 grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar (Left) */}
        <aside className="hidden lg:flex flex-col gap-6 pt-6 overflow-y-auto">
          <FeatureGrid />
        </aside>

        {/* Main Content (Right) */}
        <section className="flex flex-col gap-6 pt-6 overflow-y-auto">
          <DetectionPanel />
          
          {/* Mobile version of features */}
          <div className="lg:hidden">
            <FeatureGrid />
          </div>

          <footer className="py-8 mt-auto border-t border-border-dim text-center">
            <div className="flex items-center justify-center gap-4 text-text-dim text-[10px] font-bold uppercase tracking-widest">
              <span>TRAFFIC AI ENGINE</span>
              <span className="w-1 h-1 bg-border-dim rounded-full" />
              <span>© 2026</span>
              <span className="w-1 h-1 bg-border-dim rounded-full" />
              <span className="text-neon-lime/40">GTSRB V2.0</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
