import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let fired = false;
    
    // The master reveal function
    const triggerReveal = () => {
      if (fired) return;
      fired = true;
      gsap.to('.hero-text, #app-navbar, #whatsapp-button', { 
        autoAlpha: 1, 
        y: 0, 
        duration: 1.5, 
        stagger: 0.15, 
        ease: "power3.out",
        pointerEvents: "auto"
      });
    };

    if (typeof window !== 'undefined' && window.scrollY > 50) {
      triggerReveal();
    }

    const ctx = gsap.context(() => {
      // Intentionally hide the content and global navbar at the start
      gsap.set('.hero-text, #app-navbar, #whatsapp-button', { autoAlpha: 0, y: 30 });
      
      // If the user naturally scrolls down before the video finishes, 
      // forcefully reveal the navbar and content to prevent trapping them.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top -50px",
        onEnter: triggerReveal,
      });

    }, containerRef);

    // Bind native video ended event
    if (videoRef.current) {
      videoRef.current.onended = triggerReveal;
    }

      // Safety fallback: if video is blocked entirely by browser policies, show UI after 12s
      const fallbackId = setTimeout(triggerReveal, 12000);

      return () => {
        clearTimeout(fallbackId);
        if (videoRef.current) {
          videoRef.current.onended = null;
        }
        ctx.revert();
        // Ensure the navbar is visible defensively if the component unmounts
        gsap.set('#app-navbar', { autoAlpha: 1, y: 0 });
      };
    }, []);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D0D12]">
      {/* BACKGROUND VIDEO (One-Shot) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover object-[center_35%] md:object-center opacity-60 scale-125 md:scale-100 transition-transform duration-1000"
        >
          {/* Ocultando loop para tocar apenas uma vez e congelar no final */}
          <source src="/videos/video_hero_section_optimized.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12]/20 via-black/50 to-[#0D0D12]"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-20">
        
        {/* STORYTELLING INCORPORADO */}
        <span className="hero-text inline-block py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs tracking-[0.2em] font-semibold uppercase mb-8 shadow-[0_0_15px_rgba(254,22,22,0.15)] backdrop-blur-sm">
          A Forja dos Campeões
        </span>

        {/* HEADLINE */}
        <h1 className="hero-text font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 max-w-4xl leading-[1.1] md:leading-[1.05] drop-shadow-2xl">
          Sua melhor versão começa na Titanium Pro
        </h1>

        {/* SUBHEADLINE */}
        <p className="hero-text text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 max-w-2xl drop-shadow-lg leading-relaxed px-4 md:px-0">
          A academia premium de Goiânia com estrutura de alto nível, <br className="hidden sm:block" /> treino personalizado e uma comunidade que te impulsiona a <span className="text-white font-bold whitespace-nowrap">superar limites.</span>
        </p>

        {/* CTA BOTAO */}
        <div className="hero-text">
          <button 
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white uppercase tracking-[0.15em] bg-primary rounded-full overflow-hidden shadow-[0_0_20px_rgba(254,22,22,0.4)] hover:shadow-[0_0_40px_rgba(254,22,22,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black/20 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative">Comece Agora</span>
          </button>
        </div>
        
      </div>
    </section>
  );
}
