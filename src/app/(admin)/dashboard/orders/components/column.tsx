"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import { Product, User } from "@prisma/client";
import prismadb from "@/lib/prismadb";

export type OrderColumn = {
    id:number
    // productId:number
    product: string
   //customerId:number
    // productTitle:string
    //customer:string
    // totalPrice:string
    createdAt: string
}

export const columns:ColumnDef<OrderColumn>[] = [
    {
        accessorKey:"id",
        header:"Id"
    },
    {
        accessorKey:"productId",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Order
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
      accessorKey:"createdAt",
      header:"Date",
    },
    // {
    //   accessorKey:"totalPrice",
    //   header:"Total",
    // },
    {
        id:"actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]