import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShinyButton } from './ui/shiny-button';
import { MagneticButton } from './ui/magnetic-button';
import { runWhenIdle } from '../utils/idleLoad';
import { useAdaptiveAnimation } from '../hooks/useAdaptiveAnimation';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { durationMultiplier, stagger } = useAdaptiveAnimation();
  const { isMobile, isLowEndDevice } = useDevicePerformance();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { y: 12, opacity: 0.01 },
        {
          y: 0,
          opacity: 1,
          duration: Math.max(0.45, 1 * durationMultiplier),
          stagger,
          ease: 'power2.out',
          delay: 0.05,
          clearProps: 'transform,opacity',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [durationMultiplier, stagger]);

  useEffect(() => {
    const enableVideo = () => setShouldLoadVideo(true);
    const cleanupIdle = runWhenIdle(enableVideo, isLowEndDevice ? 2600 : 1400);

    window.addEventListener('pointerdown', enableVideo, { once: true, passive: true });
    window.addEventListener('scroll', enableVideo, { once: true, passive: true });

    return () => {
      cleanupIdle();
      window.removeEventListener('pointerdown', enableVideo);
      window.removeEventListener('scroll', enableVideo);
    };
  }, [isLowEndDevice]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [shouldLoadVideo]);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D0D12]">
      <div className="absolute inset-0 z-0">
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload={isMobile ? 'metadata' : 'auto'}
            poster="/images/hero-poster.webp"
            onCanPlay={() => setIsVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.35] scale-105"
          >
            <source media="(max-width: 767px)" src="/videos/video_hero_section_optimized.webm" type="video/webm" />
            <source src="/videos/video_hero_section_optimized.webm" type="video/webm" />
          </video>
        )}

        <img
          src="/images/hero-poster.webp"
          alt="Hero Poster"
          className={`absolute inset-0 w-full h-full object-cover grayscale brightness-[0.35] scale-105 transition-opacity duration-500 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0D0D12]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-10">
        <span className="hero-animate inline-block py-1 px-4 rounded-full bg-primary/20 text-white border border-primary/40 text-[10px] tracking-[0.3em] font-bold uppercase mb-8 backdrop-blur-md">
          A Forja dos Campeões
        </span>

        <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter mb-6 max-w-5xl leading-[0.95] drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          Titanium <span className="text-primary italic">Pro</span>
        </h1>

        <p className="hero-animate text-sm sm:text-base md:text-lg text-zinc-100 font-light mb-10 max-w-2xl tracking-widest uppercase leading-relaxed drop-shadow-lg">
          Estrutura premium • Treino personalizado • Performance máxima
        </p>

        <div className="hero-animate flex flex-col sm:flex-row items-center gap-8">
          <MagneticButton distance={0.2}>
            <ShinyButton
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 text-[12px] tracking-[0.25em] font-black uppercase shadow-[0_0_40px_rgba(254,22,22,0.3)] hover:shadow-[0_0_60px_rgba(254,22,22,0.5)] transition-shadow duration-500 scale-105 sm:scale-110"
              style={{ '--shiny-cta-bg': '#FE1616', '--shiny-cta-fg': '#ffffff' }}
            >
              Escolha seu Plano
            </ShinyButton>
          </MagneticButton>

          <MagneticButton distance={0.3}>
            <a
              href="#estrutura"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] font-bold text-white hover:text-primary transition-all drop-shadow-md"
            >
              <span>Conheça a Unidade</span>
              <div className="w-10 h-[1px] bg-white/40 group-hover:w-14 group-hover:bg-primary transition-all duration-300" />
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#0D0D12] to-transparent pointer-events-none" />
    </section>
  );
}
