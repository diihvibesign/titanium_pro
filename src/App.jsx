import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load non-critical components
const ParallaxScrollFeature = lazy(() => import('./components/ParallaxScrollFeature'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const AgendaLoop = lazy(() => import('./components/AgendaLoop'));
const Planos = lazy(() => import('./components/Planos'));
const Localizacao = lazy(() => import('./components/Localizacao'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const AuthScreen = lazy(() => import('./components/AuthScreen'));

import { motion, MotionConfig } from 'framer-motion';

import gsap from 'gsap';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Remove ScrollToPlugin for weight reduction

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  useEffect(() => {
    // Initialize Lenis only on Desktop/Tablet
    const isMobile = window.innerWidth < 768;
    
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

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    // Reset scroll to top on reload
    window.scrollTo(0, 0);

    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, {
              offset: -100,
              duration: 1.5,
            });
          } else {
            // Native fallback for mobile
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleLinkClick));
    
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleLinkClick));
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-full bg-[#0D0D12] text-white overflow-hidden selection:bg-primary selection:text-white relative">
      <Navbar onLoginClick={() => openAuth('login')} />
      <Hero />
      
      <Suspense fallback={<div className="h-20 w-full bg-[#0D0D12]" />}>
        <ParallaxScrollFeature />
      </Suspense>

      <Suspense fallback={<div className="h-20 w-full bg-[#0D0D12]" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="h-20 w-full bg-[#0D0D12]" />}>
        <AgendaLoop />
      </Suspense>

      <Suspense fallback={<div className="h-20 w-full bg-[#0D0D12]" />}>
        <Planos onPlanoClick={() => openAuth('signup')} />
      </Suspense>

      <Suspense fallback={<div className="h-20 w-full bg-[#0D0D12]" />}>
        <Localizacao />
      </Suspense>

      <Suspense fallback={<div className="h-4 w-full bg-[#0D0D12]" />}>
        <Footer />
      </Suspense>

      {/* Non-visual components share a boundary */}
      <Suspense fallback={null}>
        <WhatsAppButton />
        <AuthScreen 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          initialView={authView} 
        />
      </Suspense>
      </main>
    </MotionConfig>
  );
}

export default App;
