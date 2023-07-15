import '../globals.css'
import { Navbar } from '@/components/admin/Navbar'

export default function AdminLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Navbar/>
        {children}
        </div>
  )
}
