import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(
    req: Request
){
    try{
        const courses = await prismadb.product.findMany({
            where:{
                category:{
                    name:"Courses"
                }
            }
        });
        return NextResponse.json(courses);
    } catch(error){
        console.log('[COURSES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

