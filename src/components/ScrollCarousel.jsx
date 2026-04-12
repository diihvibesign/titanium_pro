import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCarousel() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  const advantages = [
    { title: "Saudável", desc: "Equilíbrio entre corpo e mente." },
    { title: "Dinâmico", desc: "Atividades intensas e variadas." },
    { title: "Divertido", desc: "A alegria de superar limites todos os dias." },
    { title: "Personalizado", desc: "Acompanhamento exclusivo para seus objetivos." }
  ];

  const bgImages = [
    "https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/81576e95-6a96-4a40-8304-2fb36703ac82.png",
    "https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/1d0820e2-134f-4851-b025-0582e9454089.png"
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray('.carousel-item');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + wrapperRef.current.offsetWidth
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="estrutura" className="h-[100vh] w-full overflow-hidden bg-transparent flex items-center">
      <div ref={wrapperRef} className="flex h-full items-center w-[400vw] sm:w-[300vw]">
        {advantages.map((item, i) => (
          <div key={i} className="carousel-item flex-shrink-0 w-screen h-full flex flex-col justify-center items-center px-10 md:px-32 relative">
            
            <div className="absolute inset-0 bg-[#0D0D12]">
              <img 
                src={bgImages[i % 2]} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-90"
              />
              {/* Vertical Fade */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D0D12] to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0D12] to-transparent z-10" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12] via-[#0D0D12]/40 to-transparent z-0" />
            </div>
            
            <div className="relative z-10 w-full max-w-4xl text-left border-l-4 border-primary pl-8">
              <h2 className="font-heading text-5xl md:text-8xl font-bold text-white uppercase mb-4">{item.title}</h2>
              <p className="font-drama text-2xl md:text-4xl text-primary italic max-w-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
