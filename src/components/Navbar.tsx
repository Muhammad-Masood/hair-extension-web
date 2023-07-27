"use client"
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { routes } from "@/lib/utils";
import { Access } from "@/app/auth";
import { ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Navbar = async () => {

// const [run,setRun] = useState(false);
// const pathName = usePathname();

// const fetchCategories: any = async () => {
//   try {
//     const c = await axios.get('/api/categories');
//     if (c) {
//       console.log(c.data);
//     };
//     setRun(true);

//   } catch (err) {
//     console.log(err);
//   }
// }


// useEffect(()=>{
//   if(!run){
//   fetchCategories();
//   }
// },[]);

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                  AmberLt
                </Link>

                <div className="lg:hidden flex space-x-4"> 
                
                <Link href="/cart" className="mt-1"><ShoppingCartIcon /></Link>
                  <ThemeChanger />

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 flex ml-auto space-x-4 text-gray-500 rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-black">
                  
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                </div>
                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {routes.map((route) => (
                      <Link key={route.href} href={route.href} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none">
                        {route.label}
                      </Link>
                    ))}
                    <div className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">
                      <Access />
                    </div>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {routes.map((route) => (
              route.label==='Shop'? 
              <HoverCard openDelay={0} closeDelay={0} key={route.label} >
                        <HoverCardTrigger className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800" href={route.href} >Shop</HoverCardTrigger>
                        <HoverCardContent className="flex w-auto flex-col px-4 py-3 space-y-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200">
                            {route.attributes?.map((route,index)=>(
                                (<Link className=" hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800" href={`/shop/categories${route.href}`} key={index} >{route.label}</Link>)
                            ))}
                        </HoverCardContent>
                    </HoverCard>
                     :            
              <li className="mr-3 nav__item" key={route.href}>
                <Link href={route.href} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mr-3 space-x-4 lg:flex nav__item hidden">
          <Link href="/cart" className="mt-2"><ShoppingCartIcon /></Link>
          <Access />
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
