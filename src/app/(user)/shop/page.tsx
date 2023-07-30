"use client"
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/productcard';
import axios from 'axios';
import Link from 'next/link';
import { ProductColumn } from '@/app/(admin)/dashboard/products/components/column';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
// import Image from "next/image";
import { Category, Image } from '@prisma/client';

//   Route: api/products/category/${categoryId}   --> to get products of {categoryId}
// Show only featured products of each top 3 categories => 3 products per row => total 9 products on whole page

// Another Route to get all products of all categories
// Route: /api/products

interface Products {
  id:number
  title:string
  desc:string
  isFeatured:boolean
  price:string
  category:Category
  images:Image[]
  createdAt:Date
}

const Shop = () => {

  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/products');
        const formattedProducts: ProductColumn[] = res.data.map((item:Products) => (
          {
            id: item.id,
            title: item.title,
            desc: item.desc,
            isFeatured: item.isFeatured,
            price: formatter.format(parseFloat(item.price)),
            category: item.category.name,
            imageUrl: item.images[0].url,
          }
        ));
        const shopProducts: ProductColumn[] = formattedProducts.filter((product) => product.isFeatured).slice(0, 9);
        setProducts(shopProducts);
      }
      catch (error) {
        console.log("SHOP_PRODUCTS_FETCH", error);
      }

    }
    fetchData();

  }, []);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {products.map((p: ProductColumn) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;