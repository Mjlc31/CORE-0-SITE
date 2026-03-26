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
    <footer className="border-t border-white/10 bg-core-black pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          
          {/* Terminal Logs */}
          <div className="font-mono text-sm text-core-emerald/80 flex flex-col gap-2 h-64 overflow-hidden bg-core-gray/50 p-6 border border-white/5 rounded-sm">
            <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            {visibleLogs.map((log, i) => (
              <div key={i} className="animate-fade-in">{log}</div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-core-neon">root@core:~#</span>
              <div className="w-2 h-4 bg-core-neon animate-pulse" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start md:items-end justify-end font-mono">
            <h4 className="font-display text-4xl font-black uppercase text-white mb-8 tracking-tighter">Contato</h4>
            <a href="mailto:operacoes@core.dev" className="text-core-neon text-xl hover:text-white transition-colors mb-4">
              operacoes@core.dev
            </a>
            <p className="text-gray-500 text-base mb-10 uppercase tracking-widest">Base: Vale do Silício / Global</p>
            
            <MagneticWrapper>
              <button className="relative overflow-hidden border border-core-neon text-core-neon px-8 py-4 text-sm uppercase tracking-[0.2em] group">
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Solicitar Auditoria</span>
                <div className="absolute inset-0 bg-core-neon transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              </button>
            </MagneticWrapper>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-600 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CORE ENGINEERING. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-core-neon rounded-full animate-pulse" />
            <p>SISTEMAS TRABALHAM. PESSOAS PENSAM.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
