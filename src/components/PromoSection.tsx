import React from 'react';

export default function PromoSection() {
  return (
    <section className="py-12 bg-brand-deep border-t border-b border-brand-royal relative overflow-hidden">
      {/* Background radial gradient to give it depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 to-brand-deep z-0"></div>
      
      {/* Background visual lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center w-full z-0">
        <div className="h-full w-px bg-white mx-4 sm:mx-8 lg:mx-12" />
        <div className="h-full w-px bg-white mx-4 sm:mx-8 lg:mx-12" />
        <div className="h-full w-px bg-white mx-4 sm:mx-8 lg:mx-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Left Column: Delivery Apps */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest leading-[1.3] drop-shadow-md">
              Now Using These<br />Delivery Apps In<br />Certain Locations:
            </h2>
            
            <div className="w-full flex flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16">
              <img 
                src="/Grubhub-Logo-2016-500x281-1.png" 
                alt="Grubhub" 
                className="w-32 sm:w-40 md:w-56 h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-xl" 
              />
              <img 
                src="/doordash-logo-0.png" 
                alt="Doordash" 
                className="w-32 sm:w-40 md:w-56 h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-xl" 
              />
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <div className="relative pt-[56.25%] bg-black rounded-sm overflow-hidden shadow-xl border border-white/10">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/V3TBlMAR9Jg?si=ubL8tQyXnyPBV8nQ" 
                title="Planet Nutrition Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
