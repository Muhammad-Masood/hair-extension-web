import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: {
        strategy:'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign In',
            credentials: {
                email:{
                    label: 'Email',
                    type: 'email',
                    placeholder: 'user@xyz.com',
                },
                password:{
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials){
                const user = { id: '1', name: 'Masood', email: 'test@test.com'}
                return user;
                // const {email,password} = credentials as {
                //     email:string; 
                //     password:string;
                // };

            //     if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) throw new Error("Invalid Cred");

            // return {id:process.env.ADMIN_PASS,name:'admin', email:process.env.ADMIN_EMAIL}
            },
        }),
    ],
    // pages: {
    //     signIn: "/auth/signin",
    // }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }