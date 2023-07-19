import prismadb from "@/lib/prismadb"
import { OrdersClient } from "./components/client";
import { OrderColumn } from "./components/column";



export default async function Orders () {

    const orders = await prismadb.order.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <OrdersClient data={orders}/>
            </div>
        </div>
    )
}