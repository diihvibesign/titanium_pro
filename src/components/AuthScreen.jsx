import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, ChevronDown } from 'lucide-react';

export default function AuthScreen({ isOpen, onClose, initialView = 'login' }) {
  const [view, setView] = useState(initialView);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setView(initialView);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const UnderlinedInput = ({ label, type = "text", placeholder = "", value, onChange, required = false, icon: Icon, extra, className = "" }) => (
    <div className={`relative group w-full mb-4 text-left ${className}`}>
      <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-0.5 transition-colors group-focus-within:text-primary">
        {label}
      </label>
      <div className="relative flex items-center border-b border-white/10 group-focus-within:border-primary transition-all duration-300">
        {Icon && <Icon className="absolute left-0 text-white/20 group-focus-within:text-primary" size={14} />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-transparent py-2.5 ${Icon ? 'pl-8' : 'pl-0'} pr-10 text-white placeholder:text-white/10 focus:outline-none transition-all text-sm`}
        />
        {extra}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-xl p-4 overflow-y-auto"
        >
          {/* Overlay color - slightly dark to ensure readability but site remains visible */}
          <div className="absolute inset-0 bg-black/20" onClick={onClose} />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-8 right-8 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-[110]"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-[#111111]/90 border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.3)] my-8 relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-6 inline-block">
                 <img src="https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/00173254-83d9-4cf3-939d-97b8e6848079.png" alt="Titanium Logo" className="h-10 w-auto" />
              </div>
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter text-white mb-2">
                {view === 'login' ? 'Login' : 'Cadastro'}
              </h2>
              <p className="text-white/40 text-xs font-medium">
                {view === 'login' ? (
                  <>
                    Se você já é cliente, insira seus dados ou{' '}
                    <button onClick={() => setView('signup')} className="text-primary hover:underline transition-all">cadastre-se</button>.
                  </>
                ) : (
                  <>
                    Já tem cadastro?{' '}
                    <button onClick={() => setView('login')} className="text-primary hover:underline transition-all">Clique aqui para fazer o login.</button>
                  </>
                )}
              </p>
            </div>

            {/* Forms */}
            <form className="space-y-1" onSubmit={(e) => e.preventDefault()}>
              {view === 'login' && (
                <>
                  <UnderlinedInput 
                    label="CPF ou email*"
                    placeholder="000.000.000-00 ou seu@email.com"
                    required
                  />
                  <UnderlinedInput 
                    label="Senha*"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    extra={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />
                  
                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-16 bg-primary hover:bg-red-600 text-white font-black py-4 rounded-xl transition-all uppercase tracking-tighter shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                    >
                      ACESSAR
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-white/30 text-[10px] leading-relaxed max-w-xs mx-auto uppercase tracking-wider">
                      É seu primeiro acesso como cliente ou não lembra a senha?{' '}
                      <button className="text-white/60 hover:text-primary transition-colors underline underline-offset-4 font-bold">
                        Clique aqui para cadastrar uma nova.
                      </button>
                    </p>
                  </div>
                </>
              )}

              {view === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-x-6">
                    <UnderlinedInput label="Nome*" placeholder="Ex: João" required />
                    <UnderlinedInput label="Sobrenome*" placeholder="Ex: Silva" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <UnderlinedInput label="Nascimento*" placeholder="dd/mm/aaaa" required />
                    <UnderlinedInput label="CPF*" placeholder="000.000.000-00" required />
                  </div>
                  
                  <UnderlinedInput label="Email*" type="email" placeholder="seu@email.com" required />
                  
                  <div className="grid grid-cols-[70px_1fr] gap-4">
                     <div className="relative group w-full mb-4">
                        <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-0.5">DDI</label>
                        <div className="relative flex items-center border-b border-white/10 group-focus-within:border-primary transition-all">
                           <span className="text-white text-sm py-2.5 font-medium">+55</span>
                           <ChevronDown className="ml-1 text-white/20" size={14} />
                        </div>
                     </div>
                     <UnderlinedInput label="Celular*" type="tel" placeholder="(00) 00000-0000" required />
                  </div>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.05] transition-all group mt-2">
                    <div className="relative flex items-center pt-0.5">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="h-4 w-4 border-2 border-white/10 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all" />
                      <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 left-1 top-1.5 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[10px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-tight">
                      Aceito receber comunicações com novidades, promoções e outras informações nos meios de contato cadastrados
                    </span>
                  </label>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-red-600 text-white font-black py-4 rounded-xl transition-all uppercase tracking-tighter shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                    >
                      CRIAR CONTA
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
