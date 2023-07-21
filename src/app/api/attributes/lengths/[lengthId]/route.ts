import prismadb from "@/lib/prismadb";
import { LengthValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { lengthId: string } }
    ) {

    try {
        const body: LengthValues = await req.json();
        console.log(body);
        const length = await prismadb.length.update({
            where: {
                id: params.lengthId
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(length));
    }
    catch (error) {
        console.log('[LENGTH_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{lengthId:string}}){

        try{
            const length = await prismadb.length.delete({
                where:{
                    id: params.lengthId
                }
            });

            return new Response(JSON.stringify(length));
        } catch(error){
            console.log(`[LENGTH_DELETE]`,error);
        }
}