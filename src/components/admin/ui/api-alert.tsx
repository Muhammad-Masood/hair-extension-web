"use client"

import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert,AlertTitle,AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
    title: string,
    description: string,
    variant: "public" | "admin"
};

const textMap = {
    public: "Public",
    admin: "Admin",
};

const variantMap:Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
};

export const ApiAlert:React.FC<ApiAlertProps> = ({
    title,
    description,
    variant="public",
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to the clipboard");
    }
    return(
        <Alert>
            <Server className="h-4 w-4"/>
            <div className="flex space-x-4">
            <AlertTitle className="flex items-center gap-x-2">{title}</AlertTitle>
            <Badge variant={variantMap[variant]}>{textMap[variant]}

            </Badge>
            </div>
            <div className="flex ">
            <AlertDescription>
            <code className="relative rounded font-mono font-semibold text-sm px-[0.3rem] py-[0.2rem]">
                {description}
            </code>
            </AlertDescription>
            <Button variant="outline" size="icon" onClick={()=>{onCopy()}}>
                <Copy className="h-4 w-4"/>
            </Button>
            </div>
        </Alert>
    )
}
