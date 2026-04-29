import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="bg-brand-deep py-32 px-6 relative overflow-hidden border-y border-white/10 flex justify-center items-center">
      {/* Background radial gradient to give it depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 to-brand-deep z-0"></div>
      
      {/* Background visual lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center w-full z-0">
        <div className="h-full w-px bg-white mx-8" />
        <div className="h-full w-px bg-white mx-8 hidden md:block" />
        <div className="h-full w-px bg-white mx-8 hidden lg:block" />
      </div>

      <div className="max-w-4xl text-center relative z-10 flex flex-col items-center">

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white mb-12">
          Ready To Upgrade<br />Your Fuel?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center mx-auto">
          <Link to="/shop" className="flex-1 text-center bg-white text-black font-sans text-[10px] uppercase font-bold tracking-[0.2em] py-5 px-8 hover:bg-gray-200 transition-colors">
            Shop Online
          </Link>
          
          <Link to="/locations" className="flex-1 text-center bg-transparent border-2 border-white text-white font-sans text-[10px] uppercase font-bold tracking-[0.2em] py-5 px-8 hover:bg-white hover:text-black transition-colors">
            Find A Store
          </Link>
        </div>
      </div>
    </section>
  );
}
