"use client"


import React, { useEffect } from "react";
import axios from "axios";
import { useCartContext } from "../../../../../../context/ContextForCart";
import { ProductColumn } from "@/app/(admin)/dashboard/products/components/column";
import Image from "next/image";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params: { productId } }) => {
  const { addToCart } = useCartContext();

  const [product, setProduct] = React.useState<ProductColumn | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        if (res) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [productId]);

  if (!product) {
    return <h2>Data Not Found</h2>;
  }

  function handleAddToCart() {
    addToCart(product);
    // router.push('/cart');
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/4 p-4">
            <div className="mb-4">
              <Image
                width={350}
                height={350}
                className="h-auto rounded-lg shadow-lg"
                src={product.images[0].url}
                alt={product.title}
              />
            </div>

          </div>
          <div className="w-full md:w-2/4 p-4">
            <div className="md:pl-8">
              <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
              <p className="text-gray-600 text-lg mb-4">{product.desc}</p>
              <p className="font-bold text-2xl">${product.price}</p>
              <button
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        </div> */}
      </div>
    </section>
  );
};

export default ProductPage;
