import React from 'react';
import { Star, Plus, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    calories?: number;
    featured?: boolean;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="card flex flex-col h-full group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {product.featured && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 shadow-2xl">
            <Flame size={14} fill="currentColor" />
            <span>Best Seller</span>
          </div>
        )}
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display font-black text-2xl leading-tight uppercase tracking-tighter italic">{product.name}</h3>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-8 flex-1 leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-primary text-3xl font-black italic leading-none">Rs. {product.price}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Inc. Taxes</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="bg-charcoal hover:bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-xl"
          >
            <Plus size={28} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
