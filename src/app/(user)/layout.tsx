"use client"
import Footer from '@/components/Footer'
import '../globals.css'

import Navbar from '@/components/Navbar'
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
    <div className='lg:px-8'>
      <Navbar />
      {/* <Navbar/> */}
      {children}
      <Footer />
    </div>
  )
}
