import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";



export async function POST(
    req: Request
){
    try{
        const body = await req.json();
        // {} = body;
        // const orders = await prismadb.order.create({
        //     data:{

        //     }
        // });
        // return new Response(JSON.stringify(orders));
    } catch(error){
        console.log('[ORDERS_POST]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function GET(
    req: Request
){
    try{
        const orders = await prismadb.order.findMany();
        return NextResponse.json(orders);
    } catch(error){
        console.log('[ORDERS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};
