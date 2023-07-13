
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const Access = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      {session?.user ? (
        <button onClick={() => { signOut() }}>Log Out</button> ) 
        : (
          <button onClick={() => router.push('/api/auth/signin')}>Log In</button>
        )}
    </div>
  )

};


