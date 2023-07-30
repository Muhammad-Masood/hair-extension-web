import prismadb from "@/lib/prismadb";
// import {  } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { trainingId: string } }
    ) {

    try {
        const body = await req.json();
        const { url,price } = body;
        console.log(body);
        const video = await prismadb.training.update({
            where: {
                id: +(params.trainingId)
            },
            data: {
                url,
                price,
            }
        });

        return new Response(JSON.stringify(video));
    }
    catch (error) {
        console.log('[TRAINING_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{trainingId:string}}){

        try{
            const video = await prismadb.training.delete({
                where:{
                    id: +(params.trainingId),
                },
            });

            return new Response(JSON.stringify(video));
        } catch(error){
            console.log(`[TRAINING_DELETE]`,error);
        }
}

export async function GET (req:Request,
    {params} : {params:{trainingId:string}}){

        try{
            const video = await prismadb.training.findUnique({
                where:{
                    id: +(params.trainingId),
                },
            });

            return new Response(JSON.stringify(video));
        } catch(error){
            console.log(`[SPECIFIC_PRODUCT_GET]`,error);
        }
}