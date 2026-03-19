import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount, cart, total, updateQuantity, removeFromCart } = useCart();
  const location = useLocation();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-display font-black text-primary italic">CRISPY</span>
                <span className="text-2xl font-display font-black text-charcoal ml-1">EXPRESS</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link to="/menu" className={`font-bold hover:text-primary transition-colors ${location.pathname === '/menu' ? 'text-primary' : ''}`}>Menu</Link>
                <Link to="/deals" className={`font-bold hover:text-primary transition-colors ${location.pathname === '/deals' ? 'text-primary' : ''}`}>Deals</Link>
                <Link to="/locations" className={`font-bold hover:text-primary transition-colors ${location.pathname === '/locations' ? 'text-primary' : ''}`}>Locations</Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/locations" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary">
                <MapPin size={16} />
                <span>Find Store</span>
              </Link>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-primary transition-colors"
              >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-charcoal text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link to="/menu" className="hidden md:block btn-primary py-2 text-sm">
                Order Now
              </Link>

              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-black/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <Link to="/menu" className="block px-3 py-4 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                <Link to="/deals" className="block px-3 py-4 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>Deals</Link>
                <Link to="/locations" className="block px-3 py-4 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>Locations</Link>
                <Link to="/account" className="block px-3 py-4 text-lg font-bold border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                <div className="pt-4">
                  <Link to="/menu" className="w-full btn-primary block text-center" onClick={() => setIsMenuOpen(false)}>Order Now</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-display font-bold">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={64} className="text-gray-200" />
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                    <Link to="/menu" onClick={() => setIsCartOpen(false)} className="btn-primary">Start Ordering</Link>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Rs. {item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50">-</button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rs. {item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 mt-2 hover:underline">Remove</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-black">Rs. {total}</span>
                  </div>
                  <Link 
                    to="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full btn-primary block text-center py-4 text-lg"
                  >
                    Checkout
                  </Link>
                  <p className="text-[10px] text-center text-gray-400">Taxes and delivery calculated at checkout</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/5 p-3 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link to="/menu" className="flex-1 btn-primary text-center py-3">Order Now</Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-accent text-charcoal px-4 rounded-full font-bold flex items-center gap-2"
        >
          <ShoppingBag size={20} />
          <span>{itemCount}</span>
        </button>
      </div>
    </>
  );
};
