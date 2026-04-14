import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ShinyButton } from './ui/shiny-button';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ onLoginClick }) {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50px',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav id="app-navbar" ref={navRef} className="fixed top-6 inset-x-0 mx-auto z-50 transition-all duration-500 rounded-full px-8 py-3 border border-transparent flex items-center justify-between w-[95%] max-w-5xl [&.nav-scrolled]:bg-[#0D0D12]/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-white/10 [&.nav-scrolled]:shadow-2xl text-white">
      <a href="#home" className="font-heading font-bold text-2xl uppercase tracking-widest text-primary cursor-pointer hover:scale-[1.02] transition-transform">
        <img src="https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/00173254-83d9-4cf3-939d-97b8e6848079.png" alt="Titanium Logo" className="h-12 object-contain" />
      </a>
      <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium opacity-80">
        <a href="#estrutura" className="hover:-translate-y-px transition-all hover:text-primary hover:opacity-100">Estrutura</a>
        <a href="#agenda" className="hover:-translate-y-px transition-all hover:text-primary hover:opacity-100">Agenda</a>
        <a href="#planos" className="hover:-translate-y-px transition-all hover:text-primary hover:opacity-100">Planos</a>
        <a href="#localizacao" className="hover:-translate-y-px transition-all hover:text-primary hover:opacity-100">Localização</a>
      </div>
      <ShinyButton 
        onClick={onLoginClick}
        className="!py-2 !px-6 !text-[10px] uppercase tracking-[0.2em] font-bold"
      >
        Login
      </ShinyButton>
    </nav>
  );
}
