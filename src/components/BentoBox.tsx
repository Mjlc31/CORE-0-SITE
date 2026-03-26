import React, { MouseEvent, useRef } from 'react';
import { Zap, Shield, Code2 } from 'lucide-react';
import { TextReveal } from './TextReveal';

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card border border-white/10 bg-core-gray overflow-hidden group ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoBox() {
  return (
    <section className="py-20 md:py-40 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Vibecoding
            </h2>
            <p className="font-mono text-core-neon uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm flex items-center gap-2 md:gap-3">
              <Code2 className="w-4 h-4" /> A Engenharia da Velocidade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[350px]">
          {/* Velocidade Brutal */}
          <SpotlightCard className="md:col-span-8 p-6 md:p-10 min-h-[300px] md:min-h-0">
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
              <Zap className="w-32 h-32 md:w-40 md:h-40 text-core-neon" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-10 h-10 md:w-14 md:h-14 border border-core-neon/30 flex items-center justify-center mb-6 bg-core-neon/5 backdrop-blur-sm">
                <span className="font-mono text-core-neon text-base md:text-lg">01</span>
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-bold uppercase mb-3 md:mb-4 tracking-tight">Velocidade Brutal</h3>
                <TextReveal 
                  text="Deploy contínuo sem fricção. O código é gerado na velocidade do pensamento, validado por sistemas determinísticos de IA." 
                  className="font-mono text-gray-400 max-w-lg text-sm md:text-lg leading-relaxed"
                />
              </div>
            </div>
          </SpotlightCard>

          {/* Chassi Estável */}
          <SpotlightCard className="md:col-span-4 p-6 md:p-10 min-h-[300px] md:min-h-0">
             <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:-rotate-12">
              <Shield className="w-40 h-40 md:w-56 md:h-56 text-core-neon" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-10 h-10 md:w-14 md:h-14 border border-core-neon/30 flex items-center justify-center mb-6 bg-core-neon/5 backdrop-blur-sm">
                <span className="font-mono text-core-neon text-base md:text-lg">02</span>
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3 md:mb-4 tracking-tight">Chassi Estável</h3>
                <TextReveal 
                  text="Fundação inabalável. Onde a inovação encontra a resiliência militar." 
                  className="font-mono text-gray-400 text-sm md:text-base leading-relaxed"
                />
              </div>
            </div>
          </SpotlightCard>

          {/* Tradução de Caos */}
          <SpotlightCard className="md:col-span-12 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="relative z-10 h-full flex flex-col justify-center w-full md:w-1/2">
              <div className="w-10 h-10 md:w-14 md:h-14 border border-core-neon/30 flex items-center justify-center mb-6 bg-core-neon/5 backdrop-blur-sm">
                <span className="font-mono text-core-neon text-base md:text-lg">03</span>
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold uppercase mb-4 md:mb-6 tracking-tight">Tradução de Caos</h3>
              <TextReveal 
                text="Pegamos a entropia do seu negócio e a transformamos em processos lineares, escaláveis e imunes a falhas humanas. Um pipeline perfeito." 
                className="font-mono text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl"
              />
            </div>

            {/* Glassmorphism Dashboard Mockup */}
            <div className="w-full md:w-1/2 h-64 md:h-full border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-lg p-4 md:p-6 flex flex-col relative overflow-hidden group-hover:border-core-neon/30 transition-colors duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-core-emerald/10 to-transparent opacity-50" />
               <div className="relative z-10 flex gap-2 mb-6 border-b border-white/10 pb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-core-neon/50 shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
               </div>
               <div className="relative z-10 flex-1 flex flex-col gap-4">
                 <div className="flex gap-4">
                   <div className="h-20 w-1/3 bg-white/5 rounded border border-white/5 flex items-end p-2">
                     <div className="w-full h-1/2 bg-core-neon/20 rounded-sm" />
                   </div>
                   <div className="h-20 w-1/3 bg-white/5 rounded border border-white/5 flex items-end p-2">
                     <div className="w-full h-3/4 bg-core-neon/40 rounded-sm" />
                   </div>
                   <div className="h-20 w-1/3 bg-white/5 rounded border border-white/5 flex items-end p-2">
                     <div className="w-full h-full bg-core-neon/60 rounded-sm" />
                   </div>
                 </div>
                 <div className="mt-auto h-32 w-full bg-gradient-to-t from-core-neon/10 to-transparent border-b-2 border-core-neon relative">
                   {/* Fake chart line */}
                   <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0,100 L10,80 L20,90 L30,50 L40,60 L50,20 L60,40 L70,10 L80,30 L90,5 L100,50" fill="none" stroke="rgba(0,255,65,0.5)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                   </svg>
                 </div>
               </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
