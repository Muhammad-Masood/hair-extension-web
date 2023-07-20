import prismadb from "@/lib/prismadb";
import { ProductForm } from "../components/product-form"
import { Product } from "@prisma/client";


const ProductsPage = async ({ params }: { params: { productId: string | number } }) => {
    let product = null;
    if (params.productId !== "new") {
        const pId: number = +(params.productId);
        product = await prismadb.product.findUnique({
            where: {
                id: pId
            },
            include: {
                images: true,
            },
        })
    }

    const categories = await prismadb.category.findMany();
    const methods = await prismadb.method.findMany();
    const textures = await prismadb.texture.findMany();
    const lengths = await prismadb.length.findMany();
    const colors = await prismadb.color.findMany();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                initialData={product}
                categories={categories}
                colors={colors}
                lengths={lengths}
                methods={methods}
                textures={textures}
                />
            </div>
        </div>
    );
}

export default ProductsPage;