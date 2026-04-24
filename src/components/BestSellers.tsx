import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const tabs = ["All", "Proteins", "Pre-Workouts", "Creatine"];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState("All");
  const { addToCart } = useCart();

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

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

          <div className="flex flex-wrap gap-4 md:gap-8 border-b border-gray-200 dark:border-white/10 pb-4">
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#0f0f0f] relative group flex flex-col h-[520px] border border-gray-200 dark:border-white/10 rounded-none overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-sky/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="block h-[260px] bg-white relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-300 cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 hidden md:block">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-brand-deep text-white rounded-none font-sans text-[10px] font-bold uppercase tracking-[0.2em] py-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                      Quick Add
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </Link>

                {/* Info Container */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white dark:bg-[#0f0f0f] transition-colors duration-300 z-20 border-t border-gray-100 dark:border-white/5 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex text-yellow-500 text-[10px]">
                        {'★'.repeat(Math.floor(Number(product.rating)))}
                      </div>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">({product.reviews})</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-sans font-black italic text-xl tracking-tighter uppercase mb-1 hover:text-brand-sky transition-colors text-black dark:text-white">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 font-sans text-[10px] font-bold tracking-widest uppercase mb-2">
                      {product.desc}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-wide">
                      {product.details}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center mt-4">
                    <span className="font-mono text-xl font-bold text-black dark:text-white mb-3">${product.price}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/10 text-black dark:text-white rounded-none"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
