"use client"
import React , {useState, useEffect}from 'react';
import ProductCard from '@/components/ui/productcard';
import axios from 'axios';
import Link from 'next/link';

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
  img: string
}

interface ProductspageProps {
  products: Product[];
}


// const products: Product[] = [
//   {
//     id: 1,
//     title: "Crystal Hair Remover",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima consequuntur perferendis sapiente maxime, veniam ut incidunt nobis. Id perspiciatis, cumque sequi eius fugiat accusamus incidunt eligendi ad distinctio assumenda minima!",
//     price: "23",
//     isFeatured: true,
//     categoryId: "5",
//     colorId: "0",
//     lengthId: "0",
//     textureId: "0",
//     methodId: "0",
//     createdAt: "2023-07-20T11:38:18.060Z",
//     updatedAt: "2023-07-20T11:38:18.060Z",
//     img: "https://images.pexels.com/photos/9909784/pexels-photo-9909784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     id: 2,
//     title: "Crystal Hair Remover",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima consequuntur perferendis sapiente maxime, veniam ut incidunt nobis. Id perspiciatis, cumque sequi eius fugiat accusamus incidunt eligendi ad distinctio assumenda minima!",
//     price: "213213",
//     isFeatured: true,
//     categoryId: "5",
//     colorId: "0",
//     lengthId: "0",
//     textureId: "0",
//     methodId: "0",
//     createdAt: "2023-07-20T11:38:18.060Z",
//     updatedAt: "2023-07-20T11:38:18.060Z",
//     img: "https://images.pexels.com/photos/10427811/pexels-photo-10427811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     id: 3,
//     title: "Crystal Hair Remover",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima consequuntur perferendis sapiente maxime, veniam ut incidunt nobis. Id perspiciatis, cumque sequi eius fugiat accusamus incidunt eligendi ad distinctio assumenda minima!",
//     price: "23",
//     isFeatured: true,
//     categoryId: "5",
//     colorId: "0",
//     lengthId: "0",
//     textureId: "0",
//     methodId: "0",
//     createdAt: "2023-07-20T11:38:18.060Z",
//     updatedAt: "2023-07-20T11:38:18.060Z",
//     img: "https://images.pexels.com/photos/13573917/pexels-photo-13573917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   }
// ]

const productspage: React.FC<ProductspageProps> = () => {


  const [products, setProducts] = useState<Product[]>([])

  const fetchData = async () => {
    const response = await axios.get('/api/products');
    const prods: Product[] = response.data;
  
    setProducts(prods)
    console.log(response.data);
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products?.map((product: Product) => (

            <div key={product.categoryId} className="max-w-sm bg-transparent text-black border-gray-700 border  rounded-lg shadow">
              <a href="#">
                <img className="w-full h-64 object-cover rounded-t-lg" src={product.img} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {product.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {product.desc}
                </p>

                <Link href={`/shop/products/${product?.id}`}>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-600 hover:bg-amber-500 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800">
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

          ))}
        </div>
      </div>
    </section>
  );
};

// export async function getServerSideProps() {
//   try {
//     // Fetch data from the API
//     const response = await axios.get('/api/products');
//     const products: Product[] = response.data;
  
//     console.log(response.data);
    

//     return {
//       props: {
//         products,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// }

export default productspage;
