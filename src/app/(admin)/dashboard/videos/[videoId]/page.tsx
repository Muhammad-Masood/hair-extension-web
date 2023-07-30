import prismadb from "@/lib/prismadb";
import { VideoForm } from "../components/video-form"


const VideoPage = async ({params}:{params:{videoId:string}}) => {
    const video = await prismadb.training.findUnique({
        where:{
            id:+(params.videoId)
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

export default VideoPage;