import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export function Manifesto() {
  return (
    <section className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-core-emerald/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-core-neon/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8 border border-core-emerald/40 bg-core-emerald/10 px-5 py-2 backdrop-blur-sm w-fit">
            <Terminal className="w-4 h-4 text-core-neon" />
            <span className="text-core-neon text-xs uppercase tracking-[0.3em] font-mono">Documento Fundacional</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase mb-12 tracking-tighter">
            O Manifesto <span className="text-core-neon">CORE</span>
          </h1>
          
          <div className="space-y-8 font-mono text-gray-400 text-lg leading-relaxed">
            <p>
              A ineficiência é o inimigo invisível que corrói impérios por dentro. Sistemas legados, processos manuais e arquiteturas frágeis são os gargalos que impedem o verdadeiro potencial de escala.
            </p>
            <p>
              Nós não acreditamos em "soluções de prateleira" ou "transformação digital" superficial. Acreditamos em <strong className="text-white">engenharia de precisão</strong>. Acreditamos em construir a espinha dorsal tecnológica que permite que empresas dominem seus mercados sem atrito.
            </p>
            <p>
              A CORE nasceu para ser a força motriz por trás das operações mais complexas do mundo. Nós substituímos o caos por ordem determinística. Nós trocamos o esforço humano repetitivo por automação implacável.
            </p>
            <div className="border-l-2 border-core-neon pl-6 py-4 my-12 bg-gradient-to-r from-core-neon/5 to-transparent">
              <p className="text-2xl md:text-3xl text-white font-display uppercase tracking-wider">
                "Sistemas trabalham. Pessoas pensam."
              </p>
            </div>
            <p>
              Nossa missão é fornecer a infraestrutura invisível, porém indestrutível, que sustenta o crescimento exponencial. Quando a CORE opera, a ineficiência morre.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
