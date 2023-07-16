import prismadb from "@/lib/prismadb"
import { CategoriesClient } from "./components/client";



export default async function Categories () {

    const categories = await prismadb.category.findMany();
    
    
    return(
        <div>
            <CategoriesClient length={categories.length}/>
        </div>
    )
}