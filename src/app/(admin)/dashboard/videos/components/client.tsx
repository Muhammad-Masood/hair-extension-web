"use client"

import { ApiList } from "@/components/admin/ui/api-list"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { VideoColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

interface VideosClientProps {
    data: VideoColumn[]
}
export const VideosClient:React.FC<VideosClientProps> = ({
    data
}) => {
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <Heading title={`Videos (${data.length})`} desc="Manage videos for your store"/>
            <Button onClick={()=>{router.push(`${pathName}/0`)}}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
                </Button>
            </div>
            <Separator/>
            <DataTable  columns={columns} data={data} searchKey=""/>
            <Separator/>
            {/* <Heading title="API" desc="API Calls for Textures"/>
            <Separator/> */}
            {/* <ApiList name="videos" idName="textureId"/> */}
        </div>
    )
}