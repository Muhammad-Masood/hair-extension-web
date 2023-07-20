// "use client"
import { Navbar } from '@/components/Navbar'
import '../globals.css'
import { Footer } from '@/components/Footer'
// import { SessionProvider, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

export default function UserLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  // const router = useRouter();
  // const session = useSession();
  // if(session.data?.user.role === 'ADMIN'){
  //   router.push('/dashboard');
  // }
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
        </div>
  )
}
