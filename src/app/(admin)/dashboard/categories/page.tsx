import prismadb from "@/lib/prismadb"


export default async function Categories () {
    const categories = await prismadb.category.findMany();
    
    return(
        <div>

        </div>
    )
}