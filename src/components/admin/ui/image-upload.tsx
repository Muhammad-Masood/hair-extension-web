"use client"

import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ImageUploadProps {
    disabled: boolean,
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = (
    { disabled,
        onChange,
        onRemove,
        value }
) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!mounted) return null;

    return (
        <div>
            <div>
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px]">
                        <div>
                            <Button type="button" onClick={() => { onRemove(url) }}>
                                <Trash className="h-4 w-4"></Trash>
                            </Button>
                        </div>
                        <Image fill src={url} alt="Image">
                        </Image>
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="idrcveyu">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                            <ImagePlus className="h-4 w-4" />
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}