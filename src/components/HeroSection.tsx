import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { MagneticWrapper } from './MagneticWrapper';

export function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 50, damping: 15 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-50" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-core-emerald/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 gap-4">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col items-start"
        >
          <motion.div variants={item} className="flex items-center gap-3 mb-10 border border-core-emerald/40 bg-core-emerald/10 px-5 py-2 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-core-neon" />
            <span className="text-core-neon text-xs uppercase tracking-[0.3em] font-mono">Status: Operacional</span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter mb-10 uppercase text-white mix-blend-difference">
            Intervenção <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-core-emerald to-core-neon">Cirúrgica</span> <br />
            no Caos <br />
            Empresarial.
          </motion.h1>

          <motion.p variants={item} className="font-mono text-gray-400 text-lg md:text-2xl max-w-3xl mb-14 leading-relaxed tracking-tight">
            Construímos a espinha dorsal tecnológica de impérios. Menos código, mais operação rodando.
          </motion.p>

          <motion.div variants={item}>
            <MagneticWrapper>
              <button 
                className="relative overflow-hidden bg-core-neon text-core-black font-display font-bold text-xl px-10 py-5 uppercase tracking-[0.2em] group"
              >
                <span className="relative z-10 flex items-center gap-4">
                  [INICIAR PROTOCOLO]
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
