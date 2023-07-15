// import { compare } from "bcrypt";

// interface requestBody {
//     email:string,
//     password:string
// }

// export const Post = async (req:Request) => {
//     const body:requestBody = await req.json();
    
//     if(body.email == process.env.ADMIN_EMAIL && await compare(body.password, (process.env.ADMIN_PASS) as string)){
//         console.log("Admin!");
//     }
// }