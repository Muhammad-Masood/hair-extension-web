import { ProductColumn } from '@/app/(admin)/dashboard/products/components/column';
import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { Button } from './button';
import { Separator } from './separator';

interface ProductCardProps {
  product: ProductColumn
}

const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {

  return (
    <div className="w-72 min-h-[120px] bg-transparent text-black border-gray-700 border  rounded-lg shadow-2xl hover:shadow-black dark:hover:shadow-gray-700">
      <Link href={`/shop/products/${product.id}`} >
        <Image className="object-cover rounded-t-lg" src={product.imageUrl} width={286} height={286} alt="product_image" />
        <div className="p-5 min-h-120">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden whitespace-nowrap">
            {product.title}
          </h5>
          <p className="overflow-hidden whitespace-nowrap mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.desc}
          </p>
          <p className='text-2xl dark:text-white font-semibold'>{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
