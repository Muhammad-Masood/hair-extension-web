import prismadb from "@/lib/prismadb";
import { CategoryForm } from "../components/texture-form"


const CategoryPage = async ({params}:{params:{categoryId:string}}) => {
    const cId:number = +(params.categoryId);
    const category = await prismadb.category.findUnique({
        where:{
            id:cId
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category}/>
            </div>
        </div>
    );
}

export default CategoryPage;