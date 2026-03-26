import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Flame, Clock, ShieldCheck, Truck, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import menu from '../data/menu.json';

export const Home: React.FC = () => {
  const featuredDeals = menu.filter(item => item.category === 'Deals').slice(0, 3);
  const bestSellers = menu.filter(item => item.featured).slice(0, 4);
  const categories = [
    { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
    { name: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80' },
    { name: 'Fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
    { name: 'Drinks', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80' },
  ];

  const reviews = [
    { name: "Ali Ahmed", text: "Best crispy chicken in town! The Zinger Crunch is actually crunchy.", rating: 5 },
    { name: "Sara Khan", text: "Fast delivery and the food was still piping hot. Highly recommended!", rating: 5 },
    { name: "Zain Malik", text: "The family combo is a great value. Kids loved the popcorn chicken.", rating: 5 },
  ];

  return (
    <div className="overflow-hidden bg-white">
      <SEO title="Hot. Crispy. Delivered Fast." />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1920&q=80" 
            alt="Crispy Fried Chicken" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Dark overlay (black gradient) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-6 uppercase italic leading-[0.9] tracking-tighter">
              Hot. Crispy.<br />
              <span className="text-primary">Delivered Fast.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Freshly made chicken, juicy burgers, and irresistible combos at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/menu" className="btn-primary text-lg">
                Order Now <ArrowRight size={24} />
              </Link>
              <Link to="/menu" className="btn-secondary text-lg">
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* 1. FEATURED DEALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4">Featured <span className="text-primary">Deals</span></h2>
            <div className="w-24 h-2 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredDeals.map((deal, i) => (
              <motion.div 
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="card h-[450px] relative overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="bg-accent text-black font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-4 shadow-lg">Limited Offer</div>
                    <h3 className="text-white text-3xl font-display font-black italic mb-2">{deal.name}</h3>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-2">{deal.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-3xl font-black italic">Rs. {deal.price}</span>
                      <button className="bg-white text-primary p-4 rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl">
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BEST SELLERS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4">Best <span className="text-primary">Sellers</span></h2>
            <div className="w-24 h-2 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((item, i) => (
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
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4">Explore <span className="text-primary">Categories</span></h2>
            <div className="w-24 h-2 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to="/menu" 
                className="group relative h-64 rounded-3xl overflow-hidden shadow-xl"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-display font-black italic uppercase tracking-tighter">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4">What They <span className="text-primary">Say</span></h2>
            <div className="w-24 h-2 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="flex text-accent gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium italic mb-8">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-black">
                    {review.name[0]}
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRONG CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/90"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-display font-black italic text-white mb-8 leading-tight tracking-tighter">ORDER NOW – <br /><span className="text-accent">FAST DELIVERY</span></h2>
            <p className="text-xl text-white/80 mb-12 font-medium">Don't wait for the craving to pass. Get your hot and crispy meal delivered in under 30 minutes.</p>
            <Link to="/menu" className="bg-white text-primary px-12 py-6 rounded-xl font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3 mx-auto w-fit">
              START ORDER <ChevronRight size={28} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
