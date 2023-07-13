import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session: {  
        strategy:'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
         CredentialsProvider({
            type:"credentials",
            credentials: {
                  email: { label: "Email", type: "email" },
                  password: { label: "Password", type: "password"},
            },
            
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid Credentials");
                  }
                  console.log(credentials.email,credentials.password)
                const user = await prismadb.user.findFirst({
                    where: {
                        email: credentials?.email,
                    }
                });
                if(!user || !await compare(credentials.password,user.password)){
                    return null;
                };
                return {id: user.id.toString(), name:user.name, email:user.email, role:user.role};
            },
        }), 
    ],
    
    callbacks: {
        session: ({ session, token }) => {
            return {
              ...session,
              user: {
                ...session.user,
                id: token.id,
                role: token.role,
              },
            };
        },

        jwt: ({ token, user }) => {
            if (user) {
              const u = user as unknown as any;
              return {
                ...token,
                id: u.id,
                role: u.role,
              };
            }
            return token;
          },

        // async jwt( {token,user} :{token:any,user:any}) {
        //     const dbUser = await prismadb.user.findFirst({
        //         where: {
        //             email: token.email,
        //         },
        //     })
        //     if(!dbUser){
        //         token.id = user!.id
        //         return token
        //     }
    
        //     return {
        //         id:dbUser.id,
        //         name: dbUser.name,
        //         email: dbUser.email,
        //         role: dbUser.role,
        //     }
        // },
    },
    theme: {
        colorScheme: 'dark'
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }