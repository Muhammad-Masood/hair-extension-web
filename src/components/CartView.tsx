"use client"

import { useContext } from "react";
import { contextProduct, contextVal } from "../../context/CartContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Product } from "../../context/types";
import { useCartContext } from "../../context/ContextForCart";

export default function CartView({ product, quantity }: { product: Product }) {

    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartContext();

    return (
        <div className="flex justify-center mt-6">
            <Image className="rounded-lg" src={product.images[0].url} alt="product image" height={189} width={189}></Image>
            <div className="mr-44 ml-7 space-y-3">
                <span className="flex text-xl font-poppins tracking-wide w-96">
                    {product.title}
                    <button onClick={() => removeFromCart(product.id)}>
                        <Trash2 className="ml-24" />
                    </button>
                </span>
                {/* <p className="text-gray-500 font-semibold">{product.subCategory}</p> */}
                <p className="font-semibold">Delivery Estimation</p>
                <p className="text-yellow-400 font-semibold text-base">5 Working Days</p>
                <div className="flex">
                    <p className="text-xl font-semibold">${product.price}</p>
                    <div className="flex gap-2 ml-56">
                        <Button onClick={() => decreaseQuantity(product.id)} className="rounded-full">
                            -
                        </Button>
                        <span className="w-9 justify-center items-center flex">{quantity}</span>
                        <Button onClick={() => increaseQuantity(product.id)} className="rounded-full">
                            +
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}