import prismadb from "@/lib/prismadb";

export async function GET (req:Request,
    {params} : {params:{categoryId:string}}){

        try{
            const products = await prismadb.product.findMany({
                where:{
                    categoryId:params.categoryId
                },
            });

            return new Response(JSON.stringify(products));
        } catch(error){
            console.log(`[SPECIFIC_PRODUCT_GET]`,error);
        }
}