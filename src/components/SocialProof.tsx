import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Building2, Quote } from 'lucide-react';

const clients = [
  { name: 'TechBridge', sector: 'SaaS' },
  { name: 'NeoBuild', sector: 'Construção' },
  { name: 'Vertex AI Labs', sector: 'IA & Dados' },
  { name: 'ScaleOps', sector: 'Logística' },
  { name: 'Fundação Educa+', sector: 'Educação' },
];

const testimonials = [
  {
    quote: 'A CORE entregou em 6 semanas o que nossa equipe interna não conseguiu em 8 meses. O sistema roda sozinho e os custos de infraestrutura caíram 42%.',
    name: 'Rafael M.',
    role: 'CTO',
    company: 'TechBridge'
  },
  {
    quote: 'Antes da CORE, tínhamos 5 planilhas e 3 sistemas que não conversavam. Hoje temos um painel único com controle total da operação.',
    name: 'Carla S.',
    role: 'Diretora de Operações',
    company: 'NeoBuild'
  },
  {
    quote: 'O Raio-X Operacional identificou R$ 67 mil em custos invisíveis que estávamos sangrando por mês. Em 90 dias, já recuperamos o investimento.',
    name: 'Marcos L.',
    role: 'CEO',
    company: 'ScaleOps'
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:border-core-neon/30 transition-colors duration-500"
    >
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-10 h-10 text-core-neon" />
      </div>

      <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-light italic">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
        <div className="w-10 h-10 rounded-full bg-core-neon/10 border border-core-neon/30 flex items-center justify-center">
          <span className="text-core-neon font-bold text-sm">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function SocialProof() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-40 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-core-neon/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Resultados
            </h2>
            <p className="font-mono text-core-neon uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm flex items-center gap-2 md:gap-3">
              <Building2 className="w-4 h-4" /> Quem Confia na CORE
            </p>
          </div>
          <p className="font-mono text-gray-400 max-w-md text-sm md:text-lg">
            Empresas que pararam de improvisar e começaram a operar com infraestrutura de verdade.
          </p>
        </div>

        {/* Client Logos Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 border border-white/5 bg-[#0a0a0a]/50 rounded-xl p-6 md:p-8"
        >
          <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 text-center">Empresas que confiam na CORE Engineering</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-white/40 group-hover:text-white/70 font-display text-lg md:text-xl font-bold uppercase tracking-wider transition-colors duration-300">
                  {client.name}
                </span>
                <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">{client.sector}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
