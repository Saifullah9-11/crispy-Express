import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard, Truck, MapPin, LogIn, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, login, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        userId: user.uid,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
        customerInfo: {
          ...formData,
          email: user.email || ''
        }
      };

      await addDoc(collection(db, 'orders'), orderData);
      setIsOrdered(true);
      clearCart();
    } catch (err) {
      console.error('Order failed:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'orders');
      } catch (firestoreErr: any) {
        setError('Failed to place order. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center pt-20 pb-20 px-4">
        <SEO title="Login Required" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <LogIn className="text-primary" size={48} />
          </div>
          <h1 className="text-4xl font-display font-black italic mb-4 uppercase tracking-tighter">LOGIN <span className="text-primary">REQUIRED</span></h1>
          <p className="text-gray-500 mb-10 leading-relaxed">Please login with your Google account to complete your order and track your delivery.</p>
          <button onClick={login} className="btn-primary w-full">Login with Google <ArrowRight size={20} /></button>
        </motion.div>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center pt-20 pb-20 px-4">
        <SEO title="Order Success" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Truck className="text-primary" size={48} />
          </div>
          <h1 className="text-4xl font-display font-black italic mb-4 uppercase tracking-tighter">ORDER <span className="text-primary">PLACED!</span></h1>
          <p className="text-gray-500 mb-10 leading-relaxed">Your hot and crispy meal is being prepared and will be at your doorstep in 30 minutes. Get ready for the crunch!</p>
          <Link to="/" className="btn-primary w-full">Back to Home <ArrowRight size={20} /></Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center pt-20 pb-20 px-4">
        <SEO title="Empty Cart" />
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="text-gray-300" size={48} />
          </div>
          <h1 className="text-4xl font-display font-black italic mb-4 uppercase tracking-tighter">CART IS <span className="text-primary">EMPTY</span></h1>
          <p className="text-gray-400 mb-10">Looks like you haven't added any crispy goodness yet. What are you waiting for?</p>
          <Link to="/menu" className="btn-primary w-full inline-flex">Explore Menu <ArrowRight size={20} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1920&q=80" 
          alt="Checkout Background" 
          className="w-full h-full object-cover opacity-5"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        </div>
      </div>

      <SEO title="Checkout" description="Complete your order and get hot chicken fast." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-12">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${step >= 1 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <div className="h-px bg-gray-100 flex-1"></div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${step >= 2 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <div className="h-px bg-gray-100 flex-1"></div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${step >= 3 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}>3</div>
            </div>

            <form onSubmit={handleOrder} className="space-y-12">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl font-bold text-sm">
                  {error}
                </div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <MapPin className="text-primary" size={32} />
                    <h2 className="text-3xl font-display font-black italic uppercase">DELIVERY <span className="text-primary">DETAILS</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Full Name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field" 
                    />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field" 
                    />
                    <div className="md:col-span-2">
                      <textarea 
                        name="address"
                        placeholder="Delivery Address" 
                        required 
                        rows={4} 
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input-field resize-none"
                      ></textarea>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="btn-primary w-full md:w-auto">Next Step <ArrowRight size={20} /></button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <CreditCard className="text-primary" size={32} />
                    <h2 className="text-3xl font-display font-black italic uppercase">PAYMENT <span className="text-primary">METHOD</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button type="button" className="p-8 rounded-[2rem] border-2 border-primary bg-primary/5 flex flex-col items-center gap-4 transition-all text-left">
                      <Truck className="text-primary" size={32} />
                      <span className="font-black uppercase tracking-widest text-xs">Cash on Delivery</span>
                    </button>
                    <button type="button" className="p-8 rounded-[2rem] border-2 border-gray-100 bg-white flex flex-col items-center gap-4 opacity-50 cursor-not-allowed text-left">
                      <CreditCard className="text-gray-300" size={32} />
                      <span className="font-black uppercase tracking-widest text-xs text-gray-300">Online Payment (Coming Soon)</span>
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 md:flex-none">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1 md:flex-none">Review Order <ArrowRight size={20} /></button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <ShoppingBag className="text-primary" size={32} />
                    <h2 className="text-3xl font-display font-black italic uppercase">FINAL <span className="text-primary">REVIEW</span></h2>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-4">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                      <span className="text-gray-400">Subtotal</span>
                      <span>Rs. {total}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span className="text-primary">FREE</span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between text-2xl font-display font-black italic uppercase">
                      <span>Total</span>
                      <span className="text-primary">Rs. {total}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 md:flex-none">Back</button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">Processing... <Loader2 className="animate-spin" size={20} /></div>
                      ) : (
                        <div className="flex items-center gap-2">Place Order <ArrowRight size={20} /></div>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal rounded-[3rem] p-8 text-white sticky top-32 shadow-2xl">
              <h3 className="text-2xl font-display font-black italic uppercase mb-8 tracking-tight">YOUR <span className="text-primary">CART</span></h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar mb-8">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black uppercase tracking-tight text-xs truncate mb-1">{item.name}</h4>
                        <p className="text-primary font-black text-sm">Rs. {item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-white hover:text-primary transition-colors"><Minus size={14} /></button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-white hover:text-primary transition-colors"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="border-t border-white/10 pt-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total Amount</span>
                  <span className="text-3xl font-display font-black italic text-primary">Rs. {total}</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Taxes and delivery included</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
