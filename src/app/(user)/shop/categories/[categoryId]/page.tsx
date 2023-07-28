"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface CategoryProps {
  params: {
    categoryId: string;
  };
}

const Category = ({ params }: CategoryProps) => {
  const { categoryId } = params;

  const [products, setProducts] = useState<Product[]>([]);

  console.log({ products });


  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products/category/${categoryId}`);
      const prods: Product[] = response.data;
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8">Products For {categoryId}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products?.map((product: Product) => {
            return  (
              <div
                key={product.categoryId}
                className="max-w-sm bg-transparent text-black dark:text-white border-gray-700 border rounded-lg shadow"
              >
                <a href="#">
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src="https://images.pexels.com/photos/10427811/pexels-photo-10427811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight">
                    {product.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Category:{" "}
                    <Link href={`/shop/categories/${product.categoryId}`}>
                      {product.categoryId}
                    </Link>
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {product.desc}
                  </p>

                  <Link href={`/shop/products/${product?.id}`}>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-600 hover:bg-amber-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>

            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
