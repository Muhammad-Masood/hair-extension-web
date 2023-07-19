"use client"
import { adminRoutes } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


export const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const pathName = usePathname();
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>

            {adminRoutes.map((route) => (
                route.label === 'Attributes' ?
                    <HoverCard>
                        <HoverCardTrigger href="/dashboard/attributes" className={cn("text-sm font-medium transition-colors hover:text-amber-500",
                            pathName === route.href ? 'text-amber-500' : 'text-white')}
                        >Attributes</HoverCardTrigger>
                        <HoverCardContent className="flex flex-col">
                            {route.attributes?.map((a)=>(
                                (<Link href={`/dashboard${a.href}`}
                                className={cn("text-sm font-medium transition-colors hover:text-amber-500 p-2",
                                    pathName === a.href ? 'text-amber-500' : 'text-white')}
                            >{a.label}</Link>)
                            ))}
                        </HoverCardContent>
                    </HoverCard>
                    :
                    (<Link href={`/dashboard${route.href}`}
                        className={cn("text-sm font-medium transition-colors hover:text-amber-500",
                            pathName === route.href ? 'text-amber-500' : 'text-white')}
                    >{route.label}</Link>)

            ))}
        </nav>
    )
}