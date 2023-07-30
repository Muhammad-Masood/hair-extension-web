import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function POST(
    req: Request
){
    try{
        const body = await req.json();
        const {product,customer,appointment} = body;
        const order = await prismadb.order.create({
            data:{
                product,
                customer,
                appointment
            }
        });
        return new Response(JSON.stringify(order));
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
