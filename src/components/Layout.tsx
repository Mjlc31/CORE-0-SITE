import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { MagneticWrapper } from './MagneticWrapper';

export function Layout({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      setIsHovering(window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button');
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="min-h-screen bg-core-black text-white selection:bg-core-neon selection:text-black relative">
      <div className="bg-noise" />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-core-neon origin-left z-[101]" 
        style={{ scaleX }} 
      />

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-core-neon pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{ 
          x: mousePosition.x - 8, 
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 255, 65, 1)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-black text-2xl tracking-tighter flex items-center gap-3 cursor-pointer">
            <div className="w-4 h-4 bg-core-neon animate-pulse" />
            CORE
          </div>
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
            <MagneticWrapper><a href="#" className="hover:text-white transition-colors block p-2">Manifesto</a></MagneticWrapper>
            <MagneticWrapper><a href="#" className="hover:text-white transition-colors block p-2">Chassi</a></MagneticWrapper>
            <MagneticWrapper><a href="#" className="hover:text-white transition-colors block p-2">Mercados</a></MagneticWrapper>
            <MagneticWrapper>
              <a href="#" className="text-core-neon border border-core-neon/30 px-6 py-2 hover:bg-core-neon hover:text-black transition-all duration-300 relative overflow-hidden group block">
                <span className="relative z-10">Terminal</span>
                <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            </MagneticWrapper>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
