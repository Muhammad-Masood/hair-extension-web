import prismadb from "@/lib/prismadb";
import { data } from "autoprefixer";
import { CategoryValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string } }
    ) {

    try {
        const body: CategoryValues = await req.json();
        console.log(body);
        const category = await prismadb.category.update({
            where: {
                id: params.categoryId
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(category));
    }
    catch (error) {
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{categoryId:string}}){

        try{
            const category = await prismadb.category.delete({
                where:{
                    id: params.categoryId
                }
            });

            return new Response(JSON.stringify(category));
        } catch(error){
            console.log(`[CATEGORY_DELETE]`,error);
        }
}

export async function GET (req:Request,
    {params} : {params:{categoryId:string}}){

        try{
            const category = await prismadb.category.findUnique({
                where:{
                    id: params.categoryId
                }
            });

            return new Response(JSON.stringify(category));
        } catch(error){
            console.log(`[SPECIFIC_CATEGORY_GET]`,error);
        }
}