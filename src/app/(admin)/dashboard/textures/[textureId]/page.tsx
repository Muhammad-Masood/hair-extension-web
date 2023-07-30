import prismadb from "@/lib/prismadb";
import { TextureForm } from "../components/texture-form"


const TexturePage = async ({params}:{params:{textureId:string}}) => {
    const texture = await prismadb.texture.findUnique({
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

export default TexturePage;