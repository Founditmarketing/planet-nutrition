import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

const reviews = [
  {
    quote: "Loved the Sugar Free Butterscotch Smoothie",
    author: "Cathie Jones Lemalle",
    credential: "March 22, 2022 via Google"
  },
  {
    quote: "Very nice and helpful customer service. Delicious drinks.",
    author: "Carlos",
    credential: "March 3, 2022 via Google"
  },
  {
    quote: "My FAVE protein shakes EVER !!! So many options, and the staff are always super friendly and very knowledgeable at the Lake Charles, La location. They are located at 3814 Ryan St #300💗💗💗",
    author: "Angie Spiers",
    credential: "February 23, 2022 via Google"
  },
  {
    quote: "Always right on time. great service",
    author: "Tim Fortenberry",
    credential: "June 6, 2021 via Google"
  },
  {
    quote: "They are the best! I am a creature of habit with my smoothie, so as soon as they see my truck , they already have it ready as soon as I hit the window!",
    author: "Shawna Robicheaux",
    credential: "September 24, 2021 via Google"
  },
  {
    quote: "Omg The best Blueberry Cheesecake shake,it was absolutely delicious.The staff is very friendly, helpful, and knowledgeable.My son and I went there for the first time last week and now we can't stop...",
    author: "Tabatha Courville",
    credential: "August 4, 2021 via Google"
  },
  {
    quote: "Best smoothies in town. The staff is always friendly and very knowledgeable.",
    author: "Laurie Clarke",
    credential: "July 28, 2021 via Google"
  },
  {
    quote: "Great service and friendly staff. Wonderful smoothies",
    author: "Natalie Lowery",
    credential: "May 27, 2021 via Google"
  },
  {
    quote: "Always friendly and knowledgable staff. The owner is very personable and always there. superior products just an all around great place for all your nutrition needs.",
    author: "Ian Dupuis",
    credential: "February 25, 2021 via Google"
  }
];

const extendedReviews = Array(10).fill(reviews).flat();

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize scroll position to the middle of the massive cloned array
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: (scrollWidth - clientWidth) / 2, behavior: 'instant' } as any);
    }
  }, []);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-scroll on desktop (md breakpoint and up)
      if (scrollRef.current && window.innerWidth >= 768) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If nearing the edges, instantly jump back to center to maintain illusion
        if (scrollLeft + clientWidth >= scrollWidth - 2000 || scrollLeft <= 2000) {
          scrollRef.current.scrollTo({ left: (scrollWidth - clientWidth) / 2, behavior: 'instant' } as any);
        } else {
          // Scroll exactly one card width + gap (24px)
          const step = window.innerWidth < 768 ? (window.innerWidth * 0.85) + 24 : 374;
          scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const step = window.innerWidth < 768 ? (window.innerWidth * 0.85) + 24 : 374;
      const scrollAmount = direction === 'left' ? -step : step;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-black transition-colors duration-300 overflow-hidden border-t border-b border-white/10 relative">
      
      {/* Background massive text overlay */}
      <div className="absolute top-4 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[100px] md:text-[160px] font-black text-white/[0.08] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            VERIFIED RESULTS • VERIFIED RESULTS • VERIFIED RESULTS • 
          </span>
          <span className="text-[100px] md:text-[160px] font-black text-white/[0.08] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            VERIFIED RESULTS • VERIFIED RESULTS • VERIFIED RESULTS • 
          </span>
        </motion.div>
      </div>

      {/* Header & Nav */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6 relative z-10">
        <div>
          <span className="text-brand-sky font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
            Testimonials
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
            Verified Results.
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full Width Carousel */}
      <div 
        ref={scrollRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-[calc(50vw_-_42.5vw)] md:px-[calc(50vw_-_175px)] gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {extendedReviews.map((review, i) => (
          <div 
            key={i} 
            className="w-[85vw] md:w-[350px] shrink-0 snap-center p-6 md:p-8 border border-white/10 flex flex-col justify-between bg-[#0a0a0a] hover:border-brand-sky hover:bg-[#111] transition-colors group shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex text-brand-sky mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-sans text-xs font-bold tracking-wide leading-relaxed text-gray-200 uppercase mb-8">
                "{review.quote}"
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <h4 className="font-sans font-black italic tracking-tight text-white uppercase text-sm">
                  {review.author}
                </h4>
                <p className="font-sans text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  {review.credential}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
