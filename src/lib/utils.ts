import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const routes = [
  {
      href:'/',
      label:'Home',
  },
  {
      href:'/products',
      label:'Products',
  },
  {
      href:'/courses',
      label:'Courses',
  }
]

export const adminRoutes = [
  {
      href:'/home',
      label:'Home',
  },
  {
      href:'/addproducts',
      label:'Add Products',
  },
  {
      href:'/editproducts',
      label:'Edit Products',
  },
  {
      href:'/upload',
      label:'Upload Videos',
  }
]
