import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Truck, ShieldCheck, Star, Plus, ShoppingBag, Quote } from 'lucide-react';
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

      {/* Express Delivery Banner */}
      <div className="bg-accent text-charcoal py-2 text-center font-black uppercase tracking-[0.3em] text-[10px] md:text-xs relative z-50">
        <div className="flex items-center justify-center gap-4 animate-pulse">
          <Clock size={14} />
          <span>Express Delivery Active • 30 Mins or Free</span>
          <Clock size={14} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80" 
            alt="Delicious Burger Background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform translate-x-20 hidden lg:block"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
          
          {/* Decorative Floating Elements */}
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
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
                JUICY.<br />
                CRISPY.<br />
                <span className="text-primary">ELITE.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The ultimate fusion of flame-grilled burgers and secret-spiced crispy chicken. Hand-crafted, locally sourced, and delivered at express speeds in under 30 minutes.
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
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" 
                  alt="Signature Burger" 
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
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1920&q=80" 
            alt="Gallery Background" 
            className="w-full h-full object-cover opacity-5"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/95"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tight uppercase italic">STRAIGHT FROM THE <span className="text-primary">FRYER</span></h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <img src="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80" className="w-full h-80 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1629203851022-39c6f254b896?auto=format&fit=crop&w=600&q=80" className="w-full h-64 object-cover rounded-[2.5rem] hover:scale-95 transition-transform duration-500 shadow-xl border-4 border-white" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1920&q=80" 
            alt="Features Background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/90"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 italic tracking-tighter uppercase">WHY <span className="text-primary">EXPRESS?</span></h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">We don't just deliver food; we deliver a promise of quality, speed, and unbeatable flavor.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Clock size={48} />, 
                title: "EXPRESS SPEED", 
                desc: "Our delivery fleet is optimized for speed. We guarantee your food arrives hot and crispy in under 30 minutes, or it's on the house.",
                color: "text-primary",
                bg: "bg-primary/5"
              },
              { 
                icon: <Truck size={48} />, 
                title: "ZERO FEES", 
                desc: "No hidden charges, no service fees. Just the price you see on the menu. Free delivery on all orders over Rs. 1500.",
                color: "text-accent",
                bg: "bg-accent/5"
              },
              { 
                icon: <ShieldCheck size={48} />, 
                title: "PREMIUM QUALITY", 
                desc: "We use only 100% fresh, never-frozen chicken. Each piece is hand-breaded with our secret blend of 11 spices.",
                color: "text-green-600",
                bg: "bg-green-50"
              }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[3rem] ${feat.bg} border border-black/5 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl`}
              >
                <div className={`w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center ${feat.color} mb-8 group-hover:rotate-6 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 italic tracking-tight uppercase">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80" 
            alt="Featured Items Background" 
            className="w-full h-full object-cover opacity-5"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/95"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tight uppercase italic">THE <span className="text-primary">CRISPY</span> LINEUP</h2>
              <p className="text-gray-500 text-lg md:text-xl">Our most ordered items this week. Grab 'em while they're hot!</p>
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
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1920&q=80" 
            alt="Quick Order Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/80"></div>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-[150px]"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-[150px]"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 bg-white/5 backdrop-blur-xl rounded-[4rem] p-8 md:p-20 border border-white/10">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1 mb-8">
                <Clock size={14} className="text-primary" />
                <span className="text-primary text-[10px] font-black uppercase tracking-widest">Instant Add • Hot & Ready</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black mb-8 tracking-tight uppercase italic leading-none text-white">QUICK <span className="text-primary">ORDER</span></h2>
              <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">Hungry? Grab our most popular items in just one click. No browsing needed. Perfect for when you need your fix NOW.</p>
              
              <div className="space-y-6">
                {featuredItems.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-center gap-6 p-4 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-lg uppercase tracking-tight text-white">{item.name}</h3>
                      <p className="text-primary font-black">Rs. {item.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-primary hover:bg-red-600 text-white p-5 rounded-2xl transition-all active:scale-90 shadow-xl shadow-primary/20"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full mt-12 lg:mt-0">
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform lg:rotate-3 hover:rotate-0 transition-transform duration-700 border-8 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=800&q=80" 
                  alt="Quick order chicken" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-accent text-charcoal p-10 rounded-[3rem] shadow-2xl z-20 rotate-[-5deg]">
                <p className="text-3xl md:text-5xl font-black italic leading-none">HOT &<br/>READY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=1920&q=80" 
            alt="Category Background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/90"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tight uppercase italic">EXPLORE <span className="text-primary">MENU</span></h2>
            <p className="text-gray-500 text-lg md:text-xl">Find exactly what you're craving.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Chicken', icon: '🍗', img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&q=80', color: 'bg-red-500' },
              { name: 'Burgers', icon: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', color: 'bg-orange-500' },
              { name: 'Combos', icon: '🍱', img: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?auto=format&fit=crop&w=400&q=80', color: 'bg-yellow-500' },
              { name: 'Sides', icon: '🍟', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', color: 'bg-green-500' },
              { name: 'Snacks', icon: '🍿', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80', color: 'bg-purple-500' },
              { name: 'Drinks', icon: '🥤', img: 'https://images.unsplash.com/photo-1629203851022-39c6f254b896?auto=format&fit=crop&w=400&q=80', color: 'bg-blue-500' }
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={`/menu?category=${cat.name}`}
                className="group relative h-64 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-white"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className={`absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500 ${cat.color}`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <span className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">{cat.icon}</span>
                  <span className="font-black uppercase tracking-widest text-sm text-center drop-shadow-md">{cat.name}</span>
                  <div className="mt-4 w-0 group-hover:w-12 h-1 bg-white rounded-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80" 
            alt="Testimonials Background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/80"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 italic tracking-tighter uppercase">WHAT THE <span className="text-primary">SQUAD</span> SAYS</h2>
            <div className="flex justify-center gap-1 text-accent">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", text: "The crispiness is actually insane. I've tried every chicken place in town, and nothing beats the Express Bucket.", rating: 5 },
              { name: "Mike R.", text: "Delivery was under 20 minutes. Food was still steaming hot. This is my new Friday night go-to.", rating: 5 },
              { name: "Alex K.", text: "The secret spices are real. That Zesty Burger has a kick that I can't find anywhere else. 10/10.", rating: 5 }
            ].map((rev, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-black/5 relative">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                  <Quote size={24} />
                </div>
                <p className="text-gray-600 text-lg italic mb-8 leading-relaxed">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                    {rev.name[0]}
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-tight italic">{rev.name}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80" 
            alt="Newsletter Background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden border-8 border-white/5 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-8 rotate-[-2deg]">
                LIMITED TIME OFFER
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black mb-8 italic tracking-tighter uppercase leading-none">JOIN THE <span className="text-accent">CRISPY SQUAD</span></h2>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 font-medium">Get <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-8">20% OFF</span> your first order and exclusive access to secret menu items.</p>
              
              <form className="flex flex-col sm:flex-row gap-4 bg-white/5 p-4 rounded-[2.5rem] backdrop-blur-xl border border-white/10" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white text-charcoal font-bold outline-none focus:ring-4 focus:ring-accent/50 transition-all placeholder:text-gray-400"
                />
                <button className="bg-primary hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95">
                  GET MY DISCOUNT
                </button>
              </form>
              <p className="mt-8 text-gray-500 text-sm font-bold uppercase tracking-widest">No spam. Just crispy goodness. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
