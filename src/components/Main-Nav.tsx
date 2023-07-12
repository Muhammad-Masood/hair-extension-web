"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { routes } from "@/lib/utils";
import {usePathname} from "next/navigation"
import { User2 } from "lucide-react";
import { Avatar } from "./ui/avatar-dd";
import { Access } from "@/app/auth";

export function MainNav ({className,...props}:React.HTMLAttributes<HTMLElement>){
    const pathName = usePathname();
    return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {routes.map((route)=>(
            <Link href={route.href} key={route.href}
            className={cn("text-sm font-medium transition-colors hover:text-amber-500",
            pathName===route.href?'text-amber-500':'text-white'
            )}>
                {route.label}</Link>
        ))
        }
        <Avatar/>
        <Access/>
        {/* <User2/> */}
    </nav>
  )
}
