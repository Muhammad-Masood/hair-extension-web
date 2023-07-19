import prismadb from "@/lib/prismadb";
import { Decimal } from "@prisma/client/runtime";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export interface ProductValues{
    title: string
    desc: string
    price: Decimal
    isFeatured: Boolean
}

export async function POST(
    req:Request,
) {
    try{
        const body:ProductValues = await req.json();
        
        if(!body.title) return new NextResponse("Name is required");

        const product = await prismadb.product.create({
            data:{
                title:body.title,
                image:,
                desc:,
                price:,
                isFeatured: ,
                category: ,
                length: ,
                color: ,
                method: ,
                texture: ,
            }
        });
        return new Response(JSON.stringify(product));
    } catch(error){
        console.log(`[PRODUCTS_POST]`,error);
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
        console.log('[PRODUCTS_POST]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

