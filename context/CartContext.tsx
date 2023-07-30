"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
    id: number;
    title: string;
    desc: string;
    price: string;
    isFeatured: boolean;
    categoryId: string;
    colorId: string;
    lengthId: string;
    textureId: string;
    methodId: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    quantity: number;
    subTotal: number;
}

export const contextVal = createContext<any>(null);
export const contextProduct = createContext<any>({});

export const CartContext = ({children}:{children:ReactNode}) => {
  const [cartItems, setCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  return(
    <contextVal.Provider value={{cartItems,setCartItems}}>
      <contextProduct.Provider value={{cartProducts,setCartProducts}}>
        {children}
      </contextProduct.Provider>
    </contextVal.Provider>
  )
}

// interface CartItem {
//     product: Product;
//     quantity: number;
// }
// interface CartContextData {
//   cartItems: CartItem[];
//   totalPrice: number;
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   increaseQuantity: (productId: number) => void;
//   decreaseQuantity: (productId: number) => void;
// }

// const CartContext = createContext<CartContextData | undefined>(undefined);

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }

// interface CartProviderProps {
//   children: ReactNode;
// }




// export function CartProvider({ children }: CartProviderProps) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([
//     {
//       product: {
//         id: 1,
//         title: 'Product 1',
//         desc: 'Description for Product 1',
//         price: '25.00',
//         isFeatured: true,
//         categoryId: '1',
//         colorId: '1',
//         lengthId: '1',
//         textureId: '1',
//         methodId: '1',
//         createdAt: '2023-07-20T11:38:18.060Z',
//         updatedAt: '2023-07-20T11:38:18.060Z',
//         img: 'https://example.com/product1.jpg',
//       },
//       quantity: 2,
//     },
//     {
//       product: {
//         id: 2,
//         title: 'Product 2',
//         desc: 'Description for Product 2',
//         price: '15.00',
//         isFeatured: false,
//         categoryId: '2',
//         colorId: '2',
//         lengthId: '2',
//         textureId: '2',
//         methodId: '2',
//         createdAt: '2023-07-21T11:38:18.060Z',
//         updatedAt: '2023-07-21T11:38:18.060Z',
//         img: 'https://example.com/product2.jpg',
//       },
//       quantity: 1,
//     },
//   ]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);

//   const findCartItemIndexById = (productId: number): number => {
//     return cartItems.findIndex((item) => item.product.id === productId);
//   };

//   const addToCart = (product: Product) => {
//     const existingIndex = findCartItemIndexById(product.id);
//     if (existingIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingIndex].quantity += 1;
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { product, quantity: 1 }]);
//     }
//     setTotalPrice(totalPrice + parseFloat(product.price));
//   };

//   const removeFromCart = (productId: number) => {
//     const existingIndex = findCartItemIndexById(productId);
//     if (existingIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       const removedItem = updatedCartItems.splice(existingIndex, 1)[0];
//       setTotalPrice(totalPrice - parseFloat(removedItem.product.price) * removedItem.quantity);
//       setCartItems(updatedCartItems);
//     }
//   };

//   const increaseQuantity = (productId: number) => {
//     const existingIndex = findCartItemIndexById(productId);
//     if (existingIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingIndex].quantity += 1;
//       setTotalPrice(totalPrice + parseFloat(updatedCartItems[existingIndex].product.price));
//       setCartItems(updatedCartItems);
//     }
//   };

//   const decreaseQuantity = (productId: number) => {
//     const existingIndex = findCartItemIndexById(productId);
//     if (existingIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       if (updatedCartItems[existingIndex].quantity > 1) {
//         updatedCartItems[existingIndex].quantity -= 1;
//         setTotalPrice(totalPrice - parseFloat(updatedCartItems[existingIndex].product.price));
//         setCartItems(updatedCartItems);
//       }
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, totalPrice, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
