"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import { Product, User } from "@prisma/client";

export type OrderColumn = {
    id:number
    productId:number
    customerId:number
    //products:string
    //customer:string
    //totalPrice:string
    isPaid:boolean
    createdAt: string
}

export const columns:ColumnDef<OrderColumn>[] = [
    {
        accessorKey:"id",
        header:"Id"
    },
    {
        accessorKey:"name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
      accessorKey:"createdAt",
      header:"Date",
    },
    {
      accessorKey:"status",
      header:"Status",
    },
    {
        id:"actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]