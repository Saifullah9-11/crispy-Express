import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Flame, Clock, ShieldCheck, Truck, Plus, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ContactSection } from '../components/ContactSection';
import { WhatsAppFloating } from '../components/WhatsAppFloating';
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
    { name: "Ali Ahmed", text: "Best crispy chicken in town! The Zinger Crunch is actually crunchy.", rating: 5, avatar: "A" },
    { name: "Sara Khan", text: "Fast delivery and the food was still piping hot. Highly recommended!", rating: 5, avatar: "S" },
    { name: "Zain Malik", text: "The family combo is a great value. Kids loved the popcorn chicken.", rating: 5, avatar: "Z" },
  ];

  return (
    <div className="overflow-hidden bg-white">
      <SEO title="Crispy Fried Chicken Hot & Spicy" />
      <WhatsAppFloating />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.freepik.com/free-photo/crispy-fried-chicken-with-seasoning_84443-82013.jpg?semt=ais_hybrid&w=740&q=80" 
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
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-6 py-2 rounded-full mb-8 font-black uppercase tracking-widest text-[10px] shadow-2xl">
              <Flame size={14} fill="currentColor" />
              <span>Now Serving Hot & Fresh</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 uppercase italic leading-[0.85] tracking-tighter text-white">
              Love at First Bite<br />
              <span className="text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_10px_10px_rgba(228,0,43,0.5)]">in the name of Spice</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest text-xs opacity-80">
              Freshly prepared meals, premium ingredients, and lightning-fast delivery, because you deserve better.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/menu" className="btn-primary text-lg group">
                Order Now <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/menu" className="btn-secondary text-lg group">
                View Menu <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
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
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4 uppercase tracking-tighter">Featured <span className="text-primary">Deals</span></h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Unbeatable value for the whole family</p>
            <div className="w-24 h-2 bg-primary mx-auto mt-6"></div>
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
                <div className="card h-[500px] relative overflow-hidden group-hover:shadow-primary/30 transition-all duration-500">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <div className="bg-accent text-black font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-4 shadow-lg">Limited Offer</div>
                    <h3 className="text-white text-4xl font-display font-black italic mb-2 uppercase tracking-tighter leading-none">{deal.name}</h3>
                    <p className="text-gray-300 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">{deal.description}</p>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Starting from</span>
                        <span className="text-primary text-4xl font-black italic leading-none">Rs. {deal.price}</span>
                      </div>
                      <Link to="/menu" className="bg-white text-primary p-5 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-90">
                        <Plus size={28} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 3. BEST SELLERS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4 uppercase tracking-tighter">Best <span className="text-primary">Sellers</span></h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">The flavors everyone is talking about</p>
            <div className="w-24 h-2 bg-primary mx-auto mt-6"></div>
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

      {/* 4. CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4 uppercase tracking-tighter">Explore <span className="text-primary">Categories</span></h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Find exactly what you're craving</p>
            <div className="w-24 h-2 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to="/menu" 
                className="group relative h-80 rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-white text-3xl font-display font-black italic uppercase tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">{cat.name}</h3>
                  <div className="w-0 h-1 bg-white group-hover:w-12 transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black italic mb-4 uppercase tracking-tighter">What They <span className="text-primary">Say</span></h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Real reviews from our crispy lovers</p>
            <div className="w-24 h-2 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex text-accent gap-1 mb-8 group-hover:scale-110 transition-transform duration-500">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium italic mb-10 text-lg leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/10">
                    {review.avatar}
                  </div>
                  <div className="text-left">
                    <span className="block font-black uppercase tracking-widest text-xs">{review.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Customer</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <ContactSection />

      {/* 7. STRONG CTA BANNER */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-display font-black italic text-white mb-8 leading-[0.9] tracking-tighter uppercase">ORDER NOW – <br /><span className="text-accent drop-shadow-2xl">FAST DELIVERY</span></h2>
            <p className="text-xl text-white/80 mb-12 font-medium uppercase tracking-widest text-xs opacity-80 max-w-xl mx-auto">Don't wait for the craving to pass. Get your hot and crispy meal delivered in under 30 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/menu" className="bg-white text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 w-full sm:w-fit">
                START ORDER <ChevronRight size={28} />
              </Link>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 w-full sm:w-fit">
                WHATSAPP <MessageCircle size={28} fill="currentColor" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
