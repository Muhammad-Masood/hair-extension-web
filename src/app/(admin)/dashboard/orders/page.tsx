import prismadb from "@/lib/prismadb"
import { OrdersClient } from "./components/client";
import { OrderColumn } from "./components/column";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";



export default async function Orders () {

    const orders = await prismadb.order.findMany({
        orderBy:{
            createdAt:"desc",
        },
    });
    
    const formattedOrders:OrderColumn[] = orders.map((order)=>(
        {
            id:order.id,
            isPaid: order.isPaid,
            productId: order.productId,
            // totalPrice: formatter.format(order..reduce((total, item) => {
            //     return total + Number(item.product.price)
            //   }, 0)),
            customerId: order.customerId,
            createdAt: format(order.createdAt, 'MMMM do, yyyy'),
        }
    ));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <OrdersClient data={formattedOrders}/>
            </div>
        </div>
    )
}