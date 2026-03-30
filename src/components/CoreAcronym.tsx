import { motion, useInView } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const acronyms = [
  { letter: 'C', title: 'Comando', desc: 'Controle absoluto sobre a arquitetura. Sem caixas pretas. Telemetria em tempo real de cada microsserviço.' },
  { letter: 'O', title: 'Operacional', desc: 'Foco implacável em manter o sistema rodando. Resiliência militar aplicada a software civil.' },
  { letter: 'R', title: 'Resolução', desc: 'Problemas complexos reduzidos a algoritmos determinísticos. Fim da ambiguidade.' },
  { letter: 'E', title: 'Escala', desc: 'Infraestrutura forjada para volumes de dados inquebráveis. Crescimento sem refatoração.' },
];

function AcronymCard({ item, index }: { item: typeof acronyms[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = isMobile ? isInView : isHovered;

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <motion.div
      ref={ref}
      variants={itemAnim}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-[250px] sm:h-[300px] md:h-[400px] border-b md:border-b-0 md:border-r border-white/5 bg-core-black p-6 md:p-8 flex flex-col justify-end overflow-hidden group cursor-pointer last:border-b-0"
    >
      <div className={`absolute inset-0 bg-gradient-to-t from-core-emerald/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Giant Background Letter */}
      <motion.div 
        animate={{ 
          y: isActive ? -20 : 0,
          scale: isActive ? 1.1 : 1,
          color: isActive ? 'rgba(0, 77, 64, 0.4)' : 'rgba(26, 26, 26, 1)'
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute -top-5 -right-5 md:-top-10 md:-right-10 font-display text-[10rem] md:text-[16rem] font-black leading-none select-none pointer-events-none"
      >
        {item.letter}
      </motion.div>

      <div className="relative z-10">
        <div className={`w-8 h-1 bg-core-neon mb-6 transform origin-left transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
        <h3 className={`font-display text-2xl md:text-3xl font-bold uppercase mb-2 md:mb-4 transition-colors duration-300 tracking-tight ${isActive ? 'text-core-neon' : 'text-white'}`}>
          {item.title}
        </h3>
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            height: isActive ? 'auto' : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed pt-2">
            {item.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CoreAcronym() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section className="py-20 md:py-40 border-t border-white/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/5"
        >
          {acronyms.map((item, index) => (
            <AcronymCard key={item.letter} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
