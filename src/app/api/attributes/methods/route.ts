import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface MethodValues{
    name:string
}

export async function POST(
    req:Request,
) {
    try{
        const body:MethodValues = await req.json();
        if(!body.name) return new NextResponse("Name is required");

        const methodFound = await prismadb.method.findFirst({
            where: {
                name:body.name
            }
        });
        if(!methodFound){
        const method  = await prismadb.method.create({
            data:{
                name:body.name
            }
        });
        return new Response(JSON.stringify(method));
    }
    } catch(error){
        console.log(`[METHODS_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};


export async function GET(
    req: Request
){
    try{
        const methods = await prismadb.method.findMany();
        return NextResponse.json(methods);
    } catch(error){
        console.log('[METHDOS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

