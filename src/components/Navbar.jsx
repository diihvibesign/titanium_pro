import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ShinyButton } from './ui/shiny-button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = React.memo(({ onLoginClick }) => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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

  const navLinks = [
    { name: 'Estrutura', href: '#estrutura' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Planos', href: '#planos' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <>
      <nav 
        id="app-navbar" 
        ref={navRef} 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 rounded-full px-6 md:px-8 py-3 border flex items-center justify-between w-[95%] max-w-5xl 
          ${isOpen 
            ? 'bg-[#0D0D12] border-white/10 shadow-2xl' 
            : 'border-transparent [&.nav-scrolled]:bg-[#0D0D12]/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-white/10 [&.nav-scrolled]:shadow-2xl'
          } text-white`}
      >
        <a href="#home" className="font-heading font-bold text-2xl uppercase tracking-widest text-primary cursor-pointer hover:scale-[1.02] transition-transform">
          <img 
            src="https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/00173254-83d9-4cf3-939d-97b8e6848079.png" 
            alt="Titanium Logo" 
            width="230"
            height="84"
            fetchpriority="high"
            className="h-8 md:h-12 w-auto object-contain" 
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium opacity-80">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:-translate-y-px transition-all hover:text-primary hover:opacity-100">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ShinyButton
            onClick={onLoginClick}
            className="hidden sm:block !py-2 !px-6 !text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            Login
          </ShinyButton>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none relative z-[1000]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] bg-[#0D0D12] md:hidden flex flex-col items-center justify-center p-8"
          >
            {/* Background pattern for premium feel */}
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)]" />
            
            <div className="flex flex-col items-center space-y-4 w-full relative z-10 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-primary text-4xl uppercase tracking-tighter font-black transition-all text-center w-full py-6 border-b border-white/5"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full pt-10"
              >
                <ShinyButton
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="w-full !py-8 !text-lg uppercase tracking-[0.2em] font-black shadow-[0_0_50px_rgba(254,22,22,0.4)]"
                >
                  Login
                </ShinyButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
