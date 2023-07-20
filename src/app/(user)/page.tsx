"use client"

import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]/route";
// import { ProfileForm } from "@/components/ui/inputForm";

export default function Page(){
    
    return(
        <div>
            Home
            {/* <ProfileForm/> */}
        </div>
    )
}