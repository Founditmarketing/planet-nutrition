import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id) || products[0]; // fallback for testing if id is missing
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="pt-[120px] text-center">Product not found</div>;

  const handleAdd = () => {
    // Add multiple items if quantity > 1
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Simple visual feedback could be added here
  };

  return (
    <div className="min-h-screen pt-[120px] pb-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/shop" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-sky mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image */}
          <div className="bg-gray-50 dark:bg-[#111] p-8 md:p-16 flex items-center justify-center border border-gray-200 dark:border-white/10 relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-brand-sky font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                {product.category}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-500 text-sm">
                {'★'.repeat(Math.floor(Number(product.rating)))}
              </div>
              <span className="text-sm text-gray-500 font-medium">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-mono font-bold mb-8">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {product.longDescription || product.desc}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 border-y border-gray-200 dark:border-white/10 py-8">
              <div className="flex items-center border border-gray-300 dark:border-white/20 w-full sm:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleAdd}
                className="flex-1 bg-brand-deep hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-sm py-4 px-8 flex items-center justify-center gap-3 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-5 h-5 text-brand-sky" />
                100% Secure Checkout
              </div>
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                <Truck className="w-5 h-5 text-brand-sky" />
                Fast Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
