"use client"

import Cta from "@/components/Cta"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Testimonials from "@/components/Testimonials"
import { useSession } from "next-auth/react"
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { ProfileForm } from "@/components/ui/inputForm";

export default function Page(){
    
    return(
        <div>
            <Hero/>
            <Cta/>
            <Testimonials/>
        </div>
    )
}