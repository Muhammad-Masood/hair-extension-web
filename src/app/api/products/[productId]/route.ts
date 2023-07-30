import prismadb from "@/lib/prismadb";
// import {  } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
    ) {

    try {
        const body = await req.json();
        const { images, title, price, categoryId, desc, colorId, lengthId, methodId,textureId, isFeatured } = body;
        console.log(body);
        const product = await prismadb.product.update({
            where: {
                id: +(params.productId)
            },
            data: {
                title,
                desc,
                price,
                isFeatured,
                categoryId,
                lengthId,
                colorId,
                methodId,
                textureId,
                images:{
                    createMany:{
                        data: [
                            ...images.map((image:{url:string})=>image),
                        ],
                    },
                },
            }
        });

        return new Response(JSON.stringify(product));
    }
    catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{productId:string}}){

        try{
            const product = await prismadb.product.delete({
                where:{
                    id: +(params.productId),
                },
            });

            return new Response(JSON.stringify(product));
        } catch(error){
            console.log(`[PRODUCT_DELETE]`,error);
        }
}

export async function GET (req:Request,
    {params} : {params:{productId:string}}){

        try{
            const product = await prismadb.product.findUnique({
                include:{
                    category:true,
                    images:true,
                    color:true,
                    length:true,
                    texture:true,
                    method:true
                },
                where:{
                    id: +(params.productId),
                },
            });

            return new Response(JSON.stringify(product));
        } catch(error){
            console.log(`[SPECIFIC_PRODUCT_GET]`,error);
        }
}