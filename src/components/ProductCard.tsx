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
      whileHover={{ y: -5 }}
      className="card flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
            <Flame size={12} />
            <span>Best Seller</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg leading-tight">{product.name}</h3>
          <span className="font-black text-primary">Rs. {product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        {product.calories && (
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
            {product.calories} CAL
          </div>
        )}

        <button 
          onClick={() => addToCart(product)}
          className="w-full btn-primary py-2 text-sm flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};
