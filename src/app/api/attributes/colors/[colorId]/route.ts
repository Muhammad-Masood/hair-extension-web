import prismadb from "@/lib/prismadb";
import { data } from "autoprefixer";
import { ColorValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { colorId: string } }
    ) {

    try {
        const body: ColorValues = await req.json();
        console.log(body);
        const color = await prismadb.color.update({
            where: {
                id: params.colorId
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(color));
    }
    catch (error) {
        console.log('[COLOR_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{colorId:string}}){

        try{
            const color = await prismadb.color.delete({
                where:{
                    id: params.colorId
                }
            });

            return new Response(JSON.stringify(color));
        } catch(error){
            console.log(`[COLOR_DELETE]`,error);
        }
}