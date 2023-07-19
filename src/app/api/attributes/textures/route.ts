import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface TextureValues{
    name:string
}

export async function POST(
    req:Request,
) {
    try{
        const body:TextureValues = await req.json();
        if(!body.name) return new NextResponse("Name is required");

        const textureFound = await prismadb.texture.findFirst({
            where: {
                name:body.name
            }
        });
        if(!textureFound){
        const texture = await prismadb.texture.create({
            data:{
                name:body.name
            }
        });
        return new Response(JSON.stringify(texture));
    }
    } catch(error){
        console.log(`[TEXTURES_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};


export async function GET(
    req: Request
){
    try{
        const textures = await prismadb.texture.findMany();
        return NextResponse.json(textures);
    } catch(error){
        console.log('[TEXTURES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

