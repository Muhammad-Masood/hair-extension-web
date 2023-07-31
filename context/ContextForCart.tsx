// CartContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from './types';

interface CartContextData {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const findCartItemIndexById = (productId: number): number => {
    return cartItems.findIndex((item) => item.product.id === productId);
  };

  const addToCart = (product: Product) => {
    const existingIndex = findCartItemIndexById(product.id);
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    setTotalPrice(totalPrice + parseFloat(product.price));
  };

  const removeFromCart = (productId: number) => {
    const existingIndex = findCartItemIndexById(productId);
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const removedItem = updatedCartItems.splice(existingIndex, 1)[0];
      setTotalPrice(totalPrice - parseFloat(removedItem.product.price) * removedItem.quantity);
      setCartItems(updatedCartItems);
    }
  };

  const increaseQuantity = (productId: number) => {
    const existingIndex = findCartItemIndexById(productId);
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex].quantity += 1;
      setTotalPrice(totalPrice + parseFloat(updatedCartItems[existingIndex].product.price));
      setCartItems(updatedCartItems);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const existingIndex = findCartItemIndexById(productId);
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[existingIndex].quantity > 1) {
        updatedCartItems[existingIndex].quantity -= 1;
        setTotalPrice(totalPrice - parseFloat(updatedCartItems[existingIndex].product.price));
        setCartItems(updatedCartItems);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
