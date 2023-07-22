import prismadb from "@/lib/prismadb";
// import {  } from "../route";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{courseId:number}}
){
    try{
        const courses = await prismadb.product.findMany({
            where:{
                category:{
                    name:"Courses"
                },
                id: params.courseId
            }
        });
        return NextResponse.json(courses);
    } catch(error){
        console.log('[COURSES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};