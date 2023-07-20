"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface ProductsClientProps {
    data: ProductColumn[]
}
export const ProductsClient:React.FC<ProductsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Products (${data.length})`} desc="Manage products for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/new`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
            </div>
            <Separator/>
            <DataTable  columns={columns} data={data} searchKey="name"/>
            <Separator/>
            <Heading title="API" desc="API Calls for Products"/>
            <Separator/>
            <ApiList name="products" idName="productId"/>
        </div>
    )
}