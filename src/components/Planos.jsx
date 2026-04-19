import React from 'react';
import { GlowCard } from './ui/spotlight-card';
import { MagneticButton } from './ui/magnetic-button';
import { ShinyButton } from './ui/shiny-button';

export default function Planos({ onPlanoClick }) {
  const plans = [
    {
      name: "Musculação e Ergometria Mensal",
      price: "159,90",
      period: "Duração de 1 mês",
      highlight: false
    },
    {
      name: "Plano VIP",
      price: "109,90",
      period: "por mês",
      subtext: "1.318,80 em até 12x",
      tag: "MAIS VANTAJOSO",
      highlight: true
    },
    {
      name: "Plano Black",
      price: "139,90",
      period: "por mês",
      subtext: "Fidelidade: 2 meses",
      highlight: false
    }
  ];

  return (
    <section id="planos" className="w-full py-24 bg-transparent relative overflow-hidden">
      {/* Upper transition shadow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0D0D12] to-transparent z-10 pointer-events-none" />
      
      {/* Background Decorativo */}     <div className="absolute inset-0 bg-[#FE1616] opacity-[0.02] filter blur-[150px] rounded-full pointer-events-none w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="text-center z-10 mb-20">
        <h2 className="font-heading text-5xl md:text-7xl lg:text-[5rem] font-bold text-white uppercase tracking-tighter">
          Escolha seu <span className="text-primary italic font-drama">Plano</span>
        </h2>
        <p className="text-zinc-200 mt-4 max-w-lg mx-auto font-light">Investimento acessível para resultados extraordinários. Sem taxa de matrícula, sem pegadinhas.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto gap-10 lg:gap-8 z-10 w-full max-w-6xl px-6 md:px-0">
        {plans.map((plan) => (
          <GlowCard 
            key={plan.name} 
            glowColor={plan.highlight ? "titaniumVip" : "titaniumNormal"}
            className={`group w-full lg:w-1/3 backdrop-blur-xl ${plan.highlight ? 'shadow-[0_0_40px_rgba(254,22,22,0.15)] scale-[1.02] md:scale-105 z-20 my-4 md:my-0' : 'shadow-2xl'}`}
          >
            <div>
              {plan.tag && (
                <span className="bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-6 inline-block">
                  {plan.tag}
                </span>
              )}
              <h3 className="font-heading font-bold text-2xl text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline text-white mb-2">
                <span className="text-2xl font-bold mr-1">R$</span>
                <span className="text-5xl font-bold">{plan.price}</span>
              </div>
              <p className="text-white font-medium mb-6">{plan.period}</p>
              
              <ul className="mb-8 space-y-4">
                <li className="flex items-center text-white font-light">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Acesso Total à Musculação
                </li>
                <li className="flex items-center text-white font-light">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Aulas Coletivas Inclusas
                </li>
                {plan.subtext && (
                  <li className="flex items-center text-primary/80 font-medium text-sm mt-4">
                    {plan.subtext}
                  </li>
                )}
              </ul>
            </div>
            <MagneticButton distance={0.05}>
              <ShinyButton 
                onClick={onPlanoClick}
                className={`w-full !py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all mt-8 ${!plan.highlight ? '!bg-transparent !border !border-white/20 !text-white hover:!border-primary hover:!text-primary' : ''}`}
                style={plan.highlight ? { '--shiny-cta-bg': '#FE1616', '--shiny-cta-fg': '#ffffff', '--shiny-cta-highlight': 'white' } : {}}
              >
                GARANTIR MEU PLANO
              </ShinyButton>
            </MagneticButton>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
