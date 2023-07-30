"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CartContext, contextProduct, contextVal } from '../../../../../../context/CartContext';
import {useContext} from "react";
// import { Product } from '../../../../../../context/CartContext';
import Image from "next/image";
import { ProductColumn } from '@/app/(admin)/dashboard/products/components/column';

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

const ProductPage: React.FC<ProductPageProps> = ( {params} : ProductPageProps) => {

  const {productId} = params;
  const {cartProducts,setCartProducts} = useContext(contextProduct);
  const { cartItems,setCartItems } = useContext(contextVal);
  const [quantity,setQuantity] = useState(1);
  const [product, setProduct] = React.useState<ProductColumn | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        if(res){
        setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
      fetchData();
    }, [productId]);

    const addToCart = () => {
      if(product){
      const p = {
        id: product.id,
        name: product.title,
        quantity: quantity,
        subTotal: product.price,
        image: product.imageUrl,
        price: product.price,
        category: product.category
      }
      setCartItems(cartItems + quantity);
      setCartProducts([...cartProducts, p]);
      console.log("cartItems", cartProducts);
    }
    }
 

  if (!product) {
    return <h2>Data Not Found</h2>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Image
              width={350}
              className="h-auto rounded-lg shadow-lg"
              src={product.imageUrl}
              alt={product.title}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p>{product.desc}</p>
            <p className="font-bold mt-4">${product.price}</p>
            <button
              className="mt-4 bg-amber-500 hover:bg-amber-600  font-semibold py-2 px-4 rounded"
              onClick={addToCart}
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
