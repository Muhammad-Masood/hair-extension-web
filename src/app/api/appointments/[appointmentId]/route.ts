import prismadb from "@/lib/prismadb";
// import {  } from "../route";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { appointmentId: string } }
    ) {

    try {
        const body = await req.json();
        const { title, price, desc, duration } = body;
        const appointment = await prismadb.appointment.update({
            where: {
                id: +(params.appointmentId)
            },
            data: {
                title,
                desc,
                price,
                duration
            }
        });

        return new Response(JSON.stringify(appointment));
    }
    catch (error) {
        console.log('[APPOINTMENT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE (req:Request,
    {params} : {params:{appointmentId:string}}){

        try{
            const appointment = await prismadb.appointment.delete({
                where:{
                    id: +(params.appointmentId),
                },
            });

            return new Response(JSON.stringify(appointment));
        } catch(error){
            console.log(`[APPOINTMENT_DELETE]`,error);
        }
}

export async function GET (req:Request,
    {params} : {params:{appointmentId:string}}){

        try{
            const appointment = await prismadb.appointment.findUnique({
                where:{
                    id: +(params.appointmentId),
                },
            });

            return new Response(JSON.stringify(appointment));
        } catch(error){
            console.log(`[SPECIFIC_APPOINTMENT_GET]`,error);
        }
}