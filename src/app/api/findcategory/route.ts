import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

interface CategoryValues{
    name:string
}

export async function GET(req:Request){
    try{
        const body:CategoryValues = await req.json();

        const category = await prismadb.category.findFirst({
            where:{
                name:body.name
            }
        });
        if(category) return new Response(JSON.stringify(category)); 

    } catch(error){
        console.log('[FIND_CATEGORY]',error);
        return new NextResponse("Internal error", {status: 505});
    }
}