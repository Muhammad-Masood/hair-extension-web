import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
const ProductCard = ({ props }:{props:{product:Product}}) => {
    console.log(props.product);

    return (
        <div className="max-w-sm bg-transparent text-black border-gray-700 border  rounded-lg shadow">
            <a href="#">
                <img className="w-full h-64 object-cover rounded-t-lg" src="" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {props.product.title}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {props.product.desc}
                </p>

                <Link href={`/shop/products/${props.product.id}`}>
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

    );
};

export default ProductCard;
