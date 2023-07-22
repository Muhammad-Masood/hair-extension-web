"use client"

import { useParams } from "next/navigation"
import { useOrigin } from "../../hooks/use-origin";
import { ApiAlert } from "./api-alert";


interface ApiListProps{
    name:string,
    idName:string
}

export const ApiList:React.FC<ApiListProps> = ({
    name,
    idName
}) => {
    const params = useParams();
    const origin = useOrigin();
    const baseUrl = name === "colors" || name === "methods" || name === "textures" || name === "lengths"?  
    `${origin}/api/attributes` : `${origin}/api`;
    return(
        <>
        <ApiAlert 
        title="GET"
        variant="public"
        description={`${baseUrl}/${name}`}
        />
        <ApiAlert 
        title="GET"
        variant="public"
        description={`${baseUrl}/${name}/{${idName}}`}
        />
        <ApiAlert 
        title="POST"
        variant="admin"
        description={`${baseUrl}/${name}`}
        />
        <ApiAlert 
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${name}/{${idName}}`}
        />
        <ApiAlert 
        title="DELETE "
        variant="admin"
        description={`${baseUrl}/${name}/{${idName}}`}
        />
        </>
    )
}