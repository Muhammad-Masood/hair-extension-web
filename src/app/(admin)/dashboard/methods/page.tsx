import prismadb from "@/lib/prismadb"
import { MethodsClient } from "./components/client";
import { MethodColumn } from "./components/column";



export default async function Categories () {

    const methods = await prismadb.method.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <MethodsClient data={methods}/>
            </div>
        </div>
    )
}