import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Flame, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl transform group-hover:rotate-12 transition-transform">
                <Flame className="text-white" size={24} fill="currentColor" />
              </div>
              <span className="text-white font-display font-black text-2xl tracking-tighter italic uppercase">
                Crispy<span className="text-primary">Express</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate destination for crispy fried chicken, juicy burgers, and unbeatable deals. Fast delivery, fresh taste, and bold flavors.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              {['Home', 'Menu', 'Deals', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Contact Us</h4>
            <ul className="flex flex-col gap-6 text-sm text-gray-400">
              <li className="flex gap-4">
                <MapPin className="text-primary shrink-0" size={20} />
                <span>123 Crispy Street, Food District, Karachi, Pakistan</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <span>hello@crispyexpress.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 text-primary">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Join the Crispy Squad for exclusive deals and hot updates!</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-xl hover:scale-105 transition-transform">
                <Flame size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-500 font-black uppercase tracking-widest">
          <p>© 2026 Crispy Express. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
