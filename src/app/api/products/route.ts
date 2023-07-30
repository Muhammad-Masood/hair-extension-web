import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

// export interface ProductValues{
//     title: string
//     desc: string
//     price: Decimal

//     isFeatured: Boolean
// }

export async function POST(
    req:Request,
) {
    try{
        const body = await req.json();
        const { images, title, price, categoryId, desc, colorId, lengthId, methodId,textureId, isFeatured } = body;
        if(!title) return new NextResponse("Name is required");
        if(!images) return new NextResponse("Image is required");
        if(!price) return new NextResponse("Price is required");
        if(!categoryId) return new NextResponse("Category is required");
        if(!desc) return new NextResponse("Description is required");

        const product = await prismadb.product.create({
            data:{
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
            },
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
        const products = await prismadb.product.findMany({
            include:{
                category:true,
                images:true
            }
        });
        return NextResponse.json(products);
    } catch(error){
        console.log('[PRODUCTS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

