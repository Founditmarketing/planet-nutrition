import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function CommunityFranchise() {
  return (
    <section className="bg-white dark:bg-black py-24 md:py-32 px-6 md:px-12 border-b border-gray-200 dark:border-white/10 transition-colors duration-300 relative overflow-hidden">

      {/* Background massive text overlay */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            BE YOUR OWN BOSS • PROVEN SYSTEM • FRANCHISE WITH US •
          </span>
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            BE YOUR OWN BOSS • PROVEN SYSTEM • FRANCHISE WITH US •
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-10">

        {/* Text Side (Left) */}
        <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
          <span className="text-brand-sky font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">
            Become a Planet Nutrition Franchisee
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-black dark:text-white mb-8 leading-[0.9]">
            Do you want to be<br />your own Boss?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 font-sans text-[11px] sm:text-xs font-bold tracking-wide uppercase leading-relaxed mb-10 max-w-md">
            <p>Do you want to make money even when you are not physically working?</p>
            <p>Would you rather join a proven system than figure it out yourself?</p>
            <p>Do you believe that being part of something bigger than yourself is worthwhile?</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <button className="bg-brand-deep text-white font-sans text-[10px] uppercase font-bold tracking-[0.2em] py-5 px-10 flex items-center justify-center gap-4 hover:bg-brand-sky transition-colors group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Masonry/Collage Side (Right) */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative h-auto sm:h-[500px] md:h-[600px] items-center mt-12 lg:mt-0">
          {/* Collage Item 1: Tall left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[300px] sm:h-[80%] relative overflow-hidden group col-span-1"
          >
            <div className="absolute inset-0 bg-brand-sky mix-blend-multiply z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src="/PNpic2.jpg"
              alt="Planet Nutrition Products"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="col-span-1 flex flex-col sm:justify-center gap-4 h-auto sm:h-full">
            {/* Collage Item 2: Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full h-[250px] sm:h-[50%] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-brand-deep mix-blend-multiply z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src="/PNpic3.jpg"
                alt="Pre Workout Products"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Collage Item 3: Bottom Right (Branding) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full h-[150px] sm:h-[40%] bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 p-6 md:p-8 flex items-end justify-start relative group transition-colors duration-300"
            >
              {/* Corner accents, dark in white box */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[4px] border-r-[4px] border-brand-deep m-4 opacity-50 group-hover:opacity-100 transition-opacity" />

              <h3 className="font-display text-black dark:text-white text-2xl md:text-4xl uppercase font-black italic tracking-tighter leading-none">
                Not Just<br />A Store.
              </h3>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
