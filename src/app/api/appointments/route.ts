import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export const POST = async (req:Request) => {
    try{
        const body = await req.json();
        const {title,desc,price,duration} = body;
        if(!title) return new NextResponse("Title is required");
        if(!desc) return new NextResponse("Description is required");
        if(!price) return new NextResponse("Price is required");
        if(!duration) return new NextResponse("Duration is required");
        const appointment = await prismadb.appointment.create({
            data:{
                title,
                desc,
                price,
                duration
            }
        });
        return new Response(JSON.stringify(appointment));
    } catch(err){
        console.log(`[APPOINTMENT_POST]`,err);
        return new NextResponse("Internal Error",{ status: 500 });
    }
}

export async function GET(
    req: Request
){
    try{
        const appointments = await prismadb.appointment.findMany();
        return NextResponse.json(appointments);
    } catch(error){
        console.log('[APPOINTMENTS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};