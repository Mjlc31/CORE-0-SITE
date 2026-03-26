import { BookOpen, Factory, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const markets = [
  {
    icon: BookOpen,
    title: 'Ecossistemas Educacionais',
    desc: 'Plataformas de alta concorrência. Zero downtime durante picos de acesso simultâneo.',
    metric: '99.999% Uptime'
  },
  {
    icon: Factory,
    title: 'Engenharia & Energia',
    desc: 'Telemetria em tempo real e processamento de dados críticos industriais na edge.',
    metric: '< 10ms Latência'
  },
  {
    icon: TrendingUp,
    title: 'Empresas em Escala',
    desc: 'Arquiteturas preparadas para multiplicar volume sem refatoração de código base.',
    metric: 'Escala 100x'
  }
];

export function MarketStrategy() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
  };

  return (
    <section className="py-40 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Os Aquários
            </h2>
            <p className="font-mono text-core-neon uppercase tracking-[0.2em] text-sm">Estratégia de Mercado</p>
          </div>
          <p className="font-mono text-gray-400 max-w-md text-lg">
            Não operamos em águas rasas. Nossos sistemas são projetados para ambientes onde a falha custa milhões.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {markets.map((market, idx) => {
            const Icon = market.icon;
            return (
              <motion.div 
                variants={item}
                key={idx} 
                className="group relative border border-white/10 bg-core-gray p-10 hover:bg-core-lightgray transition-colors duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight className="w-6 h-6 text-core-neon" />
                </div>
                
                <Icon className="w-10 h-10 text-core-neon mb-10 transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                
                <h3 className="font-display text-2xl font-bold uppercase mb-4 tracking-tight">{market.title}</h3>
                <p className="font-mono text-base text-gray-400 mb-10 leading-relaxed">{market.desc}</p>
                
                <div className="mt-auto border-t border-white/10 pt-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Métrica Chave</span>
                  <span className="font-mono text-sm text-core-neon font-bold">{market.metric}</span>
                </div>
                
                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-1 bg-core-neon w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
