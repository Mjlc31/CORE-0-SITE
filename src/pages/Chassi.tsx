import { motion } from 'motion/react';
import { Cpu, Server, Shield, Zap } from 'lucide-react';

export function Chassi() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-core-neon" />,
      title: "Processamento Distribuído",
      description: "Arquitetura baseada em microsserviços e computação serverless para escalar infinitamente sem gargalos de performance."
    },
    {
      icon: <Shield className="w-8 h-8 text-core-neon" />,
      title: "Segurança Zero-Trust",
      description: "Cada requisição, cada nó e cada acesso é verificado criptograficamente. Segurança não é um add-on, é o alicerce."
    },
    {
      icon: <Zap className="w-8 h-8 text-core-neon" />,
      title: "Baixa Latência Global",
      description: "Edge computing e roteamento inteligente garantem respostas em milissegundos, independente da localização do usuário."
    },
    {
      icon: <Server className="w-8 h-8 text-core-neon" />,
      title: "Resiliência Multi-Cloud",
      description: "Operação agnóstica de nuvem com failover automático. Se um data center cai, o sistema continua operando."
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-core-emerald/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-core-neon/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8 border border-core-emerald/40 bg-core-emerald/10 px-5 py-2 backdrop-blur-sm w-fit">
            <Server className="w-4 h-4 text-core-neon" />
            <span className="text-core-neon text-xs uppercase tracking-[0.3em] font-mono">Infraestrutura Core</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter">
            O <span className="text-core-neon">Chassi</span> Tecnológico
          </h1>
          <p className="font-mono text-gray-400 text-lg md:text-xl max-w-3xl mb-16 leading-relaxed">
            A infraestrutura base sobre a qual construímos todas as nossas soluções. Desenvolvido para suportar cargas de trabalho extremas com zero downtime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-white/10 bg-white/[0.02] p-8 hover:border-core-neon/50 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-core-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-core-black border border-white/5 inline-block group-hover:border-core-neon/30 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-4 text-white group-hover:text-core-neon transition-colors">{feature.title}</h3>
                  <p className="font-mono text-gray-400 leading-relaxed">
                    {feature.description}
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
