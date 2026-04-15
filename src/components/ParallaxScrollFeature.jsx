import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

const sections = [
  {
    id: 1,
    title: "Estrutura Premium",
    description: "Equipamentos de última geração, ambiente climatizado e espaço amplo projetado para performance máxima. Cada detalhe foi pensado para quem busca resultado de verdade.",
    imageUrl: 'https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/81576e95-6a96-4a40-8304-2fb36703ac82.png',
    reverse: false,
  },
  {
    id: 2,
    title: "Treino Personalizado",
    description: "Acompanhamento exclusivo com profissionais experientes que traçam o melhor caminho para seus objetivos — seja ganho de massa, emagrecimento ou condicionamento.",
    imageUrl: 'https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/1d0820e2-134f-4851-b025-0582e9454089.png',
    reverse: true,
  },
  {
    id: 3,
    title: "Modalidades Diversas",
    description: "Muay Thai, Box, Pilates Studio e aulas funcionais. Uma grade completa que mantém seu treino dinâmico, desafiador e sempre motivador.",
    imageUrl: 'https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/81576e95-6a96-4a40-8304-2fb36703ac82.png',
    reverse: false,
  },
  {
    id: 4,
    title: "Comunidade Forte",
    description: "Mais do que uma academia — um ambiente que inspira disciplina e superação. Aqui, cada pessoa que treina ao seu lado eleva o seu nível.",
    imageUrl: 'https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/1d0820e2-134f-4851-b025-0582e9454089.png',
    reverse: true,
  },
];

function ParallaxSection({ section, index }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-70, 0]); // Increased movement for more impact

  return (
    <div
      ref={sectionRef}
      className={cn(
        "min-h-[80vh] flex items-center justify-center gap-12 md:gap-24 lg:gap-32 px-4 md:px-8 py-24 max-w-[1700px] mx-auto",
        section.reverse ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"
      )}
    >
      {/* Text Content */}
      <motion.div style={{ y: translateY }} className="max-w-xl md:w-1/2">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
          0{section.id}
        </span>
        <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight mb-10">
          {section.title}
        </h3>
        <motion.p
          style={{ y: translateY }}
          className="text-zinc-200 font-light leading-relaxed text-lg md:text-lg lg:text-xl"
        >
          {section.description}
        </motion.p>
        <div className="mt-12 h-[2px] w-24 bg-primary/50" />
      </motion.div>

      {/* Image */}
      <motion.div
        style={{
          opacity,
          clipPath,
        }}
        className="relative md:w-1/2 flex justify-center"
      >
        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_0_60px_rgba(254,22,22,0.15)]">
          <img
            src={section.imageUrl}
            alt={section.title}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12]/50 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

export default function ParallaxScrollFeature() {
  return (
    <section id="estrutura" className="w-full bg-transparent relative overflow-hidden">
      {/* Top transition gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0D0D12] to-transparent z-10 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center pt-40 pb-16 px-6 relative z-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-5 block"
        >
          Experiência Premium
        </motion.span>
      </div>

      {/* Parallax Sections */}
      <div className="flex flex-col relative z-20 pb-32">
        {sections.map((section, index) => (
          <ParallaxSection key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0D0D12] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
