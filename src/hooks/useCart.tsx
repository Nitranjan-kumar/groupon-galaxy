
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Deal } from '@/types/deal';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  deal: Deal;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (deal: Deal, quantity?: number) => void;
  removeFromCart: (dealId: string) => void;
  updateQuantity: (dealId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('groupon-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('groupon-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (deal: Deal, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.deal.id === deal.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item => 
          item.deal.id === deal.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast({
          title: "Cart updated",
          description: `${deal.title} quantity increased to ${existingItem.quantity + quantity}.`,
        });
        
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${deal.title} has been added to your cart.`,
        });
        
        return [...prevItems, { deal, quantity }];
      }
    });
  };

  const removeFromCart = (dealId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.deal.id === dealId);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.deal.title} has been removed from your cart.`,
        });
      }
      
      return prevItems.filter(item => item.deal.id !== dealId);
    });
  };

  const updateQuantity = (dealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dealId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.deal.id === dealId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.deal.currentPrice * item.quantity), 
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
