import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = React.memo(() => {
  const whatsappNumber = "5562982525714";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os planos da Titanium Pro.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  
  return (
    <div id="whatsapp-button" className="fixed bottom-8 right-8 z-[100] flex items-center gap-4">
      <AnimatePresence>
        <motion.a
          initial={{ opacity: 0, scale: 0, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="relative group"
        >
          {/* Tooltip Label */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white">
              Falar com Consultor
            </div>
          </div>

          {/* Main Button */}
          <div className="relative w-16 h-16 flex items-center justify-center bg-black border-2 border-primary/30 rounded-full shadow-[0_0_30px_rgba(254,22,22,0.2)] group-hover:border-primary transition-colors overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
            
            <MessageCircle className="w-8 h-8 text-white relative z-10 group-hover:text-primary transition-colors" />
            
            {/* Animated Pulse Ring */}
            <span className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
            <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-slow opacity-20" />
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
});

export default WhatsAppButton;
