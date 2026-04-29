import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  '/PNimage.jpg',
  '/PNpic2.jpg',
  '/PNpic3.jpg',
  '/PNpic5.jpg',
  '/PNpic6.jpg',
];

export default function ImageGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full relative mt-12 bg-black py-16">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-brand-sky font-sans font-bold tracking-[0.2em] uppercase text-xs mb-2">Our Community</h2>
          <h3 className="text-white font-display text-3xl uppercase italic font-black tracking-tighter">Life at Planet Nutrition</h3>
        </div>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-sky hover:border-brand-sky transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-sky hover:border-brand-sky transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrolling Gallery Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-6 lg:px-8 pb-4 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {images.map((src, index) => (
          <motion.div
            key={src}
            layoutId={`gallery-image-${src}`}
            onClick={() => setSelectedImage(src)}
            className="relative shrink-0 w-[280px] h-[350px] md:w-[400px] md:h-[500px] snap-center cursor-pointer overflow-hidden group"
          >
            <img 
              src={src} 
              alt={`Planet Nutrition Community ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-brand-sky/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-sky transition-colors z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.img
              layoutId={`gallery-image-${selectedImage}`}
              src={selectedImage}
              alt="Planet Nutrition Enlarged"
              className="max-w-full max-h-full object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
