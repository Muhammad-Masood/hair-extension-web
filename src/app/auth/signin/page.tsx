"use client"

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import Link from "next/link"


export default function LogIn () {
  const router = useRouter();
    const [usData,setUsData] = useState({
        email: "",
        password: "",
       });
       const [loading, setLoading] = useState(false);
       const searchParams = useSearchParams();
       const callbackUrl = searchParams.get("callbackUrl") || "/";
       const [error, setError] = useState("");

       const onSubmit = async (e:React.FormEvent)=> {
        e.preventDefault();
        try{
          setLoading(true);
          setUsData({email:"",password:""});

          const res = await signIn("credentials", {
            redirect: false,
            email: usData.email,
            password: usData.password,
            callbackUrl,
        });

        setLoading(false);

        console.log(res);
        if(!res?.error){
          router.push(callbackUrl);
        }
        else{
          setError("Invalid email or password");
        }
       }
       catch(error:any){
          setLoading(false);
          setError(error);
       }
      };

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name,value);
        setUsData((usData) => (
          {
            ...usData,
            [name] : value
          }
        ));
        console.log(usData);
      };

        // const handleChange = (event:any) => {
        //   const { name, value } = event.target;
        //   setUsData((prevUserData) => ({
        //     ...prevUserData,
        //     [name]: value,
        //   }));
        //   console.log(usData);
        // };

     function googleSigninHandler() {
        signIn('google');
    
    }

    // const handleSignIn = (event:React.FormEvent) => {
    //     event.preventDefault();
    //     signIn('credentials',{
    //         email:usData.email,
    //         password:usData.password,
    //     });
    // }

    return (
    <div>
        <h1 className="text-center">LogIn</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          {error&&(<p>{error}</p>)};
            <input required 
             type="email" name="Email" placeholder="Email Address" className="text-black" value={usData.email}  onChange={handleChange}/>
            <input required 
            type="password" name="Password" placeholder="Password" className="text-black" value={usData.password} onChange={handleChange}/>
             <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign In"}
      </button>
            <button onClick={googleSigninHandler}>Sign in with Google</button>
        </form>
        <p>Don't have an account?</p> <Link href="/auth/signup">Sign up</Link>
    </div>
  )
}
