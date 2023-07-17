import prismadb from "@/lib/prismadb"
import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/column";



export default async function Categories () {

    const categories = await prismadb.category.findMany();
    const formattedCategories: CategoryColumn[] = categories.map((category)=>(
        {
            id: category.id,
            name:category.name
        }
    ));
    
    return(
        <div>
            <CategoriesClient data={formattedCategories}/>
        </div>
    )
}