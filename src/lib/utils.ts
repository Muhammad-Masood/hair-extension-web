import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const fetchCategories: any = async () => {
//     try {
//       const c = await axios.get('/api/categories');
//       if (c) {
//         console.log(c.data);
//       };

//     } catch (err) {
//       console.log(err);
//     }
//   }


export const routes = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/shop',
    label: 'Shop',
    attributes: [
      {
        href: '/accessories',
        label: 'Accessories',
      },
      {
        href: '/hairextensions',
        label: 'Hair Extensions',
      },
    ]
  },
  {
    href: '/training',
    label: 'Training',
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/appointment',
    label: 'Appointment'
  }
]

export const adminRoutes = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/products',
    label: 'Products',
  },
  {
    href: '/attributes',
    label: 'Attributes',
    attributes: [
      {
        href: '/categories',
        label: 'Categories',
      },
      {
        href: '/colors',
        label: 'Colors',
      },
      {
        href: '/methods',
        label: 'Methods',
      },
      {
        href: '/textures',
        label: 'Textures',
      },
      {
        href: '/lengths',
        label: 'Lengths',
      },
    ]
  },
  {
    href: '/orders',
    label: 'Orders',
  },
  {
    href: '/videos',
    label: 'Videos',
  },
]


export const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})