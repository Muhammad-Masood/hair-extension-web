import prismadb from "@/lib/prismadb"
import { LengthClient } from "./components/client";
import { LengthColumn } from "./components/column";



export default async function Lengths () {

    const lengths = await prismadb.length.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <LengthClient data={lengths}/>
            </div>
        </div>
    )
}