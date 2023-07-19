import prismadb from "@/lib/prismadb"
import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/column";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";



export default async function Products () {

    const products = await prismadb.product.findMany();

    const formattedProducts = products.map((item)=>(
        {
            id:item.id,
            image:"",
            title:item.title,
            price:formatter.format(item.price.toNumber()),
            createdAt:format(item.createdAt,"MMMM do, yyyy"),
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