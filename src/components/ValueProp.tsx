import React from 'react';
import { motion } from 'motion/react';

const values = [
  "3RD PARTY TESTED",
  "BANNED SUBSTANCE FREE",
  "GMP CERTIFIED FACILITY",
  "100% PURE INGREDIENTS",
  "REAL FRUIT SMOOTHIES",
  "FAST NATIONWIDE SHIPPING",
  "ATHLETE APPROVED",
  "CLINICALLY DOSED",
];

export default function ValueProp() {
  const doubledValues = [...values, ...values];

  return (
    <section className="w-full bg-black py-4 overflow-hidden flex items-center relative group cursor-default">
      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex items-center w-max relative z-0"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        {doubledValues.map((text, i) => (
          <div 
            key={i}
            className="flex items-center justify-center"
          >
            <span className="px-6 md:px-10 text-[14px] md:text-[18px] font-black italic tracking-tighter text-white uppercase whitespace-nowrap">
              {text}
            </span>
            <div className="h-6 w-1.5 bg-brand-sky transform skew-x-[-20deg]"></div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
