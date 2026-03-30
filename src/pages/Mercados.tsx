import { motion } from 'motion/react';
import { Activity, Briefcase, Landmark, ShoppingCart } from 'lucide-react';

export function Mercados() {
  const markets = [
    {
      icon: <Landmark className="w-6 h-6 text-core-neon" />,
      title: "Finanças & Banking",
      description: "Sistemas de transação de alta frequência, reconciliação em tempo real e detecção de fraude com latência sub-milissegundo."
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-core-neon" />,
      title: "E-Commerce Enterprise",
      description: "Arquiteturas capazes de suportar picos de tráfego extremos (Black Friday) sem degradação de performance."
    },
    {
      icon: <Activity className="w-6 h-6 text-core-neon" />,
      title: "Saúde & Healthtech",
      description: "Processamento seguro de dados sensíveis (HIPAA compliance) e interoperabilidade de sistemas legados."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-core-neon" />,
      title: "Logística & Supply Chain",
      description: "Roteamento dinâmico, rastreamento global em tempo real e otimização de frota baseada em IA."
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-core-emerald/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8 border border-core-emerald/40 bg-core-emerald/10 px-5 py-2 backdrop-blur-sm w-fit">
            <Briefcase className="w-4 h-4 text-core-neon" />
            <span className="text-core-neon text-xs uppercase tracking-[0.3em] font-mono">Setores de Atuação</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter">
            <span className="text-core-neon">Mercados</span> de Atuação
          </h1>
          <p className="font-mono text-gray-400 text-lg md:text-xl max-w-3xl mb-16 leading-relaxed">
            Nossa engenharia não tem fronteiras de indústria. Onde há complexidade e necessidade de escala, a CORE opera.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {markets.map((market, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-core-neon/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 flex items-center justify-center border border-core-neon/30 bg-core-neon/5 group-hover:bg-core-neon/20 transition-colors duration-300">
                    {market.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-3 text-white group-hover:text-core-neon transition-colors duration-300">{market.title}</h3>
                  <p className="font-mono text-gray-400 leading-relaxed">
                    {market.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
