"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type TextureColumn = {
    id:number
    name:string
}

export const columns:ColumnDef<TextureColumn>[] = [
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
        id:"actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]