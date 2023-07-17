"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./column"
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import {useRouter,usePathname} from "next/navigation";
import {useState} from "react"
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps{
    data: CategoryColumn;
}

export const CellAction:React.FC<CellActionProps> = ({
    data
}) => {

    const router = useRouter();
    const pathName = usePathname();
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    
    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/categories/${data.id}`,)
            toast.success("Category deleted");
            router.push("/dashboard/categories");
            router.refresh();
        } catch(error){
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return(
        <>
        <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {router.push(`${pathName}/${data.id}`)}}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
              
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}