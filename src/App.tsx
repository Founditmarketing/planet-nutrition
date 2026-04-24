import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FAB from './components/FAB';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import StoreLocator from './pages/StoreLocator';
import MenuPage from './pages/MenuPage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white font-sans selection:bg-brand-sky selection:text-black">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/locations" element={<StoreLocator />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        <Footer />
        <FAB />
      </div>
    </CartProvider>
  );
}
