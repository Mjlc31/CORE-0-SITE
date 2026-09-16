import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Search, PencilRuler, Rocket, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Raio-X Operacional',
    desc: 'Diagnosticamos a arquitetura atual da sua empresa. Identificamos gargalos, custos invisíveis e pontos de falha críticos.',
    accent: 'from-red-500/20 to-transparent'
  },
  {
    number: '02',
    icon: PencilRuler,
    title: 'Arquitetura & Blueprint',
    desc: 'Desenhamos o sistema sob medida. Cada módulo é projetado para a sua operação — sem excesso de engenharia, sem desperdício.',
    accent: 'from-yellow-500/20 to-transparent'
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Deploy & Integração',
    desc: 'Construímos e implantamos o sistema com ciclos curtos de entrega. Sua equipe começa a usar antes do prazo final.',
    accent: 'from-core-neon/20 to-transparent'
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Monitoramento Contínuo',
    desc: 'Acompanhamos a performance do sistema em produção. Telemetria, alertas e otimizações automáticas 24/7.',
    accent: 'from-blue-500/20 to-transparent'
  }
];

export function ProcessSteps() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-40 border-t border-white/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            O Processo
          </h2>
          <p className="font-mono text-core-neon uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm mb-6">
            Da Auditoria ao Sistema Rodando
          </p>
          <p className="font-mono text-gray-400 text-sm md:text-lg">
            Um método cirúrgico em 4 fases. Sem surpresas, sem escopo infinito, sem promessas vagas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 group hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Number */}
                  <span className="font-mono text-core-neon/30 text-5xl md:text-6xl font-black absolute -top-2 -right-2 select-none pointer-events-none group-hover:text-core-neon/50 transition-colors duration-500">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center mb-8 bg-black/50 group-hover:border-core-neon/30 group-hover:bg-core-neon/5 transition-all duration-500">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-core-neon transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="font-mono text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                    {step.desc}
                  </p>

                  {/* Arrow connector (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
