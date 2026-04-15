import React from "react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Academia muito completa, aparelhos novos, de qualidade, ótima estrutura, estão sempre investindo mais e mais no espaço e nos equipamentos. Pessoal muito receptivo, atenciosos, vale muito a pena. Recomendo.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjW8yQOM8HABtAOvauZDJl0qyUMHUOP4Q90C8meZTiqOdKzuh_C0=s64-c-rp-mo-br100",
    name: "Sabrynah Freitas",
    role: "Membro Titanium",
  },
  {
    text: "Realmente a melhor e a maior da região. Vale a pena o custo benefício, tendo em vista os excelentes profissionais e aparelhos novos e de ponta. Se você quer bons resultados no seu shape, a titanium com certeza irá te auxiliar.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjUK3MHxYR4DUtdNQKVCmAaop1h_6XYNndCIQi-ak8XHxGHMAddQ=s64-c-rp-mo-br100",
    name: "Sara Arruda",
    role: "Membro Titanium",
  },
  {
    text: "adoro a variedade dos aparelhos, o ambiente é muito agradável e os personais estão sempre dispostos a ajudar para que os alunos se machuquem, recomendo para todos.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXYCC2frKDeW21jY866IWeqfX-tsM5jydtl20HOzlp8j90mY4c=s64-c-rp-mo-ba2-br100",
    name: "Maria Divina",
    role: "Membro Titanium",
  },
  {
    text: "Espetacular. Academia tem uma estrutura incrível, o espaço é amplo; as máquinas bem limpas e organizadas; a iluminação é muito boa. Os profissionais são excelentes, tanto na recepção quanto no treino. Tá recomendado!",
    image: "https://lh3.googleusercontent.com/a/ACg8ocJC8cbV_qtkeN-pyFCljt99kxSzIJpw-A4T3Q9DGk6xJnzpdCpm=s64-c-rp-mo-ba5-br100",
    name: "Jullia",
    role: "Membro Titanium",
  },
  {
    text: "Dois carinhas que são donos, e são o que vendem. Saúde, ideal de vida e bons concelhos aos alunos. Melhor academia sem a menor dúvida da região leste.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXcYNe6Wu3UCJecAzITMJj92_6E9E7_2A3-Kui4_idNOuGnP-I=s64-c-rp-mo-br100",
    name: "Arcanjo",
    role: "Membro Titanium",
  },
  {
    text: "Sim, e uma academia 5 Estrelas não tem como negar. Porém estas estrelas torna uma academia lotada. Mesmo com muitas opções de aparelho as quais você ficar até tonto e ainda se sente no Filme dos Transformers devido o tamanho das máquinas.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjX60zac6hntvSgJT1lcGzumPr7_-ttFRhajbsSnrb70eRz38yF4=s64-c-rp-mo-ba4-br100",
    name: "Maricelo Silva Sales",
    role: "Membro Titanium",
  },
  {
    text: "Melhor da região!",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXFA7v-Inuf731M3KGXLo7KyEcgduvdxkgihMtvZhV2iHt4YSv4=s64-c-rp-mo-ba3-br100",
    name: "Marcondes Batista de Sousa",
    role: "Membro Titanium",
  },
  {
    text: "Ótima receptividade ambiente climatizado ótimos profissionais aparelhos modernos de ótima qualidade.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocL5Oqx1l4FYa6U9SBeO2U245PD0En67oJMBjbk9S1ss1EpWDejC=s64-c-rp-mo-ba2-br100",
    name: "Welton Pinheiro Miranda",
    role: "Membro Titanium",
  },
  {
    text: "Muitos equipamentos novos... Ficou muito melhor!",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKgrVIakOVgXubReuxZNp4Q53HioX0seyVfynIQ44qqOsUORSXR=s64-c-rp-mo-ba3-br100",
    name: "Starley Cazorla",
    role: "Membro Titanium",
  },
  {
    text: "A melhor da região, ótimo espaço, ótimos profissionais, os melhores e mais modernos equipamentos, super recomendo!!!",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjU4sMoOTj5tghpIGi0pTjYAzXAvvU5ey48dfaxwc8mjNPRBmfQj=s64-c-rp-mo-ba4-br100",
    name: "Carolina Minelli",
    role: "Membro Titanium",
  },
];

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 7);
const thirdColumn = testimonials.slice(7, 10);

const Testimonials = React.memo(() => {
  return (
    <section id="testimonials" className="bg-[#0D0D12] py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16"
        >
          <div className="flex justify-center mb-6">
            <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] border border-red-500/20 px-4 py-1.5 rounded-full bg-red-500/5">
              Depoimentos
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white text-center text-balance">
            A VOZ DE QUEM <span className="text-red-600">TREINA PESADO</span>
          </h2>
          <p className="text-center mt-6 text-white/50 text-lg text-balance">
            Confira o que nossos membros dizem sobre a experiência na melhor e maior academia da região.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={32} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
