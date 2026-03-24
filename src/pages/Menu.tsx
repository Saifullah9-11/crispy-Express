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
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO 
        title="Our Menu" 
        description="Explore our full menu of crispy fried chicken, burgers, and family combos."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">Our Menu</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">From our signature secret-spiced chicken to our mouth-watering burgers, we have something for everyone.</p>
        </div>

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
