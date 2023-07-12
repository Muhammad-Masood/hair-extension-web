"use client"

import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page(){
    const { data:session } = useSession();
    return(
        <div>
            {session?.user?(<p>User is active</p>):(<p>NO Session</p>)}
        </div>
    )
}