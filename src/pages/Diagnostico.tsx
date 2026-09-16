import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Activity, AlertTriangle, Cpu, Target, CheckCircle2, Bot } from 'lucide-react';

// Tipagem de Dados
interface DiagnosticoData {
  nome: string;
  cargo: string;
  empresa: string;
  whatsapp: string;
  instagramSite: string;
  q1Faturamento: string;
  q2Equipe: string;
  q3Controle: string;
  q4Gargalo: string;
  q5Objetivo: string;
}

const INITIAL_DATA: DiagnosticoData = {
  nome: '',
  cargo: '',
  empresa: '',
  whatsapp: '',
  instagramSite: '',
  q1Faturamento: '',
  q2Equipe: '',
  q3Controle: '',
  q4Gargalo: '',
  q5Objetivo: ''
};

// Constantes de Perguntas
const QUESTIONS = {
  q1: {
    title: "Qual é o faturamento médio mensal da sua empresa hoje?",
    subtitle: "Para dimensionarmos o tipo de infraestrutura que sua operação exige.",
    options: [
      { id: 'A', label: 'Abaixo de R$ 50.000' },
      { id: 'B', label: 'De R$ 50.000 a R$ 200.000' },
      { id: 'C', label: 'De R$ 200.000 a R$ 1 Milhão' },
      { id: 'D', label: 'Acima de R$ 1 Milhão' }
    ]
  },
  q2: {
    title: "Qual o tamanho da sua equipe (operação/campo e escritório)?",
    subtitle: "O volume de fator humano dita o nível de automação necessária.",
    options: [
      { id: 'A', label: '1 a 5 colaboradores' },
      { id: 'B', label: '6 a 20 colaboradores' },
      { id: 'C', label: '21 a 50 colaboradores' },
      { id: 'D', label: 'Mais de 50 colaboradores' }
    ]
  },
  q3: {
    title: "Como a sua diretoria controla a operação (vendas, entregas, caixa) hoje?",
    subtitle: "O nível tecnológico atual da sua arquitetura operacional.",
    options: [
      { id: 'A', label: 'Pranchetas de papel, anotações físicas e mensagens no WhatsApp.' },
      { id: 'B', label: 'Múltiplas planilhas de Excel/Google Sheets que quebram com frequência.' },
      { id: 'C', label: 'Várias assinaturas de sistemas diferentes que não conversam entre si.' },
      { id: 'D', label: 'Temos um ERP centralizado, mas é burocrático e a equipe não usa direito.' }
    ]
  },
  q4: {
    title: "Onde a sua operação 'sangra' mais hoje? Qual o maior gargalo?",
    subtitle: "A dor principal que consome tempo e recursos financeiros invisíveis.",
    options: [
      { id: 'A', label: 'Falta de controle: extravio de informações, perdas não mapeadas.' },
      { id: 'B', label: 'Cegueira tática: a diretoria demora dias para ter relatórios reais.' },
      { id: 'C', label: 'Retrabalho operacional: a equipe passa horas digitando papel no PC.' },
      { id: 'D', label: 'Falta de compliance: risco jurídico por falhas em registros.' }
    ]
  },
  q5: {
    title: "Qual é o seu principal objetivo de negócios para os próximos 6 meses?",
    subtitle: "O alvo estratégico do seu próximo ciclo.",
    options: [
      { id: 'A', label: 'Escalar o faturamento agressivamente e pegar projetos maiores.' },
      { id: 'B', label: 'Organizar a casa, cortar custos invisíveis e aumentar margem líquida.' },
      { id: 'C', label: 'Melhorar a apresentação comercial com um posicionamento mais profissional.' }
    ]
  }
};

export function Diagnostico() {
  const [step, setStep] = useState(0); // 0 = Bloco 1, 1-5 = Perguntas, 6 = Loading, 7 = Resultado
  const [data, setData] = useState<DiagnosticoData>(INITIAL_DATA);
  const [direction, setDirection] = useState(1); // Para animações left/right

  const nextStep = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOptionSelect = (field: keyof DiagnosticoData, value: string) => {
    setData({ ...data, [field]: value });
    setTimeout(nextStep, 400); // Avança automático com pequeno delay
  };

  // IMPORTANTE: Configure aqui a URL do seu Webhook gratuito (Make.com, n8n, Zapier ou Google Apps Script).
  // Quando o usuário clicar em "Começar a Avaliação", os dados do Bloco 1 serão enviados para cá.
  const WEBHOOK_URL = "SUA_URL_DO_WEBHOOK_AQUI"; 

  const submitLeadData = async (leadData: DiagnosticoData) => {
    if (WEBHOOK_URL === "SUA_URL_DO_WEBHOOK_AQUI") return; // Ignora se não configurado
    
    try {
      // Envia os dados de forma assíncrona para não travar a tela do usuário
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'lead_capturado',
          nome: leadData.nome,
          cargo: leadData.cargo,
          empresa: leadData.empresa,
          whatsapp: leadData.whatsapp,
          instagramSite: leadData.instagramSite,
          data: new Date().toISOString()
        })
      }).catch(err => console.error("Erro silencioso no Webhook:", err));
    } catch (error) {
      console.error(error);
    }
  };

  const startAvaliacao = () => {
    submitLeadData(data); // Dispara o webhook
    nextStep(); // Avança a tela imediatamente
  };

  // Efeito de "Calculando Laudo..."
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        setStep(7);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Lógica de Geração do Laudo (Sistema de Pontuação)
  const getResultType = (): 'alerta' | 'frankenstein' | 'posicionamento' => {
    let scores = {
      alerta: 0,
      frankenstein: 0,
      posicionamento: 0
    };

    // Q1: Faturamento
    if (data.q1Faturamento === 'A') scores.posicionamento += 2;
    if (data.q1Faturamento === 'B') { scores.posicionamento += 1; scores.frankenstein += 1; scores.alerta += 1; }
    if (data.q1Faturamento === 'C') { scores.frankenstein += 2; scores.alerta += 2; }
    if (data.q1Faturamento === 'D') { scores.frankenstein += 2; scores.alerta += 3; }

    // Q2: Equipe
    if (data.q2Equipe === 'A') scores.posicionamento += 2;
    if (data.q2Equipe === 'B') { scores.posicionamento += 1; scores.frankenstein += 2; scores.alerta += 1; }
    if (data.q2Equipe === 'C') { scores.frankenstein += 1; scores.alerta += 2; }
    if (data.q2Equipe === 'D') { scores.frankenstein += 1; scores.alerta += 3; }

    // Q3: Controle
    if (data.q3Controle === 'A') { scores.posicionamento += 1; scores.alerta += 3; }
    if (data.q3Controle === 'B') { scores.posicionamento += 1; scores.frankenstein += 1; scores.alerta += 2; }
    if (data.q3Controle === 'C') { scores.frankenstein += 3; scores.alerta += 1; }
    if (data.q3Controle === 'D') { scores.frankenstein += 3; scores.alerta += 1; }

    // Q4: Gargalo
    if (data.q4Gargalo === 'A') { scores.posicionamento += 1; scores.frankenstein += 1; scores.alerta += 2; }
    if (data.q4Gargalo === 'B') { scores.frankenstein += 2; scores.alerta += 2; }
    if (data.q4Gargalo === 'C') { scores.posicionamento += 1; scores.frankenstein += 3; scores.alerta += 1; }
    if (data.q4Gargalo === 'D') { scores.frankenstein += 1; scores.alerta += 3; }

    // Q5: Objetivo
    if (data.q5Objetivo === 'A') { scores.posicionamento += 1; scores.frankenstein += 1; scores.alerta += 2; }
    if (data.q5Objetivo === 'B') { scores.frankenstein += 3; scores.alerta += 1; }
    if (data.q5Objetivo === 'C') { scores.posicionamento += 3; }

    // Descobre o maior score
    let result: 'alerta' | 'frankenstein' | 'posicionamento' = 'frankenstein';
    let maxScore = -1;

    for (const [key, value] of Object.entries(scores)) {
      if (value > maxScore) {
        maxScore = value;
        result = key as 'alerta' | 'frankenstein' | 'posicionamento';
      }
    }

    return result;
  };

  // Variações de Animação do Framer Motion
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className="min-h-screen bg-black flex flex-col pt-20 px-4 pb-12 font-sans relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-core-emerald/10 rounded-full blur-[150px]" />
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Progress Header */}
        {step > 0 && step < 6 && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-core-neon font-mono text-sm tracking-widest uppercase">Fase {step} de 5</span>
              <div className="h-px bg-white/20 flex-1 ml-4" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className="h-1 flex-1 rounded-full overflow-hidden bg-white/10">
                  {s <= step && (
                    <motion.div 
                      layoutId={`progress-${s}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-core-neon shadow-[0_0_10px_rgba(0,255,65,0.8)]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            
            {/* Bloco 1: Identificação Básica */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-core-neon/10 border border-core-neon/30 mb-6">
                    <Activity className="w-8 h-8 text-core-neon" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">Raio-X Operacional</h1>
                  <p className="text-gray-400 text-lg">Faça um diagnóstico completo da arquitetura tecnológica da sua empresa e descubra gargalos ocultos.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                      <input
                        required
                        name="nome"
                        value={data.nome}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all shadow-inner"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cargo</label>
                      <select
                        name="cargo"
                        value={data.cargo}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-gray-300 focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all shadow-inner"
                      >
                        <option value="">Selecione seu cargo</option>
                        <option value="Dono/Sócio">Dono / Sócio</option>
                        <option value="Diretor/C-Level">Diretor / C-Level</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Operacional">Operacional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Empresa</label>
                    <input
                      name="empresa"
                      value={data.empresa}
                      onChange={handleInputChange}
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all shadow-inner"
                      placeholder="Empresa Tecnologia LTDA"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                      <input
                        name="whatsapp"
                        value={data.whatsapp}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all shadow-inner"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram ou Site</label>
                      <input
                        name="instagramSite"
                        value={data.instagramSite}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-core-neon/50 focus:border-core-neon/50 transition-all shadow-inner"
                        placeholder="@suaempresa"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6">
                    <button
                      onClick={startAvaliacao}
                      disabled={!data.nome || !data.cargo || !data.empresa || !data.whatsapp}
                      className="w-full group relative overflow-hidden flex items-center justify-center gap-3 bg-white text-black font-semibold text-base px-8 py-5 uppercase tracking-[0.15em] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        COMEÇAR A AVALIAÇÃO <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-core-neon transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bloco 2: Perguntas SPIN */}
            {[1, 2, 3, 4, 5].map((questionNum) => {
              if (step === questionNum) {
                const qKey = `q${questionNum}` as keyof typeof QUESTIONS;
                const fieldKey = `q${questionNum}${questionNum === 1 ? 'Faturamento' : questionNum === 2 ? 'Equipe' : questionNum === 3 ? 'Controle' : questionNum === 4 ? 'Gargalo' : 'Objetivo'}` as keyof DiagnosticoData;
                const qData = QUESTIONS[qKey];

                return (
                  <motion.div
                    key={`step-${questionNum}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                      {qData.title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 border-l-2 border-core-neon/50 pl-4 py-1">
                      {qData.subtitle}
                    </p>

                    <div className="space-y-4">
                      {qData.options.map((opt) => {
                        const isSelected = data[fieldKey] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionSelect(fieldKey, opt.id)}
                            className={`w-full flex items-center p-6 md:p-8 rounded-2xl border text-left transition-all duration-300 group ${
                              isSelected 
                                ? 'bg-core-neon/10 border-core-neon shadow-[0_0_20px_rgba(0,255,65,0.1)]' 
                                : 'bg-[#111111]/80 border-white/10 hover:border-white/30 hover:bg-[#1a1a1a]'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full border flex flex-shrink-0 items-center justify-center mr-6 transition-colors ${isSelected ? 'border-core-neon bg-core-neon/20' : 'border-gray-600 bg-black/50 group-hover:border-gray-400'}`}>
                              <span className={`font-mono text-sm ${isSelected ? 'text-core-neon' : 'text-gray-500'}`}>{opt.id}</span>
                            </div>
                            <span className={`text-lg md:text-xl font-medium flex-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                              {opt.label}
                            </span>
                            <ChevronRight className={`w-6 h-6 flex-shrink-0 transition-transform ${isSelected ? 'text-core-neon translate-x-2' : 'text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-start mt-8">
                      <button onClick={prevStep} className="text-gray-500 hover:text-white font-mono text-sm tracking-wider uppercase flex items-center gap-2 transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Voltar
                      </button>
                    </div>
                  </motion.div>
                );
              }
              return null;
            })}

            {/* Bloco 3: Loading Tech */}
            {step === 6 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-core-neon opacity-20"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-b-2 border-l-2 border-white opacity-40"
                  />
                  <Cpu className="w-10 h-10 text-core-neon animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-mono text-white mb-4 tracking-widest uppercase">Processando Laudo</h3>
                <div className="space-y-3 font-mono text-sm text-gray-500 max-w-sm text-left mx-auto">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{'>'} Analisando throughput operacional...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>{'>'} Calculando custos invisíveis...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>{'>'} Compilando arquitetura recomendada...</motion.p>
                </div>
              </motion.div>
            )}

            {/* Bloco 4: RESULTADO (Laudo) */}
            {step === 7 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                {getResultType() === 'alerta' && (
                  <div className="bg-[#1a0505]/90 backdrop-blur-2xl border border-red-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_100px_rgba(239,68,68,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-white text-red-500 uppercase tracking-tight">ALERTA DE SANGRAMENTO FINANCEIRO</h2>
                    </div>
                    
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-light">
                      Sua empresa possui alto faturamento, mas opera com infraestrutura de uma microempresa. O uso de processos amadores com a sua atual equipe gera uma <strong className="text-white font-medium">estimativa de R$ 40.000 a R$ 90.000 em custos invisíveis e perdas por ano.</strong>
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                      Sua operação corre risco real de colapso por escala. A solução não é contratar mais funcionários para preencher planilhas, é implementar um Sistema Operacional de Ciclo Fechado.
                    </p>

                    <a 
                      href="https://wa.me/5582993236678?text=Ol%C3%A1%2C%20fiz%20o%20Raio-X%20e%20meu%20laudo%20deu%20Alerta%20Vermelho." 
                      target="_blank" rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold text-lg px-8 py-5 uppercase tracking-[0.15em] rounded-xl transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]"
                    >
                      <Bot className="w-6 h-6" /> FALAR COM SDR (PRIORIDADE MÁXIMA)
                    </a>
                  </div>
                )}

                {getResultType() === 'frankenstein' && (
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-yellow-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_100px_rgba(234,179,8,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/50 flex items-center justify-center">
                        <Activity className="w-8 h-8 text-yellow-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-yellow-500 uppercase tracking-tight">O EFEITO FRANKENSTEIN</h2>
                    </div>
                    
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-light">
                      Você está pagando caro por assinaturas de softwares genéricos que não conversam entre si, ou forçando sua equipe a usar um ERP engessado. Isso causa <strong className="text-white font-medium">'Cegueira Tática' na diretoria e frustração na ponta.</strong>
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                      Sua operação bateu num teto de vidro. Você precisa parar de pagar aluguel de sistemas descentralizados e construir o seu Ativo Tecnológico Próprio para retomar o controle das margens.
                    </p>

                    <a 
                      href="https://wa.me/5582993236678?text=Ol%C3%A1%2C%20fiz%20o%20Raio-X%20e%20meu%20laudo%20deu%20Efeito%20Frankenstein." 
                      target="_blank" rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-5 uppercase tracking-[0.15em] rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      <Target className="w-6 h-6" /> AGENDAR SESSÃO ARQUITETURAL
                    </a>
                  </div>
                )}

                {getResultType() === 'posicionamento' && (
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-core-neon/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,255,65,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-core-neon" />
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-core-neon/10 border border-core-neon/50 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-core-neon" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-core-neon uppercase tracking-tight">TRAÇÃO E POSICIONAMENTO</h2>
                    </div>
                    
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-light">
                      Neste momento da sua empresa, implantar um Sistema Operacional complexo seria um excesso de engenharia. O seu gargalo atual não é descentralização extrema, é <strong className="text-white font-medium">Atração e Conversão.</strong>
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                      Sua prioridade imediata deve ser construir uma presença digital de alta autoridade para atrair clientes que pagam mais caro pelo seu serviço.
                    </p>

                    <a 
                      href="https://wa.me/5582993236678?text=Ol%C3%A1%2C%20fiz%20o%20Raio-X%20e%20meu%20laudo%20deu%20Gargalo%20de%20Posicionamento." 
                      target="_blank" rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-3 bg-core-neon text-black hover:bg-white font-bold text-lg px-8 py-5 uppercase tracking-[0.15em] rounded-xl transition-all shadow-[0_0_30px_rgba(0,255,65,0.2)]"
                    >
                      <Target className="w-6 h-6" /> FALAR SOBRE SITES & BRANDING
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
