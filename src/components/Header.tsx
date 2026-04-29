import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useLoad } from '../context/LoadContext';
import { products } from '../data/products';

const announcements = [
  "#LOVEYOURPLANET",
  "NEW FUEL: WHEY ISOLATE 2.0 ARRIVED",
  "ELITE NUTRITION & SUPPLEMENTS"
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Franchising', href: 'https://planetnutritionfranchise.com/' },
  { name: 'Drink Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '#' },
  { name: 'Store Locator', href: '/locations' },
  { name: 'Employment', href: '/employment' },
  { name: 'Contact', href: '/contact' }
];

export default function Header() {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { itemCount } = useCart();
  const { isLoaded } = useLoad();

  // Compute search results dynamically
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to top 5 results

  const SearchDropdown = () => {
    if (!isSearchFocused || searchQuery.trim() === '') return null;

    return (
      <div className="absolute top-full right-0 lg:left-0 lg:right-auto w-[280px] lg:w-full mt-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-2xl rounded-sm overflow-hidden z-50">
        {searchResults.length > 0 ? (
          <ul className="max-h-[60vh] overflow-y-auto hide-scrollbar">
            {searchResults.map((product) => (
              <li key={product.id}>
                <Link 
                  to={`/product/${product.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0"
                  onMouseDown={(e) => e.preventDefault()} // Keeps input focused to avoid early unmount
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-contain bg-white rounded-sm shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-black dark:text-white truncate">{product.name}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{product.category}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-sky">${product.price.toFixed(2)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-xs text-gray-500 uppercase tracking-widest font-bold">
            No products found
          </div>
        )}
      </div>
    );
  };

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
          
          {/* Left: Contact & Hashtag (Desktop only) */}
          <div className="hidden md:flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase text-black z-10">
            <span>#LoveYourPlanet</span>
            <span className="opacity-50">|</span>
            <a href="tel:3374062348" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>(337) 406-2348</span>
            </a>
          </div>

          {/* Center/Left: Announcements */}
          <div className="flex-1 md:flex-none md:absolute md:left-1/2 md:-translate-x-1/2 flex justify-start md:justify-center overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.p
                key={announcementIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-black text-[8px] sm:text-[9px] md:text-xs font-sans font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase whitespace-nowrap pointer-events-auto truncate pr-2 md:px-2 text-left md:text-center"
              >
                {announcements[announcementIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Right: Socials */}
          <div className="flex items-center justify-end gap-3 md:gap-4 z-10 shrink-0 ml-4">
            <a href="https://www.instagram.com/planet_nutrition_inc/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </a>
            <a href="https://www.facebook.com/planetnutritioncorp" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </a>
            <a href="https://x.com/planetnutrition?lang=en" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="relative bg-white dark:bg-black h-20 w-full border-b border-gray-300 px-3 md:px-8 flex items-center justify-between transition-colors duration-300">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group z-10 -ml-2 md:ml-0">
            <div className="relative h-20 w-20 md:h-24 md:w-24 -my-4 flex items-center justify-center shrink-0">
              <motion.img 
                src="/logo/Pnlogobottomlayer.png"
                alt="Logo Base"
                className="absolute inset-0 w-full h-full object-contain"
                animate={{ rotate: [-8, 8] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <img 
                src="/logo/Pnlogotoplayer.png" 
                alt="Planet Nutrition Logo" 
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
            </div>
            <h1 className="text-black dark:text-white font-display text-2xl tracking-tighter uppercase italic font-black group-hover:text-brand-sky transition-colors duration-300 hidden md:block">
              Planet Nutrition
            </h1>
          </Link>

          {/* Desktop Nav - Limit to 5 so it doesn't crowd */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm uppercase tracking-widest font-display font-black text-gray-600 dark:text-gray-300 whitespace-nowrap">
            {navLinks.slice(0, 5).map((link, index) => {
              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal 
                ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: link.href };

              return (
                <React.Fragment key={link.name}>
                  <LinkComponent 
                    {...(linkProps as any)}
                    className={`group relative py-2 hover:text-black dark:hover:text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                    style={{ transitionDelay: `${isLoaded ? index * 100 + 300 : 0}ms` }}
                  >
                    <span className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">
                      {link.name}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-sky transition-all duration-300 group-hover:w-full"></span>
                  </LinkComponent>
                  {index < 4 && (
                    <div className="w-[1px] h-3 bg-gray-300 dark:bg-gray-600 opacity-70" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center border border-gray-300 dark:border-white/20 h-9 px-3 bg-gray-50 dark:bg-[#111] relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-64 xl:w-72 text-[16px] lg:text-xs bg-transparent outline-none text-black dark:text-white placeholder-gray-400 font-sans transition-all"
              />
              <button className="text-gray-400 hover:text-brand-sky transition-colors">
                <Search className="w-4 h-4" strokeWidth={2} />
              </button>
              <SearchDropdown />
            </div>
            
            {/* Mobile Search Bar */}
            <div className="flex lg:hidden items-center border border-gray-300 dark:border-white/20 h-8 px-2 bg-gray-50 dark:bg-[#111] w-48 sm:w-64 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full text-[16px] bg-transparent outline-none text-black dark:text-white placeholder-gray-400 font-sans"
              />
              <button className="text-gray-400 hover:text-brand-sky transition-colors ml-1">
                <Search className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
              <SearchDropdown />
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
                <div className="relative h-20 w-20 -my-4 flex items-center justify-center shrink-0">
                  <motion.img 
                    src="/logo/Pnlogobottomlayer.png"
                    alt="Logo Base"
                    className="absolute inset-0 w-full h-full object-contain"
                    animate={{ rotate: [-8, 8] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                  <img 
                    src="/logo/Pnlogotoplayer.png" 
                    alt="Planet Nutrition Logo" 
                    className="absolute inset-0 w-full h-full object-contain z-10"
                  />
                </div>
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
                        className="text-black text-2xl md:text-3xl uppercase tracking-tighter font-black hover:text-brand-sky transition-colors flex items-center justify-between group"
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
