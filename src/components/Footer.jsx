import React from 'react';
import {
  Instagram
} from 'lucide-react';

const data = {
  instaLink: 'https://www.instagram.com/titaniumpro_academia/', // Atualizado Instagram
  company: {
    name: 'Titanium Pro',
    description: 'A academia premium de Goiânia. Estrutura de alto nível, treino personalizado e uma comunidade que inspira resultados reais.',
    hours: 'Seg–Sex: 05:10–23h · Sáb: 8–17h · Dom: 8–12h',
  },
};

const navLinks = [
  { text: 'Estrutura', href: '#estrutura' },
  { text: 'Agenda', href: '#agenda' },
  { text: 'Planos', href: '#planos' },
  { text: 'Localização', href: '#localizacao' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full overflow-hidden bg-transparent pt-16 pb-6">
      
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" className="flex justify-center md:justify-start items-center mb-6 hover:opacity-80 transition-opacity">
              <img 
                src="https://w12evostorage.w12app.com.br/evo/upload-imagem/27326/00173254-83d9-4cf3-939d-97b8e6848079.png" 
                alt="Titanium Logo" 
                width="230"
                height="84"
                className="h-14 w-auto object-contain brightness-0 invert opacity-90" 
              />
            </a>
            <p className="text-zinc-200 font-light leading-relaxed max-w-md">
              A Titanium Pro Academia oferece uma experiência fitness premium, unindo equipamentos de ponta, 
              treinadores especializados e um ambiente exclusivo para transformar seu corpo e mente.
            </p>
            <p className="text-zinc-200 font-light text-xs mt-2">
              {data.company.hours}
            </p>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            {navLinks.map(({ text, href }) => (
              <li key={text}>
                <a className="text-sm font-bold text-zinc-200 uppercase tracking-widest hover:text-primary transition-colors" href={href}>
                  {text}
                </a>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <a
              href={data.instaLink}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-200 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="size-5" />
            </a>
          </div>

        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-zinc-200 text-sm font-light">
            &copy; {new Date().getFullYear()} Titanium Pro Academia — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
