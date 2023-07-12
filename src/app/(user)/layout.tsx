import { Navbar } from '@/components/Navbar'
import '../globals.css'
import { Footer } from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'

export default function UserLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
        </div>
  )
}
