"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
    id: number
    title:string
    desc:string
    imageUrl:string
    price:string
    createdAt:string
    category: string
    length?: number
    texture?: string
    method?: string
    color?: string
}

export const columns:ColumnDef<ProductColumn>[] = [
    {
        accessorKey:'imageUrl',
        header:"Image",
        cell: row =>{
          return(
          <div>
            <Image className="rounded-xl" src={row.row.original.imageUrl} alt="" width={40} height={40}></Image>
          </div>
          )
        }
        // cell(props) {
        //   <div className="">
        //   <Image src={props.row.original.imageUrl} alt={props.row.original.title}/>
        //   </div>
        // }
          
        // },: ({ cell: { value:any }}) => (
        //   <div className="blog-comments__avatar mr-3">
        //     <img
        //       src={require("../../images/avatars/" + value)} alt={value}
        //     />
        //   </div>
        // )
    },
    {
        accessorKey:"title",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
      accessorKey:"price",
      header:"Price",
    },
    {
      accessorKey:"createdAt",
      header:"Created At"
    },
    {
        id:"actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]