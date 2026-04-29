import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111]">
      
      {/* About Hero */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden mb-12 border-b border-gray-300 dark:border-white/10">
        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl uppercase italic font-black tracking-tighter mb-4"
          >
            Our <span className="text-brand-sky">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Building healthier communities, one high-quality product at a time. Discover what drives Planet Nutrition.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-24 space-y-16">
        
        <section>
          <h2 className="text-brand-sky font-sans font-bold tracking-[0.2em] uppercase text-xs mb-4">The Mission</h2>
          <h3 className="text-black dark:text-white font-display text-3xl uppercase italic font-black tracking-tighter mb-6">More Than Just Supplements</h3>
          <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            At Planet Nutrition, we believe that proper nutrition is the foundation of a great life. Our mission goes beyond selling supplements or meal replacements; we are here to educate, empower, and inspire our communities to take charge of their health. We carefully vet every product that hits our shelves, ensuring you only put the best, clinically-tested ingredients into your body.
          </p>
        </section>

        <section className="bg-white dark:bg-black p-8 md:p-12 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl">
          <h3 className="text-black dark:text-white font-display text-2xl uppercase italic font-black tracking-tighter mb-6">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-brand-sky shrink-0" />
              <div>
                <h4 className="font-bold text-black dark:text-white mb-2 uppercase tracking-wide text-sm">Transparency</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No proprietary blends. You always know exactly what you are putting into your body.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-brand-sky shrink-0" />
              <div>
                <h4 className="font-bold text-black dark:text-white mb-2 uppercase tracking-wide text-sm">Community</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">We are a local business driven by the success stories of the people in our communities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-brand-sky shrink-0" />
              <div>
                <h4 className="font-bold text-black dark:text-white mb-2 uppercase tracking-wide text-sm">Quality First</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Every product we carry is rigorously tested for purity, potency, and efficacy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-brand-sky shrink-0" />
              <div>
                <h4 className="font-bold text-black dark:text-white mb-2 uppercase tracking-wide text-sm">Expert Advice</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Our staff isn't just salespeople; they are educated wellness enthusiasts ready to help you.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Full-width Image Gallery */}
      <ImageGallery />
    </div>
  );
}
