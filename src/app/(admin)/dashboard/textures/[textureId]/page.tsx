import prismadb from "@/lib/prismadb";
import { TextureForm } from "../components/texture-form"


const CategoryPage = async ({params}:{params:{textureId:string}}) => {
    const texture = await prismadb.category.findUnique({
        where:{
            id:params.textureId
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TextureForm initialData={texture}/>
            </div>
        </div>
    );
}

export default CategoryPage;