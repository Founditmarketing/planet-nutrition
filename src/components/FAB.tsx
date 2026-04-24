import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function FAB() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, cartTotal, itemCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-deep p-4 rounded-full border border-white/20 shadow-lg hover:border-brand-sky hover:scale-105 transition-all duration-300 group flex items-center justify-center"
      >
        <ShoppingCart className="w-6 h-6 text-white group-hover:text-brand-sky group-hover:scale-110 transition-all" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-sky text-black text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-brand-deep">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white dark:bg-[#111] h-full shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-brand-sky" />
                  <h2 className="font-display font-black italic uppercase text-2xl tracking-tight text-black dark:text-white">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                    <ShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="font-sans font-bold uppercase tracking-widest text-sm text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center p-2 shrink-0">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-black uppercase italic text-sm text-black dark:text-white truncate">{item.name}</h4>
                          <p className="text-brand-sky font-bold text-sm mb-2">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 dark:border-white/10 rounded">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-black dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-sans font-bold uppercase tracking-widest text-xs text-gray-500">Subtotal</span>
                    <span className="font-display font-black italic text-2xl text-black dark:text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/cart');
                    }}
                    className="w-full bg-brand-deep text-white font-sans font-bold uppercase tracking-widest text-xs py-4 flex items-center justify-center gap-2 hover:bg-brand-sky hover:text-black transition-colors"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
