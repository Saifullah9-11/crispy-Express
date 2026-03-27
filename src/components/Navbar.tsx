import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const { user, login, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/deals' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl transform group-hover:rotate-12 transition-transform">
              <Flame className="text-white" size={24} fill="currentColor" />
            </div>
            <span className="text-white font-display font-black text-xl md:text-2xl tracking-tighter italic uppercase">
              Crispy<span className="text-primary">Express</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-black uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/checkout" className="relative group">
              <div className="bg-primary p-3 rounded-full hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <ShoppingCart className="text-white" size={20} />
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-charcoal text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-charcoal">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none mb-1">Welcome</span>
                  <span className="text-xs font-black text-white uppercase tracking-tight truncate max-w-[100px]">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button onClick={logout} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white group" title="Logout">
                  <LogOut size={18} className="group-hover:text-primary transition-colors" />
                </button>
              </div>
            ) : (
              <button onClick={login} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl transition-all group">
                <LogIn size={18} className="text-primary" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="text-primary" size={20} />
                )}
              </div>
            )}
            <Link to="/checkout" className="relative">
              <ShoppingCart className="text-white" size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-black uppercase tracking-widest ${location.pathname === link.path ? 'text-primary' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              {user ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-3 text-xl font-black uppercase tracking-widest text-primary"
                >
                  <LogOut size={24} /> Logout
                </button>
              ) : (
                <button 
                  onClick={() => { login(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-3 text-xl font-black uppercase tracking-widest text-primary"
                >
                  <LogIn size={24} /> Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
