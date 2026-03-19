import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Truck, ShieldCheck, Star } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setFeaturedItems(data.filter((item: any) => item.featured)));
  }, []);

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Hot, Crispy, Irresistible" 
        description="Freshly seasoned chicken, value combos, and delivery straight to your door. Order now and get hot food in under 30 minutes."
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-charcoal text-white pt-20">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary text-xs font-black uppercase tracking-widest">Today only: Free fries with any bucket — use code: HOTFRIES</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
              Hot, Crispy, <br />
              <span className="text-primary italic">Irresistible</span> — <br />
              Delivered Fast.
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Freshly seasoned chicken, value combos, and delivery straight to your door. Order now and get hot food in under 30 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-2">
                Order Now <ArrowRight size={20} />
              </Link>
              <Link to="/deals" className="btn-secondary text-lg px-10 py-4 flex items-center justify-center">
                View Deals
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-charcoal" />
                ))}
              </div>
              <div>
                <div className="flex text-accent">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm text-gray-400 font-medium">4.9/5 from 2,000+ happy eaters</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 text-primary rounded-2xl">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">30 Min Delivery</h3>
                <p className="text-gray-500">Fastest delivery in town, guaranteed hot or it's on us.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-50 text-accent rounded-2xl">
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-gray-500">On all orders over Rs. 1500. No hidden fees.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality First</h3>
                <p className="text-gray-500">100% fresh, never frozen chicken seasoned with secret spices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Fan Favorites</h2>
              <p className="text-gray-500">Our most ordered items this week.</p>
            </div>
            <Link to="/menu" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item: any) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-black text-center mb-16 italic">What Our Fans Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 rounded-3xl border border-black/5">
              <div className="flex text-accent mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg font-medium mb-6 italic">“Best fried chicken in the city — hot and crispy every time. 5/5”</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=32" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">Ayesha R.</p>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-black/5">
              <div className="flex text-accent mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg font-medium mb-6 italic">“Fast delivery, amazing value combos. The Zinger Crunch is a game changer!”</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=12" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">Bilal M.</p>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="flex-1 text-white z-10">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6">Order Faster with the App</h2>
              <p className="text-xl text-red-100 mb-10">Get exclusive app-only deals, track your order in real-time, and earn rewards on every bite.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-black transition-colors">
                  <span className="text-xs text-left">Download on the <br/><span className="text-lg">App Store</span></span>
                </button>
                <button className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-black transition-colors">
                  <span className="text-xs text-left">Get it on <br/><span className="text-lg">Google Play</span></span>
                </button>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                alt="App mockup" 
                className="rounded-3xl shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
