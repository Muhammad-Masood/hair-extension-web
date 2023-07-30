"use client"

import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CartContext, contextVal } from '../../../../../../context/CartContext';
import {useContext} from "react";
// import { Product } from '../../../../../../context/CartContext';
import Image from "next/image";

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

interface ProductPageProps {
  params: {
    productId: string; // Change 'slug' to 'productId'
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params: { productId } }) => {
  const router = useRouter();
  const { cartItems } = useContext(contextVal);
  const [product, setProduct] = React.useState<Product | null>(null);

  console.log({ cartItems });

  useEffect(() => {

  async function fetchData() {
    try {
      const res = await axios.get<Product>(`/api/products/${productId}`);
      console.log({ res });

      if (!res.data) {
        setProduct(null);
        router.push('/shop');
        return;
      }

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }

    fetchData();

  }, [productId,router]);

  if (!product) {
    return <h2>Data Not Found</h2>;
  }

  function handleAddToCart() {
    if (product) {
      // addToCart(product);
    } else {
      // Handle the case when product is not available, e.g., show an error message or do nothing.
      console.log('Product not available.');
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Image
              width={350}
              className="h-auto rounded-lg shadow-lg"
              src={product.img}
              alt={product.title}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p>{product.desc}</p>
            <p className="font-bold mt-4">${product.price}</p>
            <button
              className="mt-4 bg-amber-500 hover:bg-amber-600  font-semibold py-2 px-4 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
