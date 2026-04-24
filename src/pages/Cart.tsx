import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-12 text-center">
            <p className="text-gray-500 mb-6 uppercase tracking-widest font-bold">Your cart is currently empty.</p>
            <Link to="/" className="inline-block bg-brand-deep text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-blue-700 transition-colors">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-black flex items-center justify-center p-2 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-black italic uppercase tracking-tighter text-xl mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2">{item.category}</p>
                    <p className="font-mono font-bold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-300 dark:border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:text-brand-sky transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:text-brand-sky transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-8 sticky top-[120px]">
                <h3 className="font-display font-black italic uppercase tracking-tighter text-2xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between font-bold text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-black dark:text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-600 dark:text-gray-400 pb-4 border-b border-gray-200 dark:border-white/10">
                    <span>Shipping</span>
                    <span className="font-mono text-brand-sky">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-black italic uppercase tracking-tighter text-2xl pt-2">
                    <span>Total</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="w-full bg-brand-deep hover:bg-blue-700 text-white font-bold uppercase tracking-widest py-4 flex items-center justify-center gap-2 transition-colors">
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
