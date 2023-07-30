"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductColumn } from "@/app/(admin)/dashboard/products/components/column";
import { Category,Image } from "@prisma/client";
import { formatter } from "@/lib/utils";
import ProductCard from "@/components/ui/productcard";

interface CategoryProps {
  params: {
    categoryName: string;
  };
}

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

const CategoryPage = ({params}:CategoryProps) => {

  const {categoryName} = params;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/products/category/${categoryName}`);
        const formattedProducts: ProductColumn[] = res.data.map((item:Products) => (
          {
            id: item.id,
            title: item.title,
            desc: item.desc,
            isFeatured: item.isFeatured,
            price: formatter.format(parseFloat(item.price)),
            imageUrl: item.images[0].url,
          }
        ));
        const categoryProducts: ProductColumn[] = formattedProducts.filter((product) => product.isFeatured).slice(0, 9);
        setProducts(categoryProducts);
      }
      catch (error) {
        console.log("CATEGORY_PRODUCTS_FETCH", error);
      }

    }
    fetchData();

  },[categoryName]);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8">{categoryName}</h2>
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

export default CategoryPage;