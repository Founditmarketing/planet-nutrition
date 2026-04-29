import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const tabs = ["Supplements", "Protein", "Creatine"];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState("Supplements");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const filteredProducts = (activeTab === "Supplements" 
    ? products.filter(p => !['Protein', 'Creatine'].includes(p.category))
    : products.filter(p => p.category === activeTab)).slice(0, 7);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by exactly two items on desktop (260px + 24px gap = 284px * 2 = 568px)
      // This prevents smooth scroll from conflicting with CSS scroll-snap
      const scrollAmount = direction === 'left' ? -568 : 568;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-24 px-6 md:px-12 border-b border-gray-200 dark:border-white/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background massive text overlay */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            ELITE ARSENAL • BEST SELLERS • TOP PERFORMERS • 
          </span>
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            ELITE ARSENAL • BEST SELLERS • TOP PERFORMERS • 
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-sky font-sans text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
              Top Performers
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Featured Products
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="flex flex-wrap gap-4 md:gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-sans text-[10px] uppercase tracking-[0.1em] font-bold transition-colors duration-300 relative ${
                    activeTab === tab ? 'text-brand-sky' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brand-sky"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Nav Buttons */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
              </button>
              <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                <ChevronRight className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Carousel (Full Width Mobile, Bleed Right Desktop) */}
        <div className="w-screen md:w-full relative left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 hide-scrollbar scroll-smooth px-[calc(50vw-110px)] md:px-0 md:pl-6 md:-mr-[50vw] md:pr-[50vw]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[220px] w-[220px] md:min-w-[260px] md:w-[260px] flex-shrink-0 snap-center md:snap-start group relative flex flex-col"
                  >
                  {/* Image Container */}
                  <Link to={`/product/${product.id}`} className="block h-[260px] bg-[#f5f5f5] dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center transition-colors duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Quick Add Button Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 hidden md:block">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full bg-black dark:bg-white text-white dark:text-black rounded-none font-sans text-[10px] uppercase font-bold py-3 flex items-center justify-center gap-2 hover:bg-brand-sky hover:text-white transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </Link>

                  {/* Info Container */}
                  <div className="pt-4 flex flex-col text-left">
                    {/* Stars & Price Row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <div className="flex text-orange-500 text-xs">
                          {'★'.repeat(Math.floor(Number(product.rating)))}
                          {Number(product.rating) % 1 !== 0 && '½'}
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">{product.rating} ({product.reviews})</span>
                      </div>
                      <span className="font-bold text-base text-black dark:text-white">${product.price}</span>
                    </div>
                    
                    {/* Product Name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-sans font-bold text-sm md:text-base text-black dark:text-white group-hover:text-brand-sky transition-colors mb-1 truncate">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Details */}
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {product.details}
                    </p>
                  </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scroll Progress Bar */}
          <div className="w-full max-w-4xl mx-auto h-[2px] bg-gray-200 dark:bg-white/10 mt-4 relative overflow-hidden">
            <div 
              className="absolute top-0 h-full w-[20%] bg-black dark:bg-brand-sky transition-all duration-150 ease-out"
              style={{ left: `${scrollProgress * 0.8}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
