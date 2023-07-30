import prismadb from "@/lib/prismadb"
import { VideosClient } from "./components/client";
import { VideoColumn } from "./components/column";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

export default async function Videos () {

    const videos = await prismadb.training.findMany({
        orderBy: {
            createdAt: 'desc'
          }
    });
    
    const formattedVideos:VideoColumn[] = videos.map((video) => (
        {
            id:video.id,
            url:video.url,
            price: formatter.format(video.price.toNumber()),
            createdAt: format(video.createdAt, 'MMMM do, yyyy'),
        }
    ));

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
            <VideosClient data={formattedVideos}/>
            </div>
        </div>
    )
}