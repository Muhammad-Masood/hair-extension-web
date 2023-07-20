import prismadb from "@/lib/prismadb";
import { MethodForm } from "../components/method-form";

const MethodPage = async ({params}:{params:{methodId:string}}) => {
    const method = await prismadb.category.findUnique({
        where:{
            id:params.methodId
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MethodForm initialData={method}/>
            </div>
        </div>
    );
}

export default MethodPage;