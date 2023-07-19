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
      href:'/attributes',
      label:'Attributes',
      attributes: [
        {
            href:'/categories',
            label:'Categories',
        },
        {
            href:'/colors',
            label:'Colors',
        },
        {
            href:'/methods',
            label:'Methods',
        },
        {
            href:'/textures',
            label:'Textures',
        },
        {
            href:'/lengths',
            label:'Lengths',
        },
      ]
  },
  {
    href:'/orders',
    label:'Orders',
  },
  {
      href:'/videos',
      label:'Videos',
  },
]


export const formatter = Intl.NumberFormat("en-US",{
  style:"currency",
  currency:"USD"
})