"use client"
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export function MainNav ({className,...props}:React.HTMLAttributes<HTMLElement>){
    const pathName = usePathname();
    const params = useParams();

    const routes = [
        {
            href:'/settings',
            label:'Settings',
            active: pathName === '/settings',
        }
    ]
    return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {routes.map((route)=>(
            <Link href={route.href} key={route.href} 
            className={cn("text-sm font-medium transition-colors hover:text-amber-500",
            route.active?'text-amber-500':'text-white'
            )}>
                {route.label}</Link>
        ))
        }
    </nav>
  )
}
