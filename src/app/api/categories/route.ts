import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface CategoryValues{
    name:string
}

export async function POST(
    req:Request,
) {
    try{
        const body:CategoryValues = await req.json();
        if(!body.name) return new NextResponse("Name is required");

        const categoryFound = await prismadb.category.findFirst({
            where: {
                name:body.name
            }
        });
        if(!categoryFound){
        const category = await prismadb.category.create({
            data:{
                name:body.name
            }
        });
        return new Response(JSON.stringify(category));
    }
    } catch(error){
        console.log(`[CATEGORIES_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};


export async function GET(
    req: Request
){
    try{
        const categories = await prismadb.category.findMany();
        return NextResponse.json(categories);
    } catch(error){
        console.log('[CATEGORIES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

