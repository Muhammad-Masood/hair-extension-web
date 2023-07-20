import prismadb from "@/lib/prismadb"
import { VideosClient } from "./components/client";

export default async function Videos () {

    const videos = await prismadb.video.findMany();

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <VideosClient data={videos}/>
            </div>
            </div>
    )
}