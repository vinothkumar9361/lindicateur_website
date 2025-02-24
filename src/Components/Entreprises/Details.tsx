
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import AdImg from '@/Images/Home/Ad_img.png';


const Details = ({ data }: any) => {

    console.log("data", data);

    const [imageList, setImageList] = useState<any | null>(null);
    const [viewImageList, setViewImageList] = useState<boolean>(false);

    const galleryRef = useRef<any>(null);

    useEffect(() => {
        if (data?.photolists?.length > 0) {
            const photos = data?.photolists?.map((photo: any) => ({
                original: photo.photoUrl,
                thumbnail: photo.photoUrl,
            }));

            setImageList(photos);
        }

    }, [data?.photolists])

    const enterFullscreen = () => {
        console.log("test");
        setViewImageList(true);

        setTimeout(() => {
            handleImageLoad();
        }, 0);
    };

    const handleImageLoad = () => {
        console.log(galleryRef.current);

        if (galleryRef.current) {
            galleryRef.current.fullScreen();
        }
        console.log("Image loaded");

    };

    const handleScreenChange = (isFullscreen: boolean) => {
        if (!isFullscreen) {
            console.log("Exited fullscreen");
            setTimeout(() => {
                setViewImageList(false);
            }, 200);
        }
    };

    return (
        <>
            <div className="py-10">
                <div className="container mx-auto px-4 lg:px-10">
                    <div className="flex gap-3 cursor-pointer">
                        <FaArrowLeftLong className="w-6 h-6 txt_light_green" />
                        <p className="txt_light_green">retour a la recherche</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 mt-4">
                        <div className="w-full lg:w-1/3">
                            <div className="bg-gray-300 py-2 px-4">
                                <p className="text-xl font-semibold ">Coordonnées</p>
                            </div>
                            <div className="mt-4">
                                <p className="pb-4"><span className="font-semibold text-lg">Nom : </span> {data?.companyName}</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Adresse :</span> {data?.address}</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Code Postal :</span> {data?.postalCode}</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Ville : </span> {data?.city}</p>
                            </div>
                            <div className="flex gap-3">
                                <a href={`tel:+${data?.phoneNumber}`} className="w-1/2 bg_green flex justify-center items-center gap-3 rounded-2xl py-2">
                                    <IoCall />
                                    <p>Appel</p>
                                </a>
                                <a href={`mailto:${data?.email}`} className="w-1/2 bg_green flex justify-center items-center gap-3 rounded-2xl">
                                    <MdEmail />
                                    <p>Email</p>
                                </a>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3">
                            <img src={data?.photos} alt="image" />
                        </div>
                    </div>

                    {
                        data?.presentation ?
                            <div className="mt-4">
                                <div className="bg-gray-300 py-2 px-4">
                                    <p className="text-xl font-semibold ">Présentation</p>
                                </div>
                                <div className="pt-4 px-2">
                                    <div dangerouslySetInnerHTML={{ __html: data?.presentation }} />
                                </div>
                            </div>
                            : null
                    }

                    {
                        data?.activities ?
                            <div className="mt-4">
                                <div className="bg-gray-300 py-2 px-4">
                                    <p className="text-xl font-semibold ">Activities</p>
                                </div>
                                <div className="pt-4 px-2">
                                    <div dangerouslySetInnerHTML={{ __html: data?.activities }} />
                                </div>
                            </div>
                            : null
                    }

                    {
                        data?.partners ?
                            <div className="mt-4">
                                <div className="bg-gray-300 py-2 px-4">
                                    <p className="text-xl font-semibold ">Partenaires</p>
                                </div>
                                <div className="pt-4 px-2">
                                    <div dangerouslySetInnerHTML={{ __html: data?.partners }} />
                                </div>
                            </div>
                            : null
                    }

                    {
                        data?.references ?
                            <div className="mt-4">
                                <div className="bg-gray-300 py-2 px-4">
                                    <p className="text-xl font-semibold ">Références</p>
                                </div>
                                <div className="pt-4 px-2">
                                    <div dangerouslySetInnerHTML={{ __html: data?.references }} />
                                </div>
                            </div>
                            : null
                    }

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Photos </p>
                        </div>
                        {
                            data?.photolists ?
                                <div className="flex flex-wrap justify-center gap-4 mt-5">
                                    {
                                        data?.photolists?.map((image: any) => (
                                            <>
                                                <div onClick={enterFullscreen} className="w-40 h-30 sm:w-60 sm:h-40 md:w-80 md:h-60 lg:w-72 lg:h-48 cursor-pointer">
                                                    <img src={image?.photoUrl} alt="photos" className="w-full h-full" />
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                                : null
                        }
                        {
                            viewImageList ?
                                <div className="mt-4 lg:px-20">
                                    {
                                        imageList ?
                                            <ImageGallery
                                                ref={galleryRef}
                                                items={imageList}
                                                showFullscreenButton={true}
                                                useBrowserFullscreen={true}
                                                onScreenChange={handleScreenChange}
                                            />
                                            : null
                                    }
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;