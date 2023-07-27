"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalToBuy from '@/components/modals/ModalToBuy';
import { useRouter } from 'next/navigation'

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
}


//   Route:  /api/products/${productId}
//   Displays one product on whole page


// const product = {
//   id: 3,
//   title: "Crystal Hair Remover",
//   desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima consequuntur perferendis sapiente maxime, veniam ut incidunt nobis. Id perspiciatis, cumque sequi eius fugiat accusamus incidunt eligendi ad distinctio assumenda minima!",
//   price: "123",
//   isFeatured: true,
//   categoryId: "5",
//   colorId: "0",
//   lengthId: "0",
//   textureId: "0",
//   methodId: "0",
//   createdAt: "2023-07-20T11:38:18.060Z",
//   updatedAt: "2023-07-20T11:38:18.060Z",
//   img: "https://images.pexels.com/photos/9909784/pexels-photo-9909784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

// }

const ProductPage = ({ params: { productId } }: { params: { productId: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()


  const [product, setProduct] = useState({ img: "", title: "", desc: "", price: "" })

  console.log({ product });


  const handleBuyProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  async function fetchData() {
    try {
      const res = await axios.get(`/api/products/${productId}`)

      console.log({ res });

      if (!res.data) {
        setProduct({ img: "", title: "", desc: "", price: "" })
        router.push('/shop/products')
        return
      }

      setProduct(res.data)
    } catch (error) {
      console.log(error);
    }
    // return res.json()
  }

  useEffect(() => {
    fetchData()
  }, [])
  !product?.title && <h2>Data Not Found</h2>
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <img
              width={350}
              className="h-auto rounded-lg shadow-lg"
              src={product?.img} // Replace with the actual product image URL
              alt={product?.title}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{product?.title}</h2>
            <p>{product?.desc}</p>
            <p className="font-bold mt-4">${product?.price}</p>
            <button
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleBuyProduct}
            >
              Buy Product
            </button>
            <ModalToBuy isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
