import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuItems, menuCategories } from '../data/menu';
import { Leaf, Info, Search } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#111] overflow-hidden relative">
      
      {/* Background massive text overlay */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            FUEL YOUR LIFESTYLE • ENHANCE PERFORMANCE • NUTRITION REDEFINED • 
          </span>
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            FUEL YOUR LIFESTYLE • ENHANCE PERFORMANCE • NUTRITION REDEFINED • 
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-sky font-sans font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Discover Your Flavor
          </h2>
          <h3 className="text-black dark:text-white font-display text-4xl md:text-5xl lg:text-6xl uppercase italic font-black tracking-tighter mb-6">
            The Menu
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-sans text-sm md:text-base leading-relaxed">
            From high-quality protein meal replacements to our energy-boosting teas and fun menu creations, 
            explore the perfect fuel for your lifestyle.
          </p>
        </div>

        {/* Controls: Search & Filter */}
        <div className="flex flex-col items-center gap-6 mb-10">
          
          <div className="w-full flex-1 relative">
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

          {/* Category Tabs (Wrapped) */}
          <div className="w-full overflow-hidden px-1">
            <div className="flex flex-wrap gap-1.5 md:gap-3 justify-center">
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

        {/* Category Context Info */}
        {!searchQuery && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`context-${activeCategory}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-10 text-center flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4 text-brand-sky" />
              <p className="text-gray-500 dark:text-gray-400 font-sans text-xs uppercase tracking-widest font-semibold">
                {activeCategory === "Trü Meal Replacement" && "Fortified with high quality Protein, Carbs, Vitamins and Minerals"}
                {activeCategory === "Planet Skinny" && "Size 24 oz. | Protein: 22 gm, Carbs: 5 gm, Sugar: 2 gm, Fat: 2 gm"}
                {activeCategory === "Planet Teas" && "Energy / Weightloss • 24oz ONLY"}
                {activeCategory === "Fruities & Veggies" && "24 ounce ONLY"}
                {activeCategory === "\"Fun Menu\" Flavors" && "+$1.00 Any Size (Unless Marked Specialty)"}
                {activeCategory === "Enhancers" && "Boost your smoothie for just 99¢ each"}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Menu Grid / List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
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
    </section>
  );
}
