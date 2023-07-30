import prismadb from "@/lib/prismadb";

export async function GET (req:Request,
    {params} : {params:{categoryName:string}}){

        try{
            const category = await prismadb.category.findFirst({
                where:{
                    name:params.categoryName,
                }
            });

            if(!category) return null

            const products = await prismadb.product.findMany({
                where:{
                    categoryId:category.id,
                },
            });

            return new Response(JSON.stringify(products));
        } catch(error){
            console.log(`[SPECIFIC_PRODUCT_GET]`,error);
        }
}