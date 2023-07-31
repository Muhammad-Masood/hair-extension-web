"use client"
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { routes } from "@/lib/utils";
import { Access } from "@/app/auth";
import { ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { CrownIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useContext } from "react";
import { useCartContext } from "../../context/ContextForCart";

const Navbar = () => {

  const { cartItems } = useCartContext()

  const cartItemCount = cartItems.reduce((acc, item) => acc + 1, 0);


  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                  <div className="">
                    <div className="flex gap-2">
                    <p className="border border-bronze-150 w-[103px] h-0 mt-5"></p>
                    <CrownIcon />
                    <p className="border border-bronze-150 w-[103px] h-0 mt-5"></p>
                    </div>
                  <p className="ml-11 -mb-2 ">AMBER HAIR</p>
                  <p className="text-[9px] tracking-widest">EMBRACE YOUR INNER BEAUTY WITH AMBER HAIR</p>
                  </div>
                </Link>

                <div className="lg:hidden flex space-x-4">

                  <Link href="/cart" className="mt-1 mr-1">
                    <ShoppingCartIcon />
                    <span className="absolute top-10 ml-4 h-6 w-6 text-center rounded-full bg-bronze-200 text-white">
                      {cartItemCount}
                    </span>
                  </Link>
                  <ThemeChanger/>

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
                      <Link key={route.href} href={route.href} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                        {route.label}
                      </Link>
                    ))}
                    <div className="w-full mt-4">
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
              route.label === 'Shop' ?
                <HoverCard openDelay={0} closeDelay={0} key={route.label} >
                  <HoverCardTrigger className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 light:hover:text-indigo-500  focus:outline-none" href={route.href} >Shop</HoverCardTrigger>
                  <HoverCardContent className="flex w-auto flex-col px-4 py-3 space-y-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200">
                    {route.attributes?.map((route, index) => (
                      (<Link className=" focus:outline-none group transition duration-300" href={`/shop/categories${route.href}`} key={index} >{route.label}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 dark:bg-bronze-50"></span>
                      </Link>)
                    ))}
                  </HoverCardContent>
                </HoverCard>
                :
                <li className="mr-3 nav__item group transition duration-300" key={route.href}>
                  <Link href={route.href} className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:outline-none hover:scale-125 transition duration-300">
                    {route.label}
                  </Link>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 dark:bg-bronze-50"></span>
                </li>
            ))}
          </ul>
        </div>

        <div className="mr-3 mt-1 space-x-5 lg:flex nav__item hidden">
          <Link href="/cart" className="pt-1">
            <ShoppingCartIcon />
            <span className="absolute top-11 ml-4 h-6 w-6 text-center rounded-full bg-bronze-200 text-white">
              {cartItemCount}
            </span>
            {/* {cartItemCount > 0 && (
              <span className="absolute bottom-3 left-4 rounded-full bg-amber-600 text-white p-1" style={{ fontSize: "7px" }}>
                {cartItemCount}
              </span>
            )} */}
          </Link>
          <Access />
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
