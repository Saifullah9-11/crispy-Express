import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Deals } from './pages/Deals';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/locations" element={<div className="pt-24 text-center">Locations Page Placeholder</div>} />
              <Route path="/about" element={<div className="pt-24 text-center">About Page Placeholder</div>} />
              <Route path="/contact" element={<div className="pt-24 text-center">Contact Page Placeholder</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </HelmetProvider>
  );
}
