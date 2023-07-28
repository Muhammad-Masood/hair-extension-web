"use client"

import React, { useState } from 'react';


import { useCart } from '../../../../context/CartContext';
import ModalToBuy from '@/components/modals/ModalToBuy';

interface Product {
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
  img: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();



  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12">


        <div className="flex mt-2 ">
          <div>
            <h2 className="text-3xl font-bold mb-2">Cart</h2>
            <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {cartItems.length > 0 &&
            <div className='ml-auto  inline-flex '>
              <button
                className="mt-4 bg-amber-500 hover:bg-amber-600 font-semibold px-4 rounded"
                onClick={handleOpenModal}>
                Proceed to Checkout
              </button>
              <ModalToBuy isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          }

        </div>
        {cartItems.length === 0 ? (
          <p className='mt-4'>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans mt-4">
            {cartItems.map((item: CartItem) => {
              const { id, title, price, desc, img } = item.product
              const { quantity } = item

              return (
                <>

                  <div key={id} className="max-w-sm bg-transparent border-gray-700 border  rounded-lg shadow">
                    <a href="#">
                      <img className="w-full h-64 object-cover rounded-t-lg" src="https://images.pexels.com/photos/10427811/pexels-photo-10427811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">
                          {title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal">
                        {desc}
                      </p>

                      <p className="mb-3 font-normal">
                        $ {price}
                      </p>

                      <div className="flex mt-2 ">
                        <button
                          className="bg-green-500 hover:bg-green-600 font-semibold py-1 px-2 rounded"
                          onClick={() => increaseQuantity(id)}
                        >
                          +
                        </button>
                        <button className="px-3">{quantity}</button>
                        <button
                          className="bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 rounded"
                          onClick={() => decreaseQuantity(id)}
                        >
                          -
                        </button>
                        <button
                          className="ml-auto text-white inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-red-600 hover:bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                          onClick={() => removeFromCart(id)}
                        >
                          Remove
                          <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 6h-4l-1-1m-5 0L9 6H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zm-1 11H6m8 0h1m3 0h1M6 12h12"
                            />
                          </svg>
                        </button>

                      </div>

                    </div>
                  </div>
                </>

              )
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
