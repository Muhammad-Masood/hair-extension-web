import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(req: Request,
    { params }: { params: { categoryName: string } }) {

    try {
        const category = await prismadb.category.findFirst({
            where: {
                name: params.categoryName,
            }
        });

        if (!category) return new Response(JSON.stringify([]));

        const products = await prismadb.product.findMany({
            include: {
                images: true,
            },
            where: {
                categoryId: category.id,
            },
        });

        return new Response(JSON.stringify(products));

    } catch (error) {
        console.log(`[SPECIFIC_PRODUCT_GET]`, error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}