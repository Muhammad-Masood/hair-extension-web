import { useContext } from "react";
import { Product, contextProduct, contextVal } from "../../context/CartContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartView ({product}:{product:Product}){
    const { cartItems, setCartItems } = useContext(contextVal);
    const {cartProducts, setCartProducts} = useContext(contextProduct);
    
    const handleDeleteCart = () =>{
        const updatedCart:Product[] = cartProducts.filter((p:Product)=>(p.id !== product.id));
        setCartProducts(updatedCart);
    }

    const handleIncreaseQuantity = (increase:boolean) => {
        (cartProducts.map((pr:Product)=>{
            if(pr.id == product.id){
                if(increase){
                    pr.quantity+=1;
                    pr.subTotal += +(pr.price);
                }
                else{
                    if(product.quantity>1){
                    pr.quantity-=1;
                    pr.subTotal-= +(pr.price);
                    }
                }
            }
        }));
    }
    
    return(
        <div className="">
            <div className="flex justify-center mt-6">
            <Image className="rounded-lg" src={product.image} alt="product image" width={189}></Image>
            <div className="mr-44 ml-7 space-y-3">
                <span className="flex text-xl font-poppins tracking-wide w-96">{product.title}<button onClick={() => handleDeleteCart()}><Trash2 className="ml-24"/></button></span>
                {/* <p className="text-gray-500 font-semibold">{product.subCategory}</p> */}
                <p className="font-semibold">Delivery Estimation</p>
                <p className="text-yellow-400 font-semibold text-base">5 Working Days</p>
                <div className="flex">
                <p className="text-xl font-semibold">${product.subTotal}</p>
                <div className="flex gap-2 ml-56">
              <Button onClick={() => {
                if(product.quantity>1){
                    setCartItems(cartItems-1);
                }
                handleIncreaseQuantity(false);
                }} className="rounded-full">
                -
              </Button>
              <span className="w-9 justify-center items-center flex">{product.quantity}</span>
              <Button
                onClick={() => {
                  setCartItems(cartItems+1);
                  handleIncreaseQuantity(true);
                }}
                className="rounded-full"
              >
                +
              </Button>
            </div>
            </div>
            </div>
            <div className="bg-slate-50 space-y-5 ml-7 p-7">
            <h3 className="scroll-m-20 text-xl font-bold font-poppins tracking-tight">Order Summary</h3>
            <span className="flex font-poppins">Quantity<p className="pl-7 w-max">{product.quantity} Product</p></span>
            <span className="flex font-poppins">Sub Total<p className="pl-7">${product.subTotal}</p></span>
            <Button className="bg-black rounded-none w-max">Process to Checkout</Button>
            </div>

            </div>

        </div>
    )
}