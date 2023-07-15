"use client"
import { adminRoutes } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {usePathname} from "next/navigation";

export const MainNav = ({className,...props}:React.HTMLAttributes<HTMLElement>) => {
    const pathName = usePathname();
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
                {adminRoutes.map((route)=>(
                    <Link href={`/dashboard${route.href}`}
                    className={cn("text-sm font-medium transition-colors hover:text-amber-500",
            pathName===route.href?'text-amber-500':'text-white')}
            >{route.label}</Link>
                ))}
        </nav>
    )
}