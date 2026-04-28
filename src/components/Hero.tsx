import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const slides = [
  {
    id: 'protein',
    title: 'PREMIUM WHEY MATRIX PROTEIN',
    subtitle: 'Premium Muscle Recovery',
    category: 'Protein',
    desc: 'Rapid-absorbing muscle fuel for elite performance. 30 Servings.',
    bgImage: '/wheyherosection.jpeg',
    bgPosition: '75% 30%',
    color: 'from-blue-100/50'
  },
  {
    id: 'preworkout',
    title: 'PURE POWER LIMITLESS ENERGY',
    subtitle: 'Explosive Energy & Pump',
    category: 'Pre-Workout',
    desc: 'Max-dose energy and focus for your toughest training sessions.',
    bgImage: '/purepowerherosection.jpeg',
    bgPosition: '75% 60%',
    color: 'from-red-100/50'
  },
  {
    id: 'creatine',
    title: '100% PURE CREATINE MONOHYDRATE',
    subtitle: 'Unflavored Muscle Builder',
    category: 'Creatine',
    desc: 'Clinically proven formula to increase strength and power output.',
    bgImage: '/creatineherosection.jpeg',
    bgPosition: '80% 60%',
    color: 'from-gray-200/50'
  }
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
    };
  }
};

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentSlide = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]); 

  return (
    <section className="relative w-full h-[60svh] md:h-[70vh] bg-white overflow-hidden group">
      
      {/* Background Triangle Shape for Bigger Section */}
      <div 
        className="absolute bottom-0 left-0 w-[50vw] h-[80vh] bg-gray-50 opacity-80 z-0 pointer-events-none hidden md:block" 
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} 
      />

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" }
          }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center py-8 px-4 md:px-16 w-full"
        >
          {/* Background Image Container */}
          {slides[currentSlide].bgImage && (
            <>
              <div 
                className="absolute inset-0 z-0 bg-cover bg-no-repeat"
                style={{ 
                  backgroundImage: `url('${slides[currentSlide].bgImage}')`,
                  backgroundPosition: slides[currentSlide].bgPosition || 'center'
                }}
              />
              {/* Slight dark overlay to increase text contrast */}
              <div className="absolute inset-0 z-0 bg-black/60" />
            </>
          )}

          {/* Text Content */}
          <div className={`w-full ${slides[currentSlide].image ? 'md:w-1/2' : 'md:w-1/2 md:mr-auto'} flex flex-col relative z-20 text-left mt-4 md:mt-0 p-4 md:p-8`}>
            <h2 className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-brand-sky mb-2 md:mb-4 uppercase">
              {slides[currentSlide].category} Series
            </h2>
            <h3 className={`${slides[currentSlide].bgImage ? 'text-white' : 'text-black'} font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black italic leading-none tracking-tighter mb-4`}>
              {slides[currentSlide].title}
            </h3>
            
            <div className="border-l-4 border-brand-sky pl-4 mb-6">
              <p className={`${slides[currentSlide].bgImage ? 'text-gray-200' : 'text-gray-800 md:text-gray-600'} font-sans text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase max-w-lg`}>
                {slides[currentSlide].subtitle} <br className="hidden md:block"/> {slides[currentSlide].desc}
              </p>
            </div>

            {/* Added Content for Depth */}
            <div className={`flex flex-col md:flex-row gap-2 md:gap-6 mb-6 md:mb-10 text-[10px] md:text-xs font-bold ${slides[currentSlide].bgImage ? 'text-gray-300' : 'text-gray-700 md:text-gray-500'} uppercase tracking-widest justify-start`}>
              <span className="flex items-center justify-start gap-2"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-brand-sky" /> Clinically Dosed</span>
              <span className="flex items-center justify-start gap-2"><CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-brand-sky" /> 3rd Party Tested</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button className="flex items-center justify-center gap-3 bg-brand-deep text-white rounded-none font-sans font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] px-8 py-3 md:px-10 md:py-4 hover:bg-brand-sky hover:text-black transition-all duration-300 shadow-xl">
                Shop {slides[currentSlide].category}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Content (Only renders if 'image' exists) */}
          {slides[currentSlide].image && (
            <div className="w-full md:w-1/2 h-[35vh] md:h-[70vh] flex items-center justify-center relative z-10 mt-4 md:mt-0">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="max-h-full max-w-[80%] md:max-w-full object-contain"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center gap-3 md:gap-4 z-30 w-full px-6 max-w-[200px] md:max-w-xs">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => {
              const newDirection = idx > currentSlide ? 1 : -1;
              if(idx !== currentSlide) setPage([idx, newDirection]);
            }}
            className={`h-1.5 md:h-2 transition-all duration-500 rounded-full flex-1 ${
              currentSlide === idx 
                ? 'bg-brand-sky opacity-100 shadow-[0_0_10px_rgba(0,174,239,0.5)]' 
                : 'bg-white/50 hover:bg-white/80 opacity-60 hover:opacity-100'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
