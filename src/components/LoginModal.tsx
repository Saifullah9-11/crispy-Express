import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Flame, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'phone';

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, loginWithPhone } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'signup') {
        if (!name || !email || !password) {
          throw new Error('Please fill in all required fields');
        }
        await signup(email, password, name, phone);
      } else if (mode === 'phone') {
        if (!name || !phone) {
          throw new Error('Please fill in all fields');
        }
        await loginWithPhone(phone, name);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Flame className="text-primary" size={32} fill="currentColor" />
              </div>
              
              <h2 className="text-white text-3xl font-display font-black italic uppercase tracking-tighter">
                {mode === 'login' ? 'Welcome Back!' : mode === 'signup' ? 'Join Us!' : 'Quick Login'}
              </h2>
              <p className="text-white/70 text-xs font-black uppercase tracking-widest mt-2">
                {mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Create your food account' : 'Join the Crispy Squad'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {(mode === 'signup' || mode === 'phone') && (
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}

                {mode !== 'phone' && (
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}

                {(mode === 'signup' || mode === 'phone') && (
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 03001234567"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}

                {mode !== 'phone' && (
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm mt-8 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === 'login' ? 'Login Now' : mode === 'signup' ? 'Create Account' : 'Start Ordering'} <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="flex flex-col gap-3 mt-6">
                {mode === 'login' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-primary transition-colors"
                    >
                      Don't have an account? <span className="text-primary underline">Sign Up</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('phone')}
                      className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                      Or login with phone number
                    </button>
                  </>
                ) : mode === 'signup' ? (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Already have an account? <span className="text-primary underline">Login</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Back to email login
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
