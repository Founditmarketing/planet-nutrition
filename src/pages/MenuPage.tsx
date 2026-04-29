import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuItems, menuCategories } from '../data/menu';
import { Leaf, Info, Search, CupSoda, Zap } from 'lucide-react';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111]">
      
      {/* Menu Hero */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden mb-12 border-b border-gray-300 dark:border-white/10">
        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl uppercase italic font-black tracking-tighter mb-4"
          >
            The <span className="text-brand-sky">Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Explore our extensive lineup of premium meal replacements, functional teas, and custom enhancers. Everything on this menu is crafted fresh and available exclusively in-store at our physical locations.
          </motion.p>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 pb-24 mx-auto max-w-[2400px]">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start mt-8">
          
          {/* Sidebar (Sticky on Desktop) */}
          <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 flex flex-col gap-6 lg:gap-8">
            
            {/* Controls: Search */}
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-white dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded-none py-4 pl-12 pr-4 text-sm font-sans outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-all shadow-none text-black dark:text-white"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-1">
              {['All', ...menuCategories].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-5 py-3 lg:w-full text-left rounded-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors overflow-hidden group"
                >
                  {activeCategory === category && (
                    <motion.div 
                      layoutId="activeMenuPageCategory"
                      className="absolute inset-0 bg-brand-sky"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {activeCategory !== category && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    activeCategory === category
                      ? 'text-black'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                  }`}>
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid Area */}
          <div className="flex-1 w-full min-w-0">

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-sans uppercase tracking-widest text-sm">No items found matching your search.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col border-b border-gray-200 dark:border-white/10 pb-4 group"
                >
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="text-black dark:text-white font-display text-lg md:text-xl uppercase italic font-black group-hover:text-brand-sky transition-colors flex items-center gap-2">
                        {item.category === 'Enhancers' ? (
                          <Zap className="w-5 h-5 text-gray-300 dark:text-gray-700 opacity-60" strokeWidth={1.5} />
                        ) : (
                          <CupSoda className="w-5 h-5 text-gray-300 dark:text-gray-700 opacity-60" strokeWidth={1.5} />
                        )}
                        {item.name}
                      </h4>
                      {item.price && (
                        <span className="text-brand-sky font-bold text-sm bg-brand-sky/10 px-2 py-0.5 rounded ml-4 shrink-0">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Only show category badge if we are viewing 'All' */}
                    {activeCategory === 'All' && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-brand-deep bg-brand-sky/20 px-2 py-0.5 rounded mb-3">
                        {item.category}
                      </span>
                    )}
                    {item.description && (
                      <p className="text-gray-500 dark:text-gray-400 font-sans text-xs md:text-sm mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-brand-sky text-[10px] font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

          </div>
        </div>
      </div>
    </div>
  );
}
