"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role?: string;
}

export const TestimonialsColumn = React.memo((props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl max-w-xs w-full hover:border-red-600/50 transition-colors duration-300" 
                  key={`${index}-${i}`}
                >
                  <div className="text-white/80 text-sm leading-relaxed italic">"{text}"</div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="h-10 w-10 rounded-full border border-red-600/30 bg-gradient-to-br from-red-600/20 to-red-900/40 flex items-center justify-center text-red-500 font-bold text-base shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-white tracking-tight leading-5 text-sm">{name}</div>
                      {role && <div className="leading-5 text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{role}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
});
