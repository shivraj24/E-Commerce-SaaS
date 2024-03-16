'use client';
import { useState, useEffect } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ ...params }) => {

    const [mounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const onUpload = (result: any) => {
        params.onChange(result.info.secure_url);
    }
    if (!mounted) return null;

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    params.value.map((url) => {
                        return (
                            <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                                <div className="z-10 absolute top-2 right-2">
                                    <Button type="button" onClick={() => params.onRemove(url)} variant="destructive" size="icon">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Image"
                                    src={url}
                                />
                            </div>
                        )
                    })}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="pjnhrjrt">
                {({open}) => {
                    const onClick = () =>{
                        open();
                    }

                    return(
                        <Button type="button" disabled={params.disabled} variant="secondary" onClick={onClick}>
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;