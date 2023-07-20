import prismadb from "@/lib/prismadb";
import { data } from "autoprefixer";
import { TextureValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { textureId: string } }
    ) {

    try {
        const body: TextureValues = await req.json();
        console.log(body);
        const texture = await prismadb.texture.update({
            where: {
                id: params.textureId
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(texture));
    }
    catch (error) {
        console.log('[TEXTURE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{textureId:string}}){

        try{
            const texture = await prismadb.texture.delete({
                where:{
                    id: params.textureId
                }
            });

            return new Response(JSON.stringify(texture));
        } catch(error){
            console.log(`[TEXTURE_DELETE]`,error);
        }
}