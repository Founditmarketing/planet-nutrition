import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadContextType {
  isLoaded: boolean;
}

const LoadContext = createContext<LoadContextType>({ isLoaded: false });

export const useLoad = () => useContext(LoadContext);

export const LoadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadContext.Provider value={{ isLoaded }}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
          >
            <img 
              src="/PlanetNutritionloadscreen.gif" 
              alt="Loading Planet Nutrition..." 
              className="w-full max-w-md h-auto pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LoadContext.Provider>
  );
};
