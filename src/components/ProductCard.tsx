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
      whileHover={{ y: -10 }}
      className="card flex flex-col h-full group"
    >
      <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {product.featured && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
            <Flame size={12} />
            <span>Best Seller</span>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display font-black text-xl leading-tight uppercase tracking-tight">{product.name}</h3>
          <div className="flex flex-col items-end">
            <span className="font-black text-primary text-lg leading-none">Rs. {product.price}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PKR</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-charcoal hover:bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-black/10"
          >
            <Plus size={18} />
            <span>Add to Cart</span>
          </button>
          
          <div className="p-4 bg-gray-50 rounded-2xl text-accent">
            <Star size={18} fill="currentColor" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
