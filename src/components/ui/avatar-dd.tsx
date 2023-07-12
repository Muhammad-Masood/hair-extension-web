"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User2 } from "lucide-react";

// const isSession = async () => {
//   const {data:session} = await useSession();
//   return session;
// }

export function Avatar () {
   const { data:session} = useSession(); 
   const [isDropDown, setIsDropDown] = useState(false);
  //  const [session, setSession] = useState<Session | null>(null)

   const toogleDropDown = () => {
    setIsDropDown(!isDropDown);
   }

  return (
    <div>
      <div className="flex">
      <button onClick={toogleDropDown}>
        {session?.user?(<Image className="w-8 h-8 rounded-full" src="" alt="user photo" />):<User2/>}
      </button>
      </div>
      </div>
  )

}
