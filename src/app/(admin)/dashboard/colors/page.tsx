import prismadb from "@/lib/prismadb"
import { ColorsClient } from "./components/client";
import { ColorColumn } from "./components/column";



export default async function Colors () {

    const colors = await prismadb.color.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <ColorsClient data={colors}/>
            </div>
        </div>
    )
}