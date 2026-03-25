import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import menu from '../data/menu.json';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Fried Chicken', 'Burgers', 'Deals', 'Fries', 'Snacks', 'Drinks'];

  const filteredItems = activeCategory === 'All' 
    ? menu 
    : menu.filter((item: any) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Menu | Hot. Crispy. Delivered Fast." 
        description="Explore our full menu of crispy fried chicken, burgers, and family combos."
      />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="Menu Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 italic uppercase tracking-tighter">OUR <span className="text-primary">MENU</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">Freshly made chicken, juicy burgers, and irresistible combos at your doorstep.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-8 mb-16 gap-4 no-scrollbar justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap border-2 ${
                activeCategory === cat 
                ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-black uppercase tracking-widest">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
