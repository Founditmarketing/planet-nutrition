import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111]">
      
      {/* Hero Section */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden mb-12 border-b border-gray-300 dark:border-white/10">
        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl uppercase italic font-black tracking-tighter mb-4"
          >
            Contact <span className="text-brand-sky">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-bold tracking-widest uppercase"
          >
            Have a question or need assistance? Reach out to our team today.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/10 p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl uppercase italic font-black tracking-tighter text-black dark:text-white mb-6">
                Get In <span className="text-brand-sky">Touch</span>
              </h2>
              
              <div className="space-y-6 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-sky/10 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-brand-sky" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Corporate HQ</h3>
                    <p className="text-sm text-black dark:text-white leading-relaxed font-medium">
                      4660 Johnston St<br />
                      Lafayette, LA 70503
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-sky/10 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-brand-sky" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Phone</h3>
                    <p className="text-sm text-black dark:text-white font-medium">
                      337-406-2348
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-sky/10 flex items-center justify-center shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-brand-sky" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                    <p className="text-sm text-black dark:text-white font-medium">
                      info@planetnutrition.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
                <h3 className="font-display text-lg uppercase italic font-black tracking-tighter text-black dark:text-white mb-4">
                  Franchising
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Interested in opening your own Planet Nutrition location?
                </p>
                <a 
                  href="https://planetnutritionfranchise.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-8 md:p-10 shadow-xl"
            >
              {isSuccess && (
                <div className="mb-8 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Send className="w-4 h-4" /> Message Sent Successfully! We'll be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-colors font-sans"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-colors font-sans"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-colors font-sans"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-colors font-sans appearance-none"
                    >
                      <option value="" disabled>Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Online Order Support">Online Order Support</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-colors font-sans resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-brand-sky hover:bg-brand-sky/90 text-black px-10 py-4 font-display text-lg italic font-black uppercase tracking-tighter transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
