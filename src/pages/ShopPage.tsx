import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Supplements', 'Protein', 'Creatine'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111]">
      
      {/* Shop Hero */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden mb-12 border-b border-gray-300 dark:border-white/10">
        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl uppercase italic font-black tracking-tighter mb-4"
          >
            The <span className="text-brand-sky">Shop</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Elevate your performance with our premium selection of supplements, proteins, and pre-workouts. Formulated for serious results.
          </motion.p>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 pb-24 mx-auto max-w-[2400px]">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
          
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
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="relative px-5 py-3 lg:w-full text-left rounded-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors overflow-hidden group"
                >
                  {selectedCategory === category && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-brand-sky"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {selectedCategory !== category && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'text-black'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                  }`}>
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 font-sans uppercase tracking-widest text-sm">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col"
                >
                  {/* Image Container */}
                  <Link to={`/product/${product.id}`} className="block aspect-square bg-[#f5f5f5] dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center transition-colors duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Quick Add Button Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 hidden lg:block">
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
                        <span className="text-[9px] md:text-[10px] text-gray-500 font-medium">{product.rating} ({product.reviews})</span>
                      </div>
                      <span className="font-bold text-sm md:text-base text-black dark:text-white">${product.price}</span>
                    </div>
                    
                    {/* Product Name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-sans font-bold text-xs md:text-sm text-black dark:text-white group-hover:text-brand-sky transition-colors mb-1 truncate">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Details */}
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-xs mt-1 truncate">
                      {product.details}
                    </p>

                    {/* Mobile Quick Add */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="lg:hidden mt-4 w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[9px] py-2.5 hover:bg-brand-sky hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
