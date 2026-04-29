import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useLoad } from '../context/LoadContext';

const announcements = [
  "FREE SHIPPING ON ORDERS OVER $75",
  "NEW FUEL: WHEY ISOLATE 2.0 ARRIVED",
  "GET 15% OFF YOUR FIRST ORDER"
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Franchising', href: 'https://planetnutritionfranchise.com/' },
  { name: 'Drink Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '#' },
  { name: 'Store Locator', href: '/locations' },
  { name: 'Employment', href: '#' },
  { name: 'Contact', href: '#' }
];

export default function Header() {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isLoaded } = useLoad();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full sticky top-0 z-40 flex flex-col">
        {/* Top Info & Announcement Bar */}
        <div className="relative bg-brand-sky h-8 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-gray-200 dark:border-black/10">
          
          {/* Left: Contact & Hashtag (Hidden on small screens to save space) */}
          <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-black hidden md:flex z-10">
            <span>#LoveYourPlanet</span>
            <span className="opacity-50">|</span>
            <a href="tel:3374062348" className="hover:text-white transition-colors">(337) 406-2348</a>
          </div>

          {/* Center: Announcements */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center overflow-hidden w-full pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.p
                key={announcementIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-black text-[10px] md:text-xs font-sans font-bold tracking-[0.15em] uppercase whitespace-nowrap pointer-events-auto"
              >
                {announcements[announcementIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Right: Socials (Hidden on small screens to save space) */}
          <div className="flex items-center gap-4 hidden md:flex z-10">
            <a href="https://www.instagram.com/planet_nutrition_inc/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.facebook.com/planetnutritioncorp" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://x.com/planetnutrition?lang=en" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="relative bg-white dark:bg-black h-20 w-full border-b border-gray-300 px-6 md:px-8 flex items-center justify-between transition-colors duration-300">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group z-10">
            <img 
              src="/PNlogo.png" 
              alt="Planet Nutrition Logo" 
              className="h-16 w-auto object-contain"
            />
            <h1 className="text-black dark:text-white font-display text-2xl tracking-tighter uppercase italic font-black group-hover:text-brand-sky transition-colors duration-300 hidden md:block">
              Planet Nutrition
            </h1>
          </Link>

          {/* Desktop Nav - Limit to 5 so it doesn't crowd */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm uppercase tracking-widest font-display font-black italic text-gray-600 dark:text-gray-300 whitespace-nowrap">
            {navLinks.slice(0, 5).map((link, index) => {
              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal 
                ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: link.href };

              return (
                <LinkComponent 
                  key={link.name} 
                  {...(linkProps as any)}
                  className={`group relative py-2 hover:text-black dark:hover:text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                  style={{ transitionDelay: `${isLoaded ? index * 100 + 300 : 0}ms` }}
                >
                  <span className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-sky transition-all duration-300 group-hover:w-full"></span>
                </LinkComponent>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center border border-gray-300 dark:border-white/20 h-9 px-3 bg-gray-50 dark:bg-[#111]">
              <input
                type="text"
                placeholder="Search products..."
                className="w-40 text-xs bg-transparent outline-none text-black dark:text-white placeholder-gray-400 font-sans"
              />
              <button className="text-gray-400 hover:text-brand-sky transition-colors">
                <Search className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="flex lg:hidden items-center border border-gray-300 dark:border-white/20 h-8 px-2 bg-gray-50 dark:bg-[#111] w-36 sm:w-48">
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-[10px] bg-transparent outline-none text-black dark:text-white placeholder-gray-400 font-sans"
              />
              <button className="text-gray-400 hover:text-brand-sky transition-colors ml-1">
                <Search className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
            
            <Link to="/account" className="text-gray-500 dark:text-white hover:text-brand-sky dark:hover:text-brand-sky transition-colors duration-200 hidden sm:block">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            


            {/* Always visible hamburger menu */}
            <button 
              className="text-black hover:text-brand-sky transition-colors duration-200 ml-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-7 h-7" strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide Out Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img 
                  src="/PNlogo.png" 
                  alt="Planet Nutrition Logo" 
                  className="h-12 w-auto object-contain"
                />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    const LinkComponent = isExternal ? 'a' : Link;
                    const linkProps = isExternal 
                      ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                      : { to: link.href };

                    return (
                      <LinkComponent 
                        key={link.name} 
                        {...(linkProps as any)}
                        className="text-black text-2xl md:text-3xl uppercase tracking-tighter font-black italic hover:text-brand-sky transition-colors flex items-center justify-between group"
                        onClick={() => !isExternal && setIsMenuOpen(false)}
                      >
                        {link.name}
                        <span className="text-brand-sky opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                          &rarr;
                        </span>
                      </LinkComponent>
                    );
                  })}
                </nav>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex gap-4 mb-6">
                  <a href="https://www.instagram.com/planet_nutrition_inc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-brand-sky transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/planetnutritioncorp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-brand-sky transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/planetnutrition?lang=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-brand-sky transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">
                  &copy; {new Date().getFullYear()} Planet Nutrition
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
