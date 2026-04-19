import React, { useState } from 'react';
import { useAdaptiveAnimation } from '../hooks/useAdaptiveAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

const weeklySchedule = {
  "Segunda": [
    { time: "06:30", name: "ABS", duration: "20 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "07:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:30", name: "ABS", duration: "30 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "19:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "20:00", name: "MUAY THAI", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
    { time: "21:00", name: "BOXE", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
  ],
  "Terça": [
    { time: "07:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "08:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "19:10", name: "KARATÊ", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
    { time: "20:15", name: "RITMOS", duration: "50 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
  ],
  "Quarta": [
    { time: "06:30", name: "ABS", duration: "20 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "07:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:30", name: "ABS", duration: "30 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "19:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "20:00", name: "MUAY THAI", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
    { time: "21:00", name: "BOXE", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
  ],
  "Quinta": [
    { time: "07:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "08:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "19:10", name: "KARATÊ", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
    { time: "20:15", name: "RITMOS", duration: "50 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
  ],
  "Sexta": [
    { time: "06:30", name: "ABS", duration: "20 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "07:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "18:30", name: "ABS", duration: "30 min", instructor: "EQUIPE TITANIUM", type: "funcional" },
    { time: "19:00", name: "MUAY THAI", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
    { time: "19:00", name: "STUDIO PILATES", duration: "60 min", instructor: "INSTRUTOR VIP", type: "pilates" },
    { time: "21:00", name: "BOXE", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
  ],
  "Sábado": [
    { time: "09:00", name: "KARATÊ", duration: "60 min", instructor: "PROF. TITANIUM", type: "luta" },
  ]
};

const typeColors = {
  funcional: "from-white/10 to-white/5 text-white border-white/10 shadow-[0_4px_20px_rgba(255,255,255,0.02)]",
  luta: "from-primary/30 to-primary/5 text-primary border-primary/20 shadow-[0_4px_20px_rgba(254,22,22,0.05)]",
  pilates: "from-white/5 to-transparent text-white border-white/5 opacity-80",
};

const AgendaLoop = React.memo(() => {
  const [activeDay, setActiveDay] = useState("Segunda");
  const days = Object.keys(weeklySchedule);
  const { durationMultiplier, maxSimultaneousAnimations } = useAdaptiveAnimation();

  return (
    <section id="agenda" className="w-full py-24 bg-transparent relative">
      {/* Upper transition shadow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0D0D12] to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20">
        
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter text-balance"
          >
            Agenda da <span className="text-primary italic font-drama">Semana</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * durationMultiplier }}
            className="text-white max-w-2xl mx-auto font-light text-lg md:text-xl text-balance"
          >
            Escolha sua modalidade e supere seus limites. Aulas dinâmicas e instrutores focados no seu resultado.
          </motion.p>
        </div>

        {/* Day Selector - Mobile Optimized */}
        <div className="flex justify-center mb-16 md:mb-20 -mx-4 md:mx-0 overflow-hidden">
          <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`relative px-6 py-4 md:px-10 md:py-4 rounded-full text-sm md:text-sm font-bold uppercase tracking-widest transition-colors z-10 whitespace-nowrap snap-center ${
                  activeDay === day ? "text-black" : "text-zinc-200 hover:text-white"
                }`}
              >
                {activeDay === day && (
                  <motion.div
                    layoutId="activeDayPill"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 * durationMultiplier }}
                  />
                )}
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Classes List */}
        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 * durationMultiplier }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {weeklySchedule[activeDay].map((item, i) => (
                <motion.div
                  key={`${activeDay}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i < maxSimultaneousAnimations ? i * 0.06 * durationMultiplier : 0 }}
                  className={`glass-panel p-8 border group hover:border-primary/50 transition-all cursor-pointer bg-gradient-to-br snap-start sm:snap-align-none ${typeColors[item.type]}`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 mb-2 block text-zinc-200">
                        {item.type}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-white/90">
                      {item.time}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 pt-6 border-t border-white/10">
                    <div className="flex items-center text-xs md:text-sm text-zinc-100 font-medium">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {item.duration}
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-zinc-300 font-light italic">
                      <Users className="w-4 h-4 mr-2 text-primary/70" />
                      {item.instructor}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
});

export default AgendaLoop;
