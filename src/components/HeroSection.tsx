import { motion, useScroll, useTransform } from 'motion/react';
import { Terminal, Activity, Cpu, LineChart } from 'lucide-react';
import { MagneticWrapper } from './MagneticWrapper';
import { useRef } from 'react';

const DashboardMockup = () => (
  <motion.div 
    initial={{ opacity: 0, rotateX: 40, rotateY: -20, rotateZ: 10, scale: 0.8 }}
    animate={{ opacity: 1, rotateX: 25, rotateY: -15, rotateZ: 5, scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] md:w-[1400px] h-[600px] md:h-[800px] pointer-events-none z-0 opacity-30 md:opacity-50"
    style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}
  >
    <div className="w-full h-full bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 grid grid-cols-3 gap-4 md:gap-6 shadow-[0_0_100px_rgba(0,255,65,0.05)]">
      {/* Top Bar */}
      <div className="col-span-3 h-10 md:h-12 border-b border-white/10 flex items-center justify-between px-2 md:px-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex gap-4 text-core-neon/50">
          <Activity className="w-3 h-3 md:w-4 md:h-4" />
          <Cpu className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>

      {/* Main Chart */}
      <div className="col-span-3 md:col-span-2 row-span-2 border border-white/5 bg-white/[0.02] rounded-xl p-4 md:p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-white/50 font-mono text-xs md:text-sm">Throughput do Sistema</h3>
          <span className="text-core-neon font-mono text-[10px] md:text-xs">+14,204 ops/s</span>
        </div>
        <div className="flex-1 flex items-end gap-1 md:gap-2">
          {[...Array(24)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ height: "10%" }}
              animate={{ height: `${Math.random() * 80 + 20}%` }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
              className="flex-1 bg-core-neon/20 rounded-t-sm relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 bg-core-neon/60" style={{ height: '20%' }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Panel 1 */}
      <div className="hidden md:block col-span-1 border border-white/5 bg-white/[0.02] rounded-xl p-6">
        <h3 className="text-white/50 font-mono text-sm mb-4">Nós Ativos</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-core-neon animate-pulse" />
                <span className="text-white/70 font-mono text-xs">us-east-{i+1}</span>
              </div>
              <span className="text-core-emerald font-mono text-xs">99.99%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel 2 */}
      <div className="hidden md:block col-span-1 border border-white/5 bg-white/[0.02] rounded-xl p-6">
        <h3 className="text-white/50 font-mono text-sm mb-4">Log de Segurança</h3>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3 text-xs font-mono">
              <span className="text-core-emerald">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
              <span className="text-white/50">AUTH_SUCCESS</span>
            </div>
          ))}
          <div className="flex gap-3 text-xs font-mono">
            <span className="text-red-500/80">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
            <span className="text-red-500/80">BLOCK_INTRUSION</span>
          </div>
        </div>
      </div>

      {/* Bottom Wide Panel */}
      <div className="col-span-3 border border-white/5 bg-white/[0.02] rounded-xl p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex flex-col">
            <span className="text-white/40 font-mono text-[10px] md:text-xs">Latência Global</span>
            <span className="text-white text-xl md:text-2xl font-display font-bold">12ms</span>
          </div>
          <div className="h-6 md:h-8 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-white/40 font-mono text-[10px] md:text-xs">Conexões Ativas</span>
            <span className="text-white text-xl md:text-2xl font-display font-bold">1.2M</span>
          </div>
        </div>
        <LineChart className="w-20 h-8 md:w-32 md:h-12 text-core-emerald opacity-50" />
      </div>
    </div>
  </motion.div>
);

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-core-emerald/20 rounded-full blur-[120px] pointer-events-none z-0" />

        <DashboardMockup />
      </motion.div>

      {/* Decorative Dots */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden sm:flex">
        <div className="w-2 h-2 rounded-full border border-core-neon bg-transparent" />
        <div className="w-2 h-2 rounded-full border border-core-neon bg-transparent" />
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden sm:flex">
        <div className="w-2 h-2 rounded-full border border-core-neon bg-transparent" />
        <div className="w-2 h-2 rounded-full border border-core-neon bg-transparent" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-core-neon shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-5xl"
        >
          <motion.div variants={item} className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 border border-core-emerald/40 bg-core-black/50 px-4 md:px-5 py-2 backdrop-blur-md rounded-full">
            <Terminal className="w-3 h-3 md:w-4 md:h-4 text-core-neon" />
            <span className="text-core-neon text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono">Sistemas de Alta Performance</span>
          </motion.div>

          <motion.h1 
            variants={item} 
            className="font-display text-5xl min-[375px]:text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black leading-[0.9] tracking-tighter mb-6 md:mb-8 uppercase flex flex-col items-center"
            style={{ textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-600">CORE</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-400 to-gray-700">ENGINEERING</span>
          </motion.h1>

          <motion.p variants={item} className="font-mono text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mb-10 md:mb-12 leading-relaxed tracking-tight bg-core-black/60 backdrop-blur-md p-6 rounded-lg border border-white/10 shadow-2xl">
            O fim da ineficiência. Construímos arquiteturas determinísticas, imunes a falhas e projetadas para escala brutal. A <strong>espinha dorsal tecnológica</strong> do seu império.
          </motion.p>

          <motion.div variants={item} className="w-full sm:w-auto">
            <MagneticWrapper className="w-full sm:w-auto">
              <a 
                href="https://www.instagram.com/core.aiaas/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden border border-core-neon bg-core-black/50 backdrop-blur-md text-core-neon font-display font-bold text-sm md:text-base px-8 py-4 md:px-12 md:py-5 uppercase tracking-[0.2em] group w-full sm:w-auto text-center rounded-sm hover:bg-core-neon hover:text-black transition-all duration-300 block"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  EXPLORAR SOLUÇÕES
                </span>
                <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
