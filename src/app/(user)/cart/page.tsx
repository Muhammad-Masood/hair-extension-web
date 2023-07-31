"use client"

"use client"

import ModalToBuy from '@/components/modals/ModalToBuy';
import { useContext, useState } from "react";
import CartView from '@/components/CartView';
import { ShoppingBagIcon } from 'lucide-react';


import React from 'react';
import { useCartContext } from '../../../../context/ContextForCart';
import { CartItem } from '../../../../context/types';
import { Button } from '@/components/ui/button';

// interface Product {
//   id: number;
//   title: string;
//   desc: string;
//   price: string;
//   isFeatured: boolean;
//   categoryId: string;
//   colorId: string;
//   lengthId: string;
//   textureId: string;
//   methodId: string;
//   createdAt: string;
//   updatedAt: string;
//   img: string;
// }

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

const CartPage: React.FC = () => {


  const { cartItems, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCartContext();

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };




  console.log({ cartItems });


  return (

    <section className="py-12 ">
      <div className="container mx-auto">

        <div className="flex flex-col lg:flex-row">
          <div className='w-full lg:w-3/4 p-4 lg:order-1 order-2'>
            {cartItems?.length === 0 ? (
              <div>
                <h1 className="font-bold flex flex-col justify-center items-center text-4xl text-black dark:text-white mt-10 gap-y-4"><span><ShoppingBagIcon className="h-24 w-24" /></span>Your shopping bag is empty</h1>
              </div>) : (
              // cartProducts.map((product: Product, index: number) => (
              //   <CartView key={index} product={product} /> 
              // ))
              cartItems.map((product, index: number) => {
                console.log({ product });

                return <CartView key={index} product={product.product} quantity={product.quantity}/>
              })
            )}

          </div>
          <div className="w-full lg:w-1/4 p-4 lg:order-1 order-1">

            <div className="bg-slate-50 dark:bg-gray-800 space-y-5 p-7">
              <h3 className="scroll-m-20 text-xl font-bold font-poppins tracking-tight">Order Summary</h3>
              {cartItems?.length != 0 &&
                <span className="flex font-poppins">
                  Quantity
                  <p className="pl-7 w-max">{cartItems?.length}</p>
                </span>
              }
              <span className="flex font-poppins">
                Sub Total
                <p className="pl-7">${totalPrice.toFixed(2)}</p>
              </span>
              <Button onClick={handleOpenModal} className=" rounded-none w-max">Process to Checkout</Button>


              <ModalToBuy isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

