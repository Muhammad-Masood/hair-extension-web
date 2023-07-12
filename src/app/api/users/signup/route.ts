// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// import prismadb from "@/lib/prismadb";

// export async function GET() {
//     const users = await prismadb.user.findMany();
//     await new Response(JSON.stringify(users));
//     console.log(users);
// }

// // export const prisma = new PrismaClient();

// // export default async(req:NextApiRequest, res:NextApiResponse) => {
// //     if(req.method !== 'POST'){
// //         return res.status(405).json({message: "Method not allowed"});
// //     }

// //     const userData = JSON.parse(req.body);
// //     const user = await prisma.user.create({
// //         data: userData
// //     });

// //     res.json(user);
// // }


import prismadb from "@/lib/prismadb";
import bcrypt from 'bcrypt'

interface RequestBody {
    name: string;
    email: string;
    password: string;
  }

export async function POST(req: Request){
    const body: RequestBody = await req.json();

    const user = await prismadb.user.create({
        data:{
            name: body.name,
            email:  body.email,
            password: await bcrypt.hash(body.password,12)
        }
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result));
}