import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuItems, menuCategories } from '../data/menu';
import { Leaf, Info, Search } from 'lucide-react';

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
            The <span className="text-brand-sky">Drink Menu</span>
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Controls: Search & Filter */}
        <div className="flex flex-col mb-12 gap-6">
          
          <div className="w-full flex-1 relative mb-6">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded-none py-4 pl-14 pr-6 text-sm md:text-base font-sans outline-none focus:ring-2 focus:ring-brand-sky transition-all shadow-none text-black dark:text-white"
              placeholder="Search flavors, ingredients, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full overflow-hidden">
            <div className="flex flex-wrap gap-1.5 md:gap-3 justify-center md:justify-start">
              <button
                onClick={() => setActiveCategory('All')}
                className={`whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider md:tracking-widest transition-all duration-300 border ${
                  activeCategory === 'All'
                    ? 'bg-brand-deep text-white border-brand-deep shadow-md' 
                    : 'bg-white dark:bg-black text-gray-500 border-gray-200 dark:border-white/10 hover:border-brand-sky'
                }`}
              >
                All
              </button>
              {menuCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider md:tracking-widest transition-all duration-300 border ${
                    activeCategory === category 
                      ? 'bg-brand-deep text-white border-brand-deep shadow-md' 
                      : 'bg-white dark:bg-black text-gray-500 border-gray-200 dark:border-white/10 hover:border-brand-sky'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

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
                      <h4 className="text-black dark:text-white font-display text-lg md:text-xl uppercase italic font-black group-hover:text-brand-sky transition-colors">
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
  );
}
