import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { Flame, Sparkles } from 'lucide-react';

export const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setDeals(data.filter((item: any) => item.featured)));
  }, []);

  return (
    <div className="pt-20 pb-20 bg-white">
      <SEO 
        title="Hot Deals & Combos" 
        description="Save big with our exclusive Crispy Express deals. Family combos, snack buckets, and more at unbeatable prices."
      />

      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1920&q=80" 
            alt="Deals Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/80"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={16} className="text-accent" />
              <span className="text-primary text-xs font-black uppercase tracking-widest">Limited Time Offers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 italic uppercase tracking-tighter">
              HOT <span className="text-primary">DEALS</span> <br />
              BIG <span className="text-accent">SAVINGS</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The best value for your cravings. Grab our signature combos and buckets at special prices for a limited time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {deals.map((item: any) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          {deals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No deals available at the moment. Check back later!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
