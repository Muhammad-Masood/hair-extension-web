"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface OrdersClientProps {
    data: OrderColumn[]
}
export const OrdersClient:React.FC<OrdersClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Orders (${data.length})`} desc="Manage orders for your store"/>
            </div>
            <Separator/>
            <DataTable  columns={columns} data={data} searchKey="name"/>
            <Separator/>
            <Heading title="API" desc="API Calls for Categories"/>
            <Separator/>
            <ApiList name="categories" idName="categoryId"/>
        </div>
    )
}