import prismadb from "@/lib/prismadb";
import { ProductForm } from "../components/product-form"
import { Product } from "@prisma/client";


const ProductsPage = async ({params}:{params:{productId:string|number}}) => {
    let product:Product|null = null;
    if(params.productId !== "new"){
    const pId:number = +(params.productId);
    product = await prismadb.product.findUnique({
        where:{
            id:pId
        },
        include:{
            image:true
        }
    })
    }
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialData={product}/>
            </div>
        </div>
    );
}

export default ProductsPage;