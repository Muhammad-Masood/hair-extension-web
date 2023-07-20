import prismadb from "@/lib/prismadb";
import { VideoForm } from "../components/video-form"


const CategoryPage = async ({params}:{params:{videoId:string}}) => {
    const vId:number = +(params.videoId);
    const video = await prismadb.video.findUnique({
        where:{
            id:vId
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <VideoForm initialData={video}/>
            </div>
        </div>
    );
}

export default CategoryPage;