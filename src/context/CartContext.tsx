import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, doc, getDoc, setDoc } from '../firebase';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crispy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync cart with Firestore when user changes
  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        try {
          const cartDoc = await getDoc(doc(db, 'carts', user.uid));
          if (cartDoc.exists()) {
            const cloudItems = cartDoc.data().items || [];
            if (cloudItems.length > 0) {
              setCart(cloudItems);
            } else if (cart.length > 0) {
              await setDoc(doc(db, 'carts', user.uid), { items: cart });
            }
          } else if (cart.length > 0) {
            await setDoc(doc(db, 'carts', user.uid), { items: cart });
          }
        } catch (error) {
          console.error('Failed to sync cart:', error);
        }
      }
    };
    syncCart();
  }, [user]);

  // Save to localStorage and Firestore on changes
  useEffect(() => {
    localStorage.setItem('crispy_cart', JSON.stringify(cart));
    
    const updateCloudCart = async () => {
      if (user) {
        try {
          await setDoc(doc(db, 'carts', user.uid), { items: cart });
        } catch (error) {
          console.error('Failed to sync cart to cloud:', error);
        }
      }
    };
    
    const timeoutId = setTimeout(updateCloudCart, 1000); // Debounce sync
    return () => clearTimeout(timeoutId);
  }, [cart, user]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
