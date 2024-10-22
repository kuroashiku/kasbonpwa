import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { imageKitAuth } from "../api/Imagekit";
import { Fragment, useEffect, useState } from "react";
import { Button, Dialog, IconButton, Popover, PopoverContent, PopoverHandler, Spinner } from "@material-tailwind/react";
import {formatImgKitUrl, formatImgKitUrlThumb}from "../util/imagekit";
import { CameraIcon } from "@heroicons/react/24/outline";
import { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL_ENDPOINT } from "../constant/appCommon";
export default function ImageUpload({
    image="",
    fileName="",
    onSuccess=()=>{},
    onError=()=>{},
    onRemove=()=>{},
    id="",
    disabled=false,
    widthClass="w-[calc(100vw-2rem)]"
}){
    const [loading, setLoading] = useState(false);
    const [imageOptions, setImageOptions] = useState(false);
    useEffect(()=>{
        const uploader = document.getElementById(id);
        if(uploader){
            uploader.addEventListener('change', ()=>{
                setLoading(true);
            });
        }
    },[image]);

    const handleClickPlaceholder = () => {
        if(loading || disabled){
            return;
        }
        const uploader = document.getElementById(id);
        if(uploader){
            uploader.click();
        }
    }
    const onDone = (result) => {
        setLoading(false);
        setImageOptions(false);
        if(result){
            onSuccess(result.filePath);
        }else{
            onError();
        }
    }

    const hendleError  = (err) =>{
        alert(JSON.stringify(err));
        setLoading(false);
    }

    return(
        <div className="cursor-pointer rounded-lg mx-auto w-fit relative">
            {
                image? 
                <Fragment>
                    <div className={`h-72 ${widthClass} lg:w-72 rounded-lg overflow-hidden`}>
                        <IKImage
                            urlEndpoint={IMAGEKIT_URL_ENDPOINT}
                            path={image}
                            transformation={[{
                                "height": "400",
                                "width": "600"
                            }]}
                            className="object-cover h-full w-full"
                            loading="lazy"
                        />
                    </div>
                    <span className="absolute top-2 right-2">
                        <IconButton variant="text" className="rounded-full bg-white bg-opacity-70" onClick={()=>setImageOptions(true)}>
                            <CameraIcon className="w-6 h-6 text-gray-800"/>
                        </IconButton>
                    </span>
                    <Dialog open={imageOptions} handler={()=>setImageOptions(false)}>
                        <div className="cursor-pointer p-4">
                            <a href={formatImgKitUrl(image)} target="_blank" rel="noreferrer">
                                <div className="border-b py-2 hover:font-bold">Lihat gambar</div>
                            </a>
                            {
                                disabled?null:
                                <div className="py-2 hover:font-bold" onClick={onRemove}>Hapus gambar</div>
                            }
                        </div>
                    </Dialog>
                </Fragment>
                :
                <IKContext 
                    publicKey={IMAGEKIT_PUBLIC_KEY} 
                    urlEndpoint={IMAGEKIT_URL_ENDPOINT} 
                    authenticator={imageKitAuth} 
                >
                    <div className={`cursor-pointer p-1 text-sm rounded-lg h-72 ${widthClass} lg:w-72 border-2 border-dashed border-slate-300 flex flex-col justify-center hover:bg-slate-200`}
                        onClick={handleClickPlaceholder}
                    >
                        <CameraIcon className="w-14 h-14 text-gray-300 mx-auto"/>
                        {
                            loading? 
                            <span className="flex items-center mx-auto"> 
                                <span>Mengupload</span><Spinner className="h-5 w-5 ml-3" color="teal"/>
                            </span> : 
                            <p className="text-center text-xs">Upload Gambar</p>
                        }
                        <IKUpload
                            fileName={fileName}
                            onError={hendleError}
                            onSuccess={onDone}
                            id={id}
                            className="hidden"
                        />
                    </div>
            </IKContext>
            }
        </div>
    )
}