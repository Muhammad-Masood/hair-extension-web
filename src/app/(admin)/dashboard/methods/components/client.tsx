"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface CategoriesClientProps {
    data: CategoryColumn[]
}
export const CategoriesClient:React.FC<CategoriesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Categories (${data.length})`} desc="Manage categories for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/0`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
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