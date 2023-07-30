
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Access = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div >
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserCircle2 className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-x-2"><span><User className="w-5 h-5 "/></span> Profile</DropdownMenuItem>
            <DropdownMenuItem className="gap-x-2" onClick={() => { signOut() }}><span><LogOut className="w-5 h-5"/></span>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
        : (
          <Button variant="outline" className="px-6 py-2 -mt-2 dark:text-white rounded-md md:ml-5" onClick={() => router.push('/api/auth/signin')}>Log In</Button>
        )}
    </div>
  )
};


