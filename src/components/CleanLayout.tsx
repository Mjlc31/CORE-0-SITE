import { ReactNode } from 'react';
import { CoreLogo } from './CoreLogo';

export function CleanLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-core-black text-white selection:bg-core-neon selection:text-black relative flex flex-col font-sans">
      {/* Noise Texture Background */}
      <div className="bg-noise opacity-50 mix-blend-overlay pointer-events-none absolute inset-0 z-0" />
      
      {/* Subtle Gradient Glow in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-core-neon/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Very minimal header just for branding */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-8 md:py-12">
          <div className="flex items-center gap-3">
            <CoreLogo className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
            <span className="font-display font-black text-xl md:text-2xl tracking-tighter opacity-90">CORE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
