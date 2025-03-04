`use client`;

import { useRouter } from 'next/router';

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import Spinner from "@/Components/Common/Loading";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddSecteursForAdmin, GetAllSecteursListForAdmin } from '@/store/slices/adminAction';
import { ImageUpload, ImageDelete } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';

import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
    secteurname: Yup.string().required('Entrez un nom de secteur'),
});

const AddSecteur = ({ showAdd, closeAdd }: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [imageUpload, setImageUpload] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            image: ''
        },
        onSubmit: async (values: any) => {
            console.log(values);

        },
        // validationSchema={}
        validate: (values: any) => {
            const errors: any = {};

            if (!values?.name) {
                errors.name = "Entrez un nom de secteur";
            }

            return errors;
        }
    })

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
                title: success?.data.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                if (token) {
                    dispatch(GetAllSecteursListForAdmin({ type: 'admin' }));
                }
                closeAdd();
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

    const handleRemoveUrl = (value: any) => {
        dispatch(ImageDelete({ id: formik?.values?.image?.id }))
        formik.setFieldValue("logo", '');
        setImageUpload(null);

    }

    return (
        <>
            <div
                id="static-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen lg:absolute custom-modal"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Ajouter une secteur
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal"
                                onClick={() => { closeAdd() }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <form action="" className=" md:w-full" onSubmit={formik.handleSubmit}>
                                <div className='flex flex-col pt-4'>
                                    <label htmlFor="secteurname" className='text-left pb-2'>Nom</label>
                                    <input
                                        name="secteurname"
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                    {formik.errors.secteurname && formik.touched.secteurname && typeof formik.errors.secteurname === 'string' && (
                                        <div className="text-red-500 flex text-left gap-1 py-2">
                                            <PiWarningCircleBold className="w-5 h-5" />
                                            {formik.errors.secteurname}
                                        </div>
                                    )}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 w-full md:pr-4'>
                                    <div className="pb-2 flex justify-between">
                                        <label htmlFor="logo-upload" className='text-left'>Ajouter un image</label>
                                        {
                                            formik?.values?.image ?
                                                <div onClick={() => handleRemoveUrl(1)} className="cursor-pointer place-items-end pr-4">
                                                    <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="logo-upload"
                                            className={`flex flex-col items-center justify-center w-full ${formik?.values?.image ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                        >
                                            {
                                                Loading && imageUpload ?
                                                    <Spinner />
                                                    :
                                                    <>
                                                        {
                                                            formik?.values?.image ?
                                                                <div className="flex flex-col items-center justify-center w-full">
                                                                    <a href={formik?.values?.image?.imageUrl} className="w-full text-wrap break-words px-4">{formik?.values?.image?.imageUrl}</a>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF</p>
                                                        </div>
                                                        <input
                                                            id="logo-upload"
                                                            name="logo-upload"
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
                                    <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Soumettre"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSecteur;