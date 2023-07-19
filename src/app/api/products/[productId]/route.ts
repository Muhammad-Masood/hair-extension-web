import prismadb from "@/lib/prismadb";
import { ProductValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
    ) {

    try {
        const body: ProductValues = await req.json();
        console.log(body);
        const product = await prismadb.product.update({
            where: {
                id: +(params.productId)
            },
            data: {
                title: body.title
            }
        });

        return new Response(JSON.stringify(product));
    }
    catch (error) {
        console.log('[PRODUCTS_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{productId:string}}){

        try{
            const product = await prismadb.product.delete({
                where:{
                    id: +(params.productId)
                }
            });

            return new Response(JSON.stringify([product]));
        } catch(error){
            console.log(`[PRODUCTS_DELETE]`,error);
        }
}