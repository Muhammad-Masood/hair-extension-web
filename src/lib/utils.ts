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
      href:'/shop',
      label:'Shop',
  },
  {
      href:'/training',
      label:'Training',
  },
  {
    href: '/about',
    label: 'About'
  }
]

export const adminRoutes = [
  {
      href:'/',
      label:'Overview',
  },
  {
      href:'/products',
      label:'Products',
  },
  {
      href:'/videos',
      label:'Videos',
  }
]
