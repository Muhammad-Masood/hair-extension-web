import prismadb from "@/lib/prismadb"
import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/column";



export default async function Categories () {

    const categories = await prismadb.category.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <CategoriesClient data={categories}/>
            </div>
        </div>
    )
}