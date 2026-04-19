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
      <nav id="app-navbar" ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 md:px-8 py-3 border border-transparent flex items-center justify-between w-[95%] max-w-5xl [&.nav-scrolled]:bg-[#0D0D12]/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-white/10 [&.nav-scrolled]:shadow-2xl text-white">
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
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[49] bg-[#0D0D12]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-primary text-sm uppercase tracking-[0.2em] font-semibold py-3 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <ShinyButton
                onClick={() => {
                  onLoginClick();
                  setIsOpen(false);
                }}
                className="w-full !py-4 !text-[10px] uppercase tracking-[0.2em] font-bold mt-4"
              >
                Login
              </ShinyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
