import React, { useEffect, useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { lazyWithIdle } from './utils/dynamicImport';
import { runWhenIdle } from './utils/idleLoad';
import DeferredSection from './components/DeferredSection';

const ParallaxScrollFeature = lazyWithIdle(() => import('./components/ParallaxScrollFeature'));
const Testimonials = lazyWithIdle(() => import('./components/Testimonials'), { idle: true, timeout: 1500 });
const AgendaLoop = lazyWithIdle(() => import('./components/AgendaLoop'), { idle: true, timeout: 1800 });
const Planos = lazyWithIdle(() => import('./components/Planos'), { idle: true, timeout: 2000 });
const Localizacao = lazyWithIdle(() => import('./components/Localizacao'), { idle: true, timeout: 2300 });
const Footer = lazyWithIdle(() => import('./components/Footer'), { idle: true, timeout: 2600 });
const WhatsAppButton = lazyWithIdle(() => import('./components/WhatsAppButton'), { idle: true, timeout: 2000 });
const AuthScreen = lazyWithIdle(() => import('./components/AuthScreen'), { idle: true, timeout: 2200 });

const fallbackByHeight = (heightClass) => <div className={`${heightClass} w-full bg-[#0D0D12]`} />;

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let rafId = 0;
    let lenis = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    const cleanupIdleWarmup = runWhenIdle(() => {
      import('./components/WhatsAppButton');
      import('./components/AuthScreen');
    }, 2200);

    window.scrollTo(0, 0);

    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length <= 1) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: -100, duration: 1.5 });
      } else {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener('click', handleLinkClick));

    return () => {
      cleanupIdleWarmup();
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleLinkClick));
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-full bg-[#0D0D12] text-white overflow-hidden selection:bg-primary selection:text-white relative">
        <Navbar onLoginClick={() => openAuth('login')} />
        <Hero />

        <DeferredSection fallback={fallbackByHeight('h-24')} rootMargin="350px 0px">
          <Suspense fallback={fallbackByHeight('h-24')}>
            <ParallaxScrollFeature />
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={fallbackByHeight('h-20')}>
          <Suspense fallback={fallbackByHeight('h-20')}>
            <Testimonials />
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={fallbackByHeight('h-20')}>
          <Suspense fallback={fallbackByHeight('h-20')}>
            <AgendaLoop />
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={fallbackByHeight('h-20')}>
          <Suspense fallback={fallbackByHeight('h-20')}>
            <Planos onPlanoClick={() => openAuth('signup')} />
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={fallbackByHeight('h-20')}>
          <Suspense fallback={fallbackByHeight('h-20')}>
            <Localizacao />
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={fallbackByHeight('h-4')}>
          <Suspense fallback={fallbackByHeight('h-4')}>
            <Footer />
          </Suspense>
        </DeferredSection>

        <Suspense fallback={null}>
          <WhatsAppButton />
          <AuthScreen isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialView={authView} />
        </Suspense>
      </main>
    </MotionConfig>
  );
}

export default App;
