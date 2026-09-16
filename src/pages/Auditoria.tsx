import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Bot, ClipboardCheck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface AuditoriaFormData {
  nome: string;
  whatsapp: string;
  email: string;
  empresa: string;
  desafio: string;
}

const DESAFIOS = [
  "Modernizar um sistema interno que está lento/antigo",
  "Integrar Inteligência Artificial e automações aos nossos processos",
  "Criar um software, aplicativo ou plataforma do zero",
  "Reduzir custos com licenças de softwares de terceiros"
] as const;

export function Auditoria() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<AuditoriaFormData>({
    nome: '',
    whatsapp: '',
    email: '',
    empresa: '',
    desafio: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation check
    if (!formData.nome || !formData.whatsapp || !formData.email || !formData.empresa || !formData.desafio) {
      return;
    }

    setSubmitStatus('loading');

    try {
      // Simulate API call for lead capture
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSubmitStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to submit form', error);
      setSubmitStatus('error');
    }
  };

  const handleInputChange = (field: keyof AuditoriaFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-core-neon/20 bg-core-neon/[0.03] text-core-neon text-xs font-mono tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,65,0.05)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-core-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-core-neon"></span>
              </span>
              Material Exclusivo
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[1.05] text-white">
              O Documento de Auditoria e Arquitetura que Usamos na <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-core-neon/50">CORE.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              Um framework prático para identificar gargalos em sistemas, cortar custos ocultos de infraestrutura e definir se a sua empresa precisa de IA ou apenas de boa engenharia.
            </p>
          </div>

          <div className="space-y-8 pt-8 border-t border-white/5">
            {/* Bullet 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-5 items-start group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-core-neon/30 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300">
                <Server className="w-5 h-5 text-core-neon" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-1.5 tracking-tight group-hover:text-core-neon transition-colors duration-300">Diagnóstico de Infraestrutura</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Como avaliar se seus servidores e bancos atuais suportam o crescimento dos próximos 12 meses.
                </p>
              </div>
            </motion.div>

            {/* Bullet 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex gap-5 items-start group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-core-neon/30 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300">
                <Bot className="w-5 h-5 text-core-neon" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-1.5 tracking-tight group-hover:text-core-neon transition-colors duration-300">Auditoria de IA & APIs</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  O cálculo exato para saber quando uma automação dá lucro ou apenas encarece sua operação.
                </p>
              </div>
            </motion.div>

            {/* Bullet 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-5 items-start group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-core-neon/30 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300">
                <ClipboardCheck className="w-5 h-5 text-core-neon" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-1.5 tracking-tight group-hover:text-core-neon transition-colors duration-300">Mapeamento de Requisitos</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  O checklist antes de autorizar qualquer novo deploy ou contratação técnica.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Form / Thank You */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          {/* Advanced Glass Card Background */}
          <div className="absolute inset-0 bg-[#0a0a0a]/80 rounded-[32px] backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_80px_rgba(0,255,65,0.05)] pointer-events-none" />
          
          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitStatus !== 'success' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10">
                    <h2 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">Baixe o Framework</h2>
                    <p className="text-gray-400 text-base leading-relaxed">Preencha os dados abaixo para receber o material imediatamente na sua tela.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">Nome completo</label>
                        <input
                          type="text"
                          id="nome"
                          required
                          value={formData.nome}
                          onChange={handleInputChange('nome')}
                          disabled={submitStatus === 'loading'}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all disabled:opacity-50 shadow-inner"
                          placeholder="João Silva"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">WhatsApp corporativo</label>
                          <input
                            type="tel"
                            id="whatsapp"
                            required
                            pattern="[\d\s\-\(\)\+]+"
                            value={formData.whatsapp}
                            onChange={handleInputChange('whatsapp')}
                            disabled={submitStatus === 'loading'}
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all disabled:opacity-50 shadow-inner"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-mail profissional</label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            disabled={submitStatus === 'loading'}
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all disabled:opacity-50 shadow-inner"
                            placeholder="joao@empresa.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-2">Nome da sua empresa</label>
                        <input
                          type="text"
                          id="empresa"
                          required
                          value={formData.empresa}
                          onChange={handleInputChange('empresa')}
                          disabled={submitStatus === 'loading'}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all disabled:opacity-50 shadow-inner"
                          placeholder="Empresa Tecnologia LTDA"
                        />
                      </div>

                      <div className="pt-4" role="radiogroup" aria-labelledby="desafio-label">
                        <label id="desafio-label" className="block text-sm font-medium text-gray-300 mb-4">
                          Qual é o principal desafio técnico do seu negócio hoje?
                        </label>
                        <div className="space-y-3">
                          {DESAFIOS.map((desafio, index) => {
                            const isSelected = formData.desafio === desafio;
                            return (
                              <label 
                                key={index} 
                                className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-core-neon/[0.03] border-core-neon/30 shadow-[0_0_15px_rgba(0,255,65,0.05)]' 
                                    : 'bg-[#111111]/50 border-white/5 hover:border-white/10 hover:bg-[#111111]'
                                } ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className="flex items-center h-5 mt-0.5">
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-core-neon' : 'border-gray-600'}`}>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-core-neon" />}
                                  </div>
                                  <input
                                    type="radio"
                                    name="desafio"
                                    value={desafio}
                                    required
                                    checked={isSelected}
                                    disabled={submitStatus === 'loading'}
                                    onChange={handleInputChange('desafio')}
                                    className="sr-only"
                                  />
                                </div>
                                <span className={`text-sm leading-relaxed transition-colors ${isSelected ? 'text-white font-medium' : 'text-gray-400'}`}>
                                  {desafio}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {submitStatus === 'error' && (
                      <p className="text-red-400 text-sm mt-2 text-center bg-red-400/10 py-2 rounded-lg">
                        Ocorreu um erro ao enviar. Tente novamente.
                      </p>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-semibold tracking-wide py-5 px-8 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {submitStatus === 'loading' ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              PROCESSANDO...
                            </>
                          ) : (
                            'BAIXAR O FRAMEWORK GRATUITAMENTE'
                          )}
                        </span>
                        {submitStatus !== 'loading' && (
                          <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                        )}
                      </button>
                      
                      <p className="text-xs text-center text-gray-500 mt-5 flex items-center justify-center gap-2">
                        <span>🔒</span> Seus dados estão seguros. Não enviamos spam.
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-core-neon/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-core-neon" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">Framework Liberado!</h2>
                  <p className="text-gray-400 mb-8 max-w-sm">
                    Tudo certo, seu material está pronto. Clique no botão abaixo para acessá-lo imediatamente.
                  </p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-full bg-core-neon text-black font-bold py-4 px-8 rounded-xl hover:bg-white transition-colors"
                  >
                    Acessar Material
                  </a>

                  <div className="w-full h-px bg-white/10 my-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-core-black px-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                      PRÓXIMO PASSO
                    </div>
                  </div>

                  <p className="text-white font-medium text-lg mb-6">
                    Quer que a equipe técnica da CORE faça um diagnóstico da arquitetura da sua empresa?
                  </p>

                  <a 
                    href="https://www.instagram.com/core.iafb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 w-full bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/5 transition-all"
                  >
                    Agendar Sessão Técnica de Diagnóstico
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
