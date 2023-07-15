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
