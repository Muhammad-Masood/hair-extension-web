import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface ColorValues{
    name:string
}

export async function POST(
    req:Request,
) {
    try{
        const body:ColorValues = await req.json();
        if(!body.name) return new NextResponse("Name is required");

        const colorFound = await prismadb.color.findFirst({
            where: {
                name:body.name
            }
        });
        if(!colorFound){
        const color = await prismadb.color.create({
            data:{
                name:body.name
            }
        });
        return new Response(JSON.stringify(color));
    }
    } catch(error){
        console.log(`[COLORS_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};


export async function GET(
    req: Request
){
    try{
        const colors = await prismadb.color.findMany();
        return NextResponse.json(colors);
    } catch(error){
        console.log('[COLORS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

