"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type LengthColumn = {
    id:string
    name:number
}

export const columns:ColumnDef<LengthColumn>[] = [
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