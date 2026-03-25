import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import menu from '../data/menu.json';
import { ArrowRight, Flame, Percent, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Deals: React.FC = () => {
  const dealItems = menu.filter(item => item.category === 'Deals');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <SEO 
        title="Hot Deals & Combos | Crispy Express" 
        description="Save big with our exclusive Crispy Express deals. Family combos, snack buckets, and more at unbeatable prices."
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1920&q=80" 
            alt="Deals Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 bg-primary text-white rounded-full px-6 py-2 mb-8 shadow-2xl animate-pulse">
              <Percent size={18} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Limited Time Exclusive Offers</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black italic mb-8 uppercase tracking-tighter text-white leading-none">HOT <span className="text-primary">DEALS</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">The biggest savings for the biggest appetites. Grab our signature combos and save up to 30% today.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          {/* Featured Deal Banner 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-12 relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black italic text-white mb-6 uppercase leading-none tracking-tighter">FAMILY<br/>FEAST <span className="text-accent">COMBO</span></h2>
              <p className="text-white/90 font-medium mb-10 max-w-xs text-lg">8 Pcs Chicken, 2 Large Fries, 4 Drinks and a whole lot of love.</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <span className="text-white text-5xl font-black italic">Rs. 1499</span>
                <Link to="/menu" className="bg-white text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">Order Now</Link>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80" 
              alt="Family Feast" 
              className="absolute -right-20 -bottom-10 w-96 h-96 object-cover rounded-full border-[12px] border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700 hidden md:block shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Featured Deal Banner 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal rounded-3xl p-12 relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black italic text-white mb-6 uppercase leading-none tracking-tighter">SNACK<br/>ATTACK <span className="text-primary">DEAL</span></h2>
              <p className="text-gray-400 font-medium mb-10 max-w-xs text-lg">Chicken Popcorn, Medium Fries and a chilled drink.</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <span className="text-primary text-5xl font-black italic">Rs. 699</span>
                <Link to="/menu" className="bg-primary text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">Order Now</Link>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80" 
              alt="Snack Attack" 
              className="absolute -right-20 -bottom-10 w-96 h-96 object-cover rounded-full border-[12px] border-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700 hidden md:block shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4">ALL <span className="text-primary">COMBOS</span></h2>
          <div className="w-24 h-2 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-24">
          {dealItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>

        {/* Gift Section */}
        <section className="bg-gray-50 rounded-[3rem] p-12 md:p-24 relative overflow-hidden border border-gray-100 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 shadow-inner">
                <Gift className="text-primary" size={40} />
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black italic mb-8 uppercase leading-none tracking-tighter">SEND A <span className="text-primary">CRISPY GIFT</span></h2>
              <p className="text-gray-500 text-xl mb-12 leading-relaxed font-medium">Surprise your friends and family with a Crispy Express gift card. Because nothing says "I love you" like hot, secret-spiced chicken.</p>
              <button className="btn-primary text-lg px-12">Buy Gift Card <ArrowRight size={24} /></button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80" 
                alt="Gift Combo" 
                className="w-full h-auto rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] rotate-3"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-3xl shadow-2xl -rotate-6">
                <p className="text-black font-black text-2xl italic uppercase tracking-tighter">PERFECT GIFT</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
