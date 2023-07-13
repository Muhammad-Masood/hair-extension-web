"use client"

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { signInSchema, signUpSchema } from "@/components/ui/formSchema"

export  default function LogIn () {
       const router = useRouter();
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState("");
       const session = useSession();

       const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email:"",
          password:"",
        },
      });

       async function onSubmit (values:z.infer<typeof signInSchema>){
        try{
          setLoading(true);
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl:"/"
        });
        setLoading(false);
        console.log(session.data?.user.role); 
       }
       catch(error:any){
          setLoading(false);
          setError(error);
       }
      };

     function googleSigninHandler() {
        signIn('google');
    }

    return (
    <div>
        <h1 className="text-center text-3xl font-bold">Log In</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
          )} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
          )} />
          <div className="flex flex-col space-y-4">
          <Button type="submit" disabled={loading}>{loading?'loading...':'Log In'}</Button>
          <Button onClick={googleSigninHandler}>Sign in with Google</Button>
          </div>
          </form>
          </Form>
          <p>Don't have an account? <Link href="/api/auth/signup">Sign Up</Link></p>
    </div>
  )
}