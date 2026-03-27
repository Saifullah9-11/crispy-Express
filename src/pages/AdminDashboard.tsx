import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, Timestamp } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronDown, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Loader2,
  Lock
} from 'lucide-react';

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'preparing' | 'on-way' | 'delivered' | 'cancelled';
  createdAt: Timestamp;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'on-way': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'preparing': return <Loader2 className="animate-spin" size={16} />;
      case 'on-way': return <Truck size={16} />;
      case 'delivered': return <CheckCircle2 size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = 
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="text-primary animate-spin" size={48} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <SEO title="Access Denied" />
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="text-red-500" size={48} />
          </div>
          <h1 className="text-4xl font-display font-black italic mb-4 uppercase tracking-tighter">ACCESS <span className="text-primary">DENIED</span></h1>
          <p className="text-gray-500 mb-8">This area is restricted to administrators only. If you believe this is an error, please contact support.</p>
          <a href="/" className="btn-primary w-full">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <SEO title="Admin Dashboard" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-display font-black italic uppercase tracking-tighter mb-2">
              ORDER <span className="text-primary">CONTROL</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Manage your crispy empire in real-time
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-2xl pl-12 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="on-way">On Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="text-primary animate-spin mb-4" size={48} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-xl">
            <ShoppingBag className="text-gray-200 mx-auto mb-6" size={64} />
            <h3 className="text-2xl font-display font-black italic uppercase mb-2">NO ORDERS FOUND</h3>
            <p className="text-gray-400">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      {/* Left: Order Info */}
                      <div className="flex-1 space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            #{order.id.slice(-6).toUpperCase()}
                          </span>
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.replace('-', ' ')}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <Calendar size={14} />
                            {order.createdAt?.toDate().toLocaleString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Info</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm font-bold">
                                <User size={18} className="text-primary" />
                                {order.customerInfo.name}
                              </div>
                              <div className="flex items-center gap-3 text-sm font-bold">
                                <Phone size={18} className="text-primary" />
                                {order.customerInfo.phone}
                              </div>
                              <div className="flex items-start gap-3 text-sm font-bold">
                                <MapPin size={18} className="text-primary shrink-0" />
                                <span className="leading-relaxed">{order.customerInfo.address}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm font-bold">
                                  <span className="text-gray-600">{item.name} <span className="text-primary">x{item.quantity}</span></span>
                                  <span>Rs. {item.price * item.quantity}</span>
                                </div>
                              ))}
                              <div className="h-px bg-gray-100 my-2"></div>
                              <div className="flex justify-between text-lg font-display font-black italic uppercase">
                                <span>Total</span>
                                <span className="text-primary">Rs. {order.total}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="lg:w-64 shrink-0 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 text-center">Update Status</h4>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="w-full py-3 rounded-xl border-2 border-blue-100 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all"
                        >
                          Start Preparing
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'on-way')}
                          className="w-full py-3 rounded-xl border-2 border-purple-100 text-purple-600 font-black uppercase tracking-widest text-[10px] hover:bg-purple-50 transition-all"
                        >
                          Out for Delivery
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="w-full py-3 rounded-xl border-2 border-green-100 text-green-600 font-black uppercase tracking-widest text-[10px] hover:bg-green-50 transition-all"
                        >
                          Mark Delivered
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="w-full py-3 rounded-xl border-2 border-red-50 text-red-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 transition-all"
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
