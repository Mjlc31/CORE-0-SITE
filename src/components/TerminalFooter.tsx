import { useEffect, useState } from 'react';
import { MagneticWrapper } from './MagneticWrapper';

const logs = [
  "> Inicializando protocolo de encerramento...",
  "> Descarregando módulos de memória [OK]",
  "> Sincronizando com o mainframe CORE_SYS...",
  "> Conexão segura estabelecida na porta 443.",
  "> Encriptação AES-256 ativa.",
  "> CORE_SYS_V2.4.1 rodando sem anomalias.",
  "> Aguardando input do usuário..."
];

export function TerminalFooter() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setVisibleLogs(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-core-black pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24">
          
          {/* Terminal Logs */}
          <div className="font-mono text-xs md:text-sm text-core-emerald/80 flex flex-col gap-2 h-48 md:h-64 overflow-hidden bg-core-gray/50 p-4 md:p-6 border border-white/5 rounded-sm">
            <div className="flex gap-2 mb-3 md:mb-4 border-b border-white/5 pb-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/10" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/10" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/10" />
            </div>
            {visibleLogs.map((log, i) => (
              <div key={i} className="animate-fade-in">{log}</div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-core-neon">root@core:~#</span>
              <div className="w-1.5 h-3 md:w-2 md:h-4 bg-core-neon animate-pulse" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start md:items-end justify-end font-mono">
            <h4 className="font-display text-3xl md:text-4xl font-black uppercase text-white mb-6 md:mb-8 tracking-tighter">Contato</h4>
            <a href="mailto:operacoes@core.dev" className="text-core-neon text-lg md:text-xl hover:text-white transition-colors mb-4 break-all">
              operacoes@core.dev
            </a>
            <p className="text-gray-500 text-sm md:text-base mb-8 md:mb-10 uppercase tracking-widest">Base: Vale do Silício / Global</p>
            
            <MagneticWrapper className="w-full md:w-auto">
              <a 
                href="https://www.instagram.com/core.aiaas/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto relative overflow-hidden border border-core-neon text-core-neon px-6 py-4 md:px-8 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] group block text-center"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Solicitar Auditoria</span>
                <div className="absolute inset-0 bg-core-neon transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              </a>
            </MagneticWrapper>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] md:text-xs text-gray-600 uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} CORE ENGINEERING. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-core-neon rounded-full animate-pulse" />
            <p>SISTEMAS TRABALHAM. PESSOAS PENSAM.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
