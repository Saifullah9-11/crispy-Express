import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Truck, ShieldCheck, Star, Plus } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const { addToCart } = useCart();

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
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-charcoal">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform translate-x-20 hidden lg:block"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-2 mb-8 shadow-2xl">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Express Delivery Active • 30 Mins</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-display font-black leading-[0.85] mb-8 tracking-tighter text-white uppercase italic">
                CRISPY.<br />
                <span className="text-primary">FAST.</span><br />
                <span className="text-stroke text-white">READY.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The ultimate fried chicken experience, delivered at express speeds. Hand-breaded, secret-spiced, and always delivered piping hot.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/menu" className="group bg-primary hover:bg-red-600 text-white text-lg font-black px-10 py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl shadow-primary/40">
                  START ORDER <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/deals" className="bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white border border-white/10 text-lg font-black px-10 py-6 rounded-[2rem] flex items-center justify-center transition-all">
                  VIEW DEALS
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-black">50K+</span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Happy Customers</span>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-black">4.9/5</span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Average Rating</span>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-black">15+</span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Store Locations</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 animate-slow-zoom">
                <img 
                  src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80" 
                  alt="Crispy Chicken Bucket" 
                  className="w-full h-auto rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(230,30,42,0.3)] border-8 border-white/5"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 bg-accent p-8 rounded-[3rem] shadow-2xl rotate-12 animate-bounce">
                <p className="text-charcoal font-black italic leading-none text-2xl">HOT &<br/>CRISPY</p>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2.5rem] shadow-2xl -rotate-6">
                <div className="flex text-primary gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-charcoal font-black text-sm">"Best in Town!"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-primary py-6 overflow-hidden border-y-4 border-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-white text-4xl font-black italic uppercase tracking-tighter">CRISPY EXPRESS</span>
              <span className="text-white/30 text-4xl font-black italic uppercase tracking-tighter">•</span>
              <span className="text-white text-4xl font-black italic uppercase tracking-tighter">30 MIN DELIVERY</span>
              <span className="text-white/30 text-4xl font-black italic uppercase tracking-tighter">•</span>
              <span className="text-white text-4xl font-black italic uppercase tracking-tighter">SECRET SPICES</span>
              <span className="text-white/30 text-4xl font-black italic uppercase tracking-tighter">•</span>
              <span className="text-white text-4xl font-black italic uppercase tracking-tighter">ALWAYS FRESH</span>
              <span className="text-white/30 text-4xl font-black italic uppercase tracking-tighter">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Food Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight uppercase italic">STRAIGHT FROM THE <span className="text-primary">FRYER</span></h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <img src="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1629203851022-39c6f254b896?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2rem] hover:scale-95 transition-transform duration-500 shadow-lg" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <Clock size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 italic">30 MIN DELIVERY</h3>
              <p className="text-gray-500 leading-relaxed">Fastest delivery in town, guaranteed hot or it's on us. We don't play with hunger.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center text-accent mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <Truck size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 italic">FREE SHIPPING</h3>
              <p className="text-gray-500 leading-relaxed">On all orders over Rs. 1500. No hidden fees, no surprises. Just good food.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center text-green-600 mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 italic">QUALITY FIRST</h3>
              <p className="text-gray-500 leading-relaxed">100% fresh, never frozen chicken seasoned with secret spices. Quality you can taste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight uppercase italic">THE <span className="text-primary">CRISPY</span> LINEUP</h2>
              <p className="text-gray-500 text-lg">Our most ordered items this week. Grab 'em while they're hot!</p>
            </div>
            <Link to="/menu" className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary transition-all">
              VIEW FULL MENU <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredItems.map((item: any) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gray-50 rounded-[3rem] p-6 md:p-16 border border-black/5 relative">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1 mb-6">
                <Clock size={14} className="text-primary" />
                <span className="text-primary text-[10px] font-black uppercase tracking-widest">Instant Add</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tight uppercase italic leading-none">QUICK <span className="text-primary">ORDER</span></h2>
              <p className="text-lg md:text-xl text-gray-500 mb-10">Hungry? Grab our most popular items in just one click. No browsing needed.</p>
              
              <div className="space-y-4">
                {featuredItems.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 md:gap-6 p-3 md:p-4 bg-white rounded-3xl shadow-sm border border-black/5 hover:shadow-xl hover:border-primary/20 transition-all group">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-sm md:text-lg uppercase tracking-tight">{item.name}</h3>
                      <p className="text-primary font-black text-sm">Rs. {item.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-charcoal hover:bg-primary text-white p-4 md:p-5 rounded-2xl transition-all active:scale-90 shadow-lg"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full mt-12 lg:mt-0">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=800&q=80" 
                  alt="Quick order chicken" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-charcoal p-6 md:p-8 rounded-[2.5rem] shadow-2xl z-20">
                <p className="text-2xl md:text-4xl font-black italic leading-none">HOT &<br/>READY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tight uppercase italic">EXPLORE <span className="text-primary">MENU</span></h2>
            <p className="text-gray-500 text-lg md:text-xl">Find exactly what you're craving.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: 'Chicken', icon: '🍗', img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80' },
              { name: 'Burgers', icon: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
              { name: 'Combos', icon: '🍱', img: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=400&q=80' },
              { name: 'Sides', icon: '🍟', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
              { name: 'Snacks', icon: '🍿', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
              { name: 'Drinks', icon: '🥤', img: 'https://images.unsplash.com/photo-1629203851022-39c6f254b896?auto=format&fit=crop&w=400&q=80' }
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={`/menu?category=${cat.name}`}
                className="group relative h-48 md:h-64 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/70 transition-all duration-500 flex flex-col items-center justify-center text-white p-4">
                  <span className="text-4xl md:text-5xl mb-3 transform group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                  <span className="font-black uppercase tracking-[0.2em] text-[10px] md:text-xs text-center">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Order / Newsletter */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 italic tracking-tighter uppercase">JOIN THE <span className="text-accent">CRISPY SQUAD</span></h2>
              <p className="text-xl text-red-100 mb-10">Get 20% off your first order and exclusive access to secret menu items.</p>
              
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white text-charcoal font-bold outline-none focus:ring-4 focus:ring-accent/50 transition-all"
                />
                <button className="bg-charcoal hover:bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">
                  SUBSCRIBE
                </button>
              </form>
              <p className="mt-6 text-xs text-red-200">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-charcoal text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 italic tracking-tighter uppercase">WHAT THE <span className="text-primary">FANS</span> SAY</h2>
            <p className="text-gray-400 text-lg">Real reviews from real chicken lovers.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Ayesha R.", text: "Best fried chicken in the city — hot and crispy every time. 5/5", img: "32" },
              { name: "Bilal M.", text: "Fast delivery, amazing value combos. The Zinger is a game changer!", img: "12" },
              { name: "Sana K.", text: "The secret spices are actually secret. I can't stop ordering!", img: "45" },
              { name: "Omar D.", text: "Perfect for family dinners. The bucket is massive and delicious.", img: "22" },
              { name: "Zainab T.", text: "Crispy Express is my go-to for late night cravings. Always fresh.", img: "64" },
              { name: "Hamza S.", text: "Best value for money. The portions are generous and tasty.", img: "18" },
              { name: "Fatima L.", text: "Love the spicy wings! They have the perfect kick.", img: "28" },
              { name: "Ali H.", text: "Quickest delivery I've experienced. Food was still steaming!", img: "33" }
            ].map((rev, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
              >
                <div className="flex text-accent gap-0.5 mb-3">
                  {[1,2,3,4,5].map(j => <Star key={j} size={12} fill="currentColor" />)}
                </div>
                <p className="text-sm text-gray-300 mb-4 italic leading-relaxed">“{rev.text}”</p>
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?img=${rev.img}`} className="w-8 h-8 rounded-full grayscale" />
                  <div>
                    <p className="text-xs font-bold">{rev.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Verified</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
