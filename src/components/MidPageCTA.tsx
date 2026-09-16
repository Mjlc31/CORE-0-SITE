import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Activity } from 'lucide-react';
import { MagneticWrapper } from './MagneticWrapper';

export function MidPageCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-core-neon/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-core-neon/20 bg-core-neon/[0.03] text-core-neon text-xs font-mono tracking-[0.2em] uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-core-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-core-neon"></span>
            </span>
            Diagnóstico Gratuito
          </div>

          <h2 className="font-display text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-tight">
            Sua operação está
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-core-neon to-emerald-400">sangrando dinheiro?</span>
          </h2>

          <p className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Em menos de 3 minutos, nosso Raio-X Operacional revela os gargalos invisíveis que custam milhares de reais por mês à sua empresa — e o caminho exato para corrigir.
          </p>

          <MagneticWrapper className="inline-block">
            <a 
              href="/diagnostico"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-black font-semibold text-sm md:text-base px-10 py-5 md:px-14 md:py-6 uppercase tracking-[0.15em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5 text-core-emerald group-hover:text-black transition-colors" />
                INICIAR RAIO-X OPERACIONAL
              </span>
              <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </a>
          </MagneticWrapper>

          <p className="mt-6 font-mono text-gray-600 text-xs uppercase tracking-wider">
            100% gratuito · Sem cartão de crédito · Resultado imediato
          </p>
        </motion.div>
      </div>
    </section>
  );
}
