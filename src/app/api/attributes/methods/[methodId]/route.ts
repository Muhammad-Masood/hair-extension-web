import prismadb from "@/lib/prismadb";
import { data } from "autoprefixer";
import { MethodValues } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { methodId: string } }
    ) {

    try {
        const body: MethodValues = await req.json();
        console.log(body);
        const method = await prismadb.method.update({
            where: {
                id: +(params.methodId)
            },
            data: {
                name: body.name
            }
        });

        return new Response(JSON.stringify(method));
    }
    catch (error) {
        console.log('[METHOD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{methodId:string}}){

        try{
            const method = await prismadb.method.delete({
                where:{
                    id: +(params.methodId)
                }
            });

            return new Response(JSON.stringify(method));
        } catch(error){
            console.log(`[METHOD_DELETE]`,error);
        }
}