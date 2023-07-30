import Footer from '@/components/Footer'
import '../globals.css'

import Navbar from '@/components/Navbar'
// import { SessionProvider, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { CartContext } from '../../../context/CartContext'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className='lg:px-8'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
