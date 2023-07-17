import prismadb from "@/lib/prismadb";
import { CategoryForm } from "../components/category-form"


const CategoryPage = async ({params}:{params:{categoryId:string}}) => {
    const cId:number = +(params.categoryId);
    const category = await prismadb.category.findUnique({
        where:{
            id:cId
        }
    })
    return(
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <CategoryForm initialData={category}/>
            </div>
        </div>
    );
}

export default CategoryPage;