"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { LengthColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface LengthsClientProps {
    data: LengthColumn[]
}
export const LengthClient:React.FC<LengthsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Length (${data.length})`} desc="Manage length for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/0`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
            </div>
            <Separator/>
            <DataTable  columns={columns} data={data} searchKey="name"/>
            <Separator/>
            <Heading title="API" desc="API Calls for Lengths"/>
            <Separator/>
            <ApiList name="lengths" idName="lengthId"/>
        </div>
    )
}