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
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80" 
            alt="Delicious food background" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary text-xs font-black uppercase tracking-widest">Limited Time: Free delivery on your first order</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-8 tracking-tighter text-white">
              CRAVE THE <br />
              <span className="text-primary italic">CRUNCH.</span> <br />
              LOVE THE <span className="text-accent">HEAT.</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
              Experience the legendary secret-spiced chicken that everyone's talking about. Hand-breaded, pressure-cooked, and delivered piping hot.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/menu" className="bg-primary hover:bg-red-700 text-white text-lg font-black px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl shadow-primary/30">
                ORDER NOW <ArrowRight size={20} />
              </Link>
              <Link to="/deals" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 text-lg font-black px-12 py-5 rounded-2xl flex items-center justify-center transition-all">
                EXPLORE DEALS
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-10">
              <div className="flex -space-x-4">
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-12 h-12 rounded-full border-4 border-black/20 ring-2 ring-white/10" />
                ))}
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                <div className="flex text-accent gap-0.5 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-sm text-gray-300 font-bold uppercase tracking-wider">Join 50,000+ happy foodies</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Food Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight">FRESH FROM THE KITCHEN</h2>
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
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight uppercase">FAN FAVORITES</h2>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-black/5">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 tracking-tight uppercase italic">QUICK ORDER</h2>
              <p className="text-xl text-gray-500 mb-10">Hungry? Grab our most popular items in just one click. No browsing needed.</p>
              
              <div className="space-y-6">
                {featuredItems.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-all group">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-black text-lg uppercase">{item.name}</h3>
                      <p className="text-primary font-black">Rs. {item.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-primary text-white p-4 rounded-xl hover:bg-red-700 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=800&q=80" 
                alt="Quick order chicken" 
                className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-charcoal p-8 rounded-3xl shadow-xl">
                <p className="text-3xl font-black italic leading-none">HOT &<br/>READY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight uppercase">BROWSE BY CATEGORY</h2>
            <p className="text-gray-500 text-lg">Find exactly what you're craving.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                className="group relative h-48 rounded-[2rem] overflow-hidden shadow-lg"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/60 transition-colors flex flex-col items-center justify-center text-white">
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <span className="font-black uppercase tracking-widest text-sm">{cat.name}</span>
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
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 italic tracking-tighter uppercase">JOIN THE CRISPY CLUB</h2>
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
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 italic tracking-tighter uppercase">WHAT THE FANS SAY</h2>
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
