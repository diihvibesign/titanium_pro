import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParallaxScrollFeature from './components/ParallaxScrollFeature';
import Testimonials from './components/Testimonials';
import AgendaLoop from './components/AgendaLoop';
import Planos from './components/Planos';
import Localizacao from './components/Localizacao';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AuthScreen from './components/AuthScreen';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
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

    // Reset scroll to top on reload
    window.scrollTo(0, 0);

    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      // Apenas faz o scroll se o href for válido e começar com # (ex: #planos, #estrutura)
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5,
          });
        }
      }
    };
    
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleLinkClick));
    
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleLinkClick));
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-[#0D0D12] text-white overflow-hidden selection:bg-primary selection:text-white relative">
      <Navbar onLoginClick={() => openAuth('login')} />
      <Hero />
      <ParallaxScrollFeature />
      <Testimonials />
      <AgendaLoop />
      <Planos onPlanoClick={() => openAuth('signup')} />
      <Localizacao />
      <Footer />
      <WhatsAppButton />
      
      <AuthScreen 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authView} 
      />
    </main>
  );
}

export default App;
