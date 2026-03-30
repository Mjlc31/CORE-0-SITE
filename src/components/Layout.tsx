import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MagneticWrapper } from './MagneticWrapper';
import { TerminalFooter } from './TerminalFooter';
import { CoreLogo } from './CoreLogo';

export function Layout({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-display font-black text-xl md:text-2xl tracking-tighter flex items-center gap-3 cursor-pointer relative z-50 hover:opacity-80 transition-opacity">
            <CoreLogo className="w-8 h-8 md:w-10 md:h-10" />
            CORE
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
            <MagneticWrapper><Link to="/manifesto" className="hover:text-white transition-colors block p-2">Manifesto</Link></MagneticWrapper>
            <MagneticWrapper><Link to="/chassi" className="hover:text-white transition-colors block p-2">Chassi</Link></MagneticWrapper>
            <MagneticWrapper><Link to="/mercados" className="hover:text-white transition-colors block p-2">Mercados</Link></MagneticWrapper>
            <MagneticWrapper>
              <a href="https://www.instagram.com/core.aiaas/" target="_blank" rel="noopener noreferrer" className="text-core-neon border border-core-neon/30 px-6 py-2 hover:bg-core-neon hover:text-black transition-all duration-300 relative overflow-hidden group block">
                <span className="relative z-10">Terminal</span>
                <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            </MagneticWrapper>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-core-neon p-2 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden fixed inset-0 z-40 bg-core-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <nav className="flex flex-col gap-8 font-mono text-lg uppercase tracking-[0.2em] text-gray-400 mt-10">
          <Link to="/manifesto" className="hover:text-white transition-colors border-b border-white/5 pb-4" onClick={() => setMobileMenuOpen(false)}>Manifesto</Link>
          <Link to="/chassi" className="hover:text-white transition-colors border-b border-white/5 pb-4" onClick={() => setMobileMenuOpen(false)}>Chassi</Link>
          <Link to="/mercados" className="hover:text-white transition-colors border-b border-white/5 pb-4" onClick={() => setMobileMenuOpen(false)}>Mercados</Link>
          <a href="https://www.instagram.com/core.aiaas/" target="_blank" rel="noopener noreferrer" className="text-core-neon border border-core-neon/30 px-6 py-4 text-center hover:bg-core-neon hover:text-black transition-all duration-300 mt-4" onClick={() => setMobileMenuOpen(false)}>
            Terminal
          </a>
        </nav>
      </motion.div>

      <main className="relative z-10">
        {children}
      </main>
      
      <TerminalFooter />
    </div>
  );
}
