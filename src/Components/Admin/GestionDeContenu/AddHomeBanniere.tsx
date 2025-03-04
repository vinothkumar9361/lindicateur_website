`use client`;

import Image from "next/image";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import BannerBackground from '@/Images/Home/banner_background_2.webp';

import Spinner from "@/Components/Common/Loading";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddBannersForAdmin, GetAllEstablishmentProfileName, GetEtablissementForAdmin, UpdateBannerImage } from '@/store/slices/adminAction';
import { ImageUpload, ImageDelete, GetBannerImages } from '@/store/slices/commonAction';
import { successMessage, errorMessage, removeEtablishmentData } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const AddHomeBanniere = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, BannerImage } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [imageUpload, setImageUpload] = useState<any | null>(null);
    const [imageUrl, setImageUrl] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        dispatch(GetBannerImages({ id: 1 }))
    }, [])

    useEffect(() => {
        if (imageUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes

            if (imageUpload) {
                const fileType: any = imageUpload?.type;
                const fileSize: any = imageUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorsMessage("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                    setImageUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorsMessage("La taille du fichier doit être inférieure à 1 Mo.");
                    setImageUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        setErrorsMessage(null);
                        // const img: any = new Image();
                        // img.onload = () => {
                        //     const { width, height } = img;
                        //     if (width > 1055 || height > 355) {
                        //         setErrorsMessage('Image dimensions should be less than 1050x350 pixels.');
                        //     }
                        //     else {
                        //     setErrorsMessage(null);
                        //     }

                        // };
                        // img.src = e.target.result;
                    };
                    reader.readAsDataURL(imageUpload);
                }
            }
            else {
                setErrorsMessage(null);
                setImageUpload(null);
            }
        }
    }, [imageUpload])

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                dispatch(GetBannerImages({ id: 1 }));
                setImageUpload(null);
            })
        }
        else if (errors) {
            Swal.fire({
                title: errors?.response?.data?.message,
                icon: "error",
                iconColor: "#CA0505",
                confirmButtonColor: "#CA0505",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(errorMessage(""));

            })
        }
    }, [dispatch, success, errors]);

    const handleUpload = () => {
        let updateData = {
            bannerURL: imageUpload,
            id: 1
        }

        dispatch(UpdateBannerImage({ token, updateData }));
    }

    const handleRemoveUrl = (value: any) => {
        setImageUpload(null);
    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Fond de banniere</h3>
                    <hr className="" />
                </div>
                <div className='sm:px-16 md:px-4 mt-4'>
                    <div className="h-60 md:h-80">
                        <img src={BannerImage?.data?.existingBanner?.bannerURL} alt="banner" className="h-full w-full" />
                    </div>
                </div>

                <div className='flex flex-col pt-4 md:pt-8 w-full md:pl-4 mt-4'>
                    <div className="pb-2 flex justify-between">
                        <label htmlFor="image-upload" className='text-left'>Ajouter des arrière-plans de bannière</label>
                        {
                            imageUpload ?
                                <div onClick={() => handleRemoveUrl(2)} className="cursor-pointer place-items-end pr-4">
                                    <TiDelete className="w-6 h-6 hover:text-red-500" />
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="image-upload"
                            className={`flex flex-col items-center justify-center w-full ${imageUpload ? "h-60" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                        >
                            {
                                Loading && imageUpload ?
                                    <Spinner />
                                    :
                                    <>
                                        {
                                            imageUpload ?
                                                <div className="flex flex-col items-center justify-center text-center w-full">
                                                    <a href="" className="w-full text-wrap break-words line-clamp-2 px-4">{imageUpload?.name}</a>
                                                </div>
                                                :
                                                null
                                        }
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF </p>
                                        </div>
                                        <input
                                            id="image-upload"
                                            name="image-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e: any) => {
                                                setImageUpload(e.target.files[0])
                                            }}
                                            multiple
                                        />
                                    </>
                            }
                        </label>
                    </div>

                    {errorsMessage ? (
                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorsMessage}</div>
                    ) : null}
                </div>

                <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                    <button
                        type="submit"
                        className={`cursor-pointer text-gray-400 rounded-lg border-2 border-gray-300 p-3 w-full mt-6 mb-5 lg:mb-3 ${imageUpload && "text-black hover:border-gray-700 search-btn"}`}
                        onClick={() => handleUpload()}
                        disabled={!imageUpload}>
                        {
                            Loading ?
                                <Spinner />
                                : "Commencer la bannière"
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddHomeBanniere;