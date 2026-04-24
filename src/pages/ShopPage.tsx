import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        
        {/* Controls: Search */}
        <div className="flex flex-col mb-12">
          <div className="w-full flex-1 relative">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white dark:bg-[#111] border border-gray-300 dark:border-white/20 rounded-none py-4 pl-14 pr-6 text-sm md:text-base font-sans outline-none focus:ring-2 focus:ring-brand-sky transition-all shadow-none text-black dark:text-white"
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-sans uppercase tracking-widest text-sm">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                        className="w-full bg-brand-deep text-white rounded-none font-sans text-[10px] font-bold uppercase tracking-[0.2em] py-3 flex items-center justify-center gap-2 hover:bg-brand-sky hover:text-black transition-colors"
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
                        className="md:hidden w-full py-3 bg-brand-deep hover:bg-brand-sky hover:text-black transition-colors text-white font-bold uppercase tracking-widest text-[10px]"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
