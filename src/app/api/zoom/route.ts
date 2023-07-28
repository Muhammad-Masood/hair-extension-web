// https://zoom.us/oauth/authorize?response_type=code&client_id=7lstjK9NTyett_oeXtFiEQ&redirect_uri=https://example.com
import axios from "axios";
import { NextResponse } from "next/dist/server/web/spec-extension/response";



export async function POST(req: Request){
    try{

        const dd = await axios.post("https://zoom.us/oauth/authorize?response_type=code&client_id=7lstjK9NTyett_oeXtFiEQ&redirect_uri=https://example.com")
    } catch(error){
        console.log('[ORDERS_POST]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};

