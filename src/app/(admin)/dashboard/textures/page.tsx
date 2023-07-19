import prismadb from "@/lib/prismadb"
import { TexturesClient } from "./components/client";
import { TextureColumn } from "./components/column";



export default async function Texture () {

    const textures = await prismadb.texture.findMany();
    
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <TexturesClient data={textures}/>
            </div>
        </div>
    )
}