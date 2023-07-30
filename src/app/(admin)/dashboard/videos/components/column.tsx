"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type VideoColumn = {
  id: number
  url: string
  price: string
  createdAt: string
}

export const columns: ColumnDef<VideoColumn>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "url",
    header: "Url"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "createdAt",
    header: "Created At"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]