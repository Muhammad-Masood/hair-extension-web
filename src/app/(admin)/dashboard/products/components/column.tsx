"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type ProductColumn = {
    id: number
    title:string
    desc:string
    price:string
    createdAt:string
    category: string
    length: number
    texture: string
    method: string
    color: string
}

export const columns:ColumnDef<ProductColumn>[] = [
    {
        accessorKey:"image",
        header:"Image"
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