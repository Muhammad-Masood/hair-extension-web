"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface CategoriesClientProps {
    length: number
}
export const CategoriesClient:React.FC<CategoriesClientProps> = ({
    length
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex justify-between">
            <Heading title={`Categories (${length})`} desc="Manage categories for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/category-page`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
            </div>
            <Separator/>
            <Heading title="API" desc="API Calls for Categories"/>
            <Separator/>
            <ApiList name="categories" idName="categoryId"/>
        </div>
    )
}