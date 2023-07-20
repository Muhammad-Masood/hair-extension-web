import prismadb from "@/lib/prismadb"
import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/column";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

export default async function Products () {

    const products = await prismadb.product.findMany(
        {
        include: {
            category: true,
            length: true,
            color: true,
            texture: true,
            method: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
    );

    console.log(products);

    const formattedProducts:ProductColumn[] = products.map((item)=>(
        {
            id: item.id,
            title: item.title,
            desc: item.desc,
            isFeatured: item.isFeatured,
            //isArchived: item.isArchived,
            price: formatter.format(item.price.toNumber()),
            category: item.category.name,
            length: item.length.name,
            color: item.color.name,
            texture: item.texture.name,
            method: item.method.name,
            createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }
    ));
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <ProductsClient data={formattedProducts}/>
            </div>
        </div>
    )
}