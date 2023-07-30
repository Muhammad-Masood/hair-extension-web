import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function POST(
    req:Request,
) {
    try{
        const body = await req.json();
        const {url,price} = body;
        if(!url) return new NextResponse("Url is required");
        if(!price) return new NextResponse("Price is required");

        const video = await prismadb.training.create({
            data:{
                url,
                price
            }
        });
        return new Response(JSON.stringify(video));
    } catch(error){
        console.log(`[VIDEOS_POST]`,error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
};

export async function GET(
    req: Request
){
    try{
        const videos = await prismadb.training.findMany();
        return NextResponse.json(videos);
    } catch(error){
        console.log('[VIDEOS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};
