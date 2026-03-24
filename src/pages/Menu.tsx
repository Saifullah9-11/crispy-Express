import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'framer-motion';

export const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const categories = ['All', 'Chicken', 'Burgers', 'Combos', 'Sides', 'Snacks', 'Drinks'];

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    } else {
      setActiveCategory('All');
    }
  }, [location.search]);

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter((item: any) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <SEO 
        title="Our Menu" 
        description="Explore our full menu of crispy fried chicken, burgers, and family combos."
      />

      {/* Hero Section */}
      <section className="relative py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="Menu Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/60"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 italic uppercase tracking-tighter">OUR <span className="text-primary">MENU</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">From our signature secret-spiced chicken to our mouth-watering burgers, we have something for everyone.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-red-200' 
                  : 'bg-white text-charcoal hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredMenu.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </motion.div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
