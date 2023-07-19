import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface LengthValues{
    name:number
}

export async function POST(
    req:Request,
) {
    try{
        const body:LengthValues = await req.json();
        if(!body.name) return new NextResponse("Name is required");

        const lengthFound = await prismadb.length.findFirst({
            where: {
                name:body.name
            }
        });
        if(!lengthFound){
        const category = await prismadb.length.create({
            data:{
                name:body.name
            }
        });
        return new Response(JSON.stringify(length));
    }
    } catch(error){
        console.log(`[LENGTH_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};


export async function GET(
    req: Request
){
    try{
        const lengths = await prismadb.length.findMany();
        return NextResponse.json(lengths);
    } catch(error){
        console.log('[LENGTH_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

