import React from 'react';
import { ArrowRight, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black pt-24 pb-12 px-6 md:px-12 border-t border-gray-200 dark:border-white/20 relative overflow-hidden transition-colors duration-300">
      {/* Background massive text overlay */}
      <div className="absolute -bottom-8 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[140px] md:text-[200px] font-black text-black/[0.03] dark:text-white/[0.03] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            PLANET NUTRITION • PLANET NUTRITION • PLANET NUTRITION • 
          </span>
          <span className="text-[140px] md:text-[200px] font-black text-black/[0.03] dark:text-white/[0.03] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            PLANET NUTRITION • PLANET NUTRITION • PLANET NUTRITION • 
          </span>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Newsletter */}
          <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-8 group cursor-pointer w-fit">
                <img 
                  src="/PNlogo.png" 
                  alt="Planet Nutrition Logo" 
                  className="h-10 w-auto object-contain"
                />
                <h2 className="text-black dark:text-white font-display text-2xl tracking-tighter uppercase font-black italic group-hover:text-brand-sky transition-colors mt-1">
                  Planet Nutrition
                </h2>
              </div>
             
             <p className="text-black dark:text-white font-sans text-[11px] tracking-[0.2em] font-bold uppercase mb-4">
               Elite Supplements & Nutrition
             </p>
             <p className="text-gray-500 dark:text-gray-400 font-sans text-[11px] font-bold uppercase tracking-widest mb-8 max-w-sm leading-relaxed">
               Your trusted source for premium supplements, healthy smoothies, and expert advice to help you crush your fitness goals.
             </p>
             
             <a href="/locations" className="inline-block border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors">
               Find A Store
             </a>
          </div>

          {/* Links Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-12">
            
            <div className="flex flex-col gap-6">
              <h4 className="text-black dark:text-white font-sans text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-2 mb-2">Shop</h4>
              {['Proteins', 'Pre-Workouts', 'Vitamins & Health', 'Apparel', 'Gift Cards'].map(link => (
                <a key={link} href="#" className="text-gray-600 hover:text-brand-sky dark:text-gray-400 dark:hover:text-brand-sky font-sans text-[9px] font-bold tracking-[0.1em] transition-colors w-fit uppercase">
                  {link}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-black dark:text-white font-sans text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-2 mb-2">Company</h4>
              {['Our Story', 'Locations', 'Franchise', 'Careers', 'Blog'].map(link => (
                <a key={link} href="#" className="text-gray-600 hover:text-brand-sky dark:text-gray-400 dark:hover:text-brand-sky font-sans text-[9px] font-bold tracking-[0.1em] transition-colors w-fit uppercase">
                  {link}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6 col-span-2 lg:col-span-1">
              <h4 className="text-black dark:text-white font-sans text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-2 mb-2">Support</h4>
              {['FAQ', 'Shipping & Returns', 'Contact Us', 'Track Order'].map(link => (
                <a key={link} href="#" className="text-gray-600 hover:text-brand-sky dark:text-gray-400 dark:hover:text-brand-sky font-sans text-[9px] font-bold tracking-[0.1em] transition-colors w-fit uppercase">
                  {link}
                </a>
              ))}
              
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-sky transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-sky transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-sky transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-white/10 text-gray-500 font-sans text-[9px] uppercase font-bold tracking-widest gap-4">
          <p>© {new Date().getFullYear()} Planet Nutrition. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-brand-sky transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-brand-sky transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
