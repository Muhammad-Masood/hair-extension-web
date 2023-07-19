import prismadb from "@/lib/prismadb";
import { LengthForm } from "../components/length-form"


const LengthPage = async ({params}:{params:{lengthId:string}}) => {
    const lId:number = +(params.lengthId);
    const color = await prismadb.length.findUnique({
        where:{
            id:lId
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <LengthForm initialData={color}/>
            </div>
        </div>
    );
}

export default LengthPage;