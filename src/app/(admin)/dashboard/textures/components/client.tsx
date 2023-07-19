"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { TextureColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface TexturesClientProps {
    data: TextureColumn[]
}
export const TexturesClient:React.FC<TexturesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Textures (${data.length})`} desc="Manage textures for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/0`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
            </div>
            <Separator/>
            <DataTable  columns={columns} data={data} searchKey="name"/>
            <Separator/>
            <Heading title="API" desc="API Calls for Textures"/>
            <Separator/>
            <ApiList name="textures" idName="textureId"/>
        </div>
    )
}