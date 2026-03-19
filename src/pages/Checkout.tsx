import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import { CreditCard, Truck, MapPin, Clock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-display font-black mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">Your hot and crispy chicken is being prepared. Estimated delivery: 25-35 minutes.</p>
          <div className="bg-gray-50 p-4 rounded-xl mb-8 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Number</p>
            <p className="font-mono font-bold text-lg">#CE-982341</p>
          </div>
          <a href="/" className="btn-primary w-full block">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO title="Checkout" description="Complete your order and get hot chicken fast." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                <h2 className="text-2xl font-display font-bold">Delivery Details</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input type="text" className="w-full border rounded-xl px-4 py-3 focus:border-primary focus:outline-none" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input type="tel" className="w-full border rounded-xl px-4 py-3 focus:border-primary focus:outline-none" placeholder="+92 300 1234567" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input type="email" className="w-full border rounded-xl px-4 py-3 focus:border-primary focus:outline-none" placeholder="john@example.com" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">Delivery Address</label>
                  <textarea className="w-full border rounded-xl px-4 py-3 focus:border-primary focus:outline-none" rows={3} placeholder="Street, Area, City" required></textarea>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                <h2 className="text-2xl font-display font-bold">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="border-2 border-primary bg-red-50 p-4 rounded-2xl flex items-center gap-4 text-left">
                  <div className="p-2 bg-primary text-white rounded-lg"><Truck size={24} /></div>
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </button>
                <button className="border-2 border-gray-100 p-4 rounded-2xl flex items-center gap-4 text-left opacity-50 cursor-not-allowed">
                  <div className="p-2 bg-gray-100 text-gray-400 rounded-lg"><CreditCard size={24} /></div>
                  <div>
                    <p className="font-bold">Credit/Debit Card</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-bold">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dashed">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-3">
                  <span>Total</span>
                  <span className="text-primary">Rs. {total}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing || cart.length === 0}
                className="w-full btn-primary mt-8 py-4 text-lg flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Place Order <ArrowRight size={20} /></>
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
