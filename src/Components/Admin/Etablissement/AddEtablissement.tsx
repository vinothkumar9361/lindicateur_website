`use client`;

import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import Swal from 'sweetalert2';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddEtablissementForAdmin, GetAllCategoryListForAdmin } from '@/store/slices/adminAction';
import { ImageUpload, ImageDelete } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddetablishmentSchema = Yup.object().shape({
    departmentcode: Yup.string()
        .required('Entrez un départemental code')
        .min(2, 'Trop court !')
        .max(3, 'rop longtemps !')
});

const Addetablissement = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminCategoryList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);

    const [categoryName, setCategoryName] = useState<any | null>(null);
    const [searchcategoryName, setSearchcategoryName] = useState<any | null>([]);

    const categoryNameOptions = AdminCategoryList?.data?.category?.map((data: any) => ({
        value: data.categoryName,
        label: data.categoryName,
    }));

    useEffect(() => {
        const categoryfilteredOptions = categoryNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        console.log(categoryfilteredOptions);

        setSearchcategoryName(categoryfilteredOptions);
    }, [AdminCategoryList])

    const handlecategoryInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
            const filteredOptions = categoryNameOptions.filter((option: any) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            ).slice(0, 500);

            console.log(filteredOptions);

            setSearchcategoryName(filteredOptions);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(GetAllCategoryListForAdmin({ token, type: 'website' }));
        }
    }, [dispatch, token])

    useEffect(() => {
        if (logoUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes

            if (logoUpload) {
                const fileType: any = logoUpload?.type;
                const fileSize: any = logoUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorsMessage("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                    setLogoUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorsMessage("La taille du fichier doit être inférieure à 1 Mo.");
                    setLogoUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img: any = new Image();
                        img.onload = () => {
                            const { width, height } = img;
                            // if (width > 155 || height > 155) {
                            //     setErrorsMessage('Image dimensions should be less than 150x150 pixels.');
                            // }

                            handleUploadImg();
                            setErrorsMessage(null);
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(logoUpload);
                }
            }
            else {
                setErrorsMessage(null);
                setLogoUpload(null);
            }
        }
        else if (photosUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes

            if (photosUpload) {
                const fileType: any = photosUpload?.type;
                const fileSize: any = photosUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorMessagephoto("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                    setPhotosUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorMessagephoto('La taille du fichier doit être inférieure à 1 Mo.');
                    setPhotosUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img: any = new Image();
                        img.onload = () => {
                            const { width, height } = img;
                            if (width > 405 || height > 255) {
                                setErrorMessagephoto("Les dimensions de l'image doivent être inférieures à 400x250 pixels.");
                            }
                            else {
                                handleUploadImg();
                                setErrorMessagephoto(null);
                            }
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(photosUpload);
                }
            }
            else {
                setErrorMessagephoto(null);
                setPhotosUpload(null);
            }
        }

    }, [logoUpload, photosUpload])

    useEffect(() => {
        if (success) {
            if (success?.data?.imageUrl) {
                Swal.fire({
                    title: success?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    if (logoUpload) {
                        setLogoUrl(success?.data);
                        setLogoUpload(null)
                    }
                    else if (photosUpload) {
                        setPhotosUrl(success?.data);
                        setPhotosUpload(null)
                    }
                    dispatch(successMessage(""));
                })
            }
            else if (success?.message === 'Image supprimée avec succès') {
                Swal.fire({
                    title: success?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    dispatch(successMessage(""));
                })
            }
            else {
                Swal.fire({
                    title: success?.data?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    dispatch(successMessage(""));
                    router.push('/admin/liste-des-etablissements/')
                })
            }
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
                if (logoUpload) {
                    setLogoUrl(success?.data?.imageUrl);
                }
                else if (photosUpload) {
                    setPhotosUrl(success?.data?.imageUrl);
                }
                dispatch(errorMessage(""));
            })
        }
    }, [dispatch, success, errors]);

    const handleUploadImg = () => {
        let imageType;
        let imageUrl;
        if (logoUpload) {
            imageType = "logo";
            imageUrl = logoUpload;
        }
        else if (photosUpload) {
            imageType = "photos";
            imageUrl = photosUpload;
        }

        const imageData = {
            imageUrl: imageUrl,
            imageType: imageType
        }
        dispatch(ImageUpload({ imageData }));
    }

    const handleRemoveUrl = (value: any) => {
        if (value === 1) {
            dispatch(ImageDelete({ id: logoUrl?.id }))
            setLogoUrl(null);
            setLogoUpload(null);
        }
        else if (value === 2) {
            dispatch(ImageDelete({ id: photosUrl?.id }))
            setPhotosUrl(null);
            setPhotosUpload(null);
        }
    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Ajouter un établissement</h3>
                    <hr className="" />
                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        initialValues={{
                            name: '',
                            category: '',
                            company: '',
                            address: '',
                            departmentcode: '',
                            postcode: '',
                            city: '',
                            email: '',
                            logo: logoUrl?.imageUrl || '',
                            photos: photosUrl?.imageUrl || '',
                            phone: '',
                            websiteURL: ''
                            // message: '',
                        }}
                        validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            let data = {
                                fullName: values?.name,
                                categoryName: categoryName || values?.category,
                                companyName: values?.company,
                                address: values?.address,
                                departmentCode: values?.departmentcode,
                                postalCode: values?.postcode,
                                email: values?.email,
                                logo: logoUrl?.imageUrl,
                                photos: photosUrl?.imageUrl,
                                phoneNumber: phoneNumber,
                                type: "admin",
                                city: values?.city,
                                websiteURL: (values?.websiteURL.includes("https") || values?.websiteURL.includes("http")) ? values?.websiteURL : `https://${values?.websiteURL}`,
                            }

                            dispatch(AddEtablissementForAdmin({ token, data }))
                        }}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form className="md:flex md:flex-wrap md:w-full">
                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="name" className='text-left pb-2'>Nom et Prénom</label>
                                        <Field
                                            name="name"
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.name && touched.name ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.name}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                                        <Select
                                            options={searchcategoryName}
                                            name="category"
                                            value={categoryNameOptions?.find((option: any) => option.value === categoryName?.toLowerCase())}
                                            onChange={(selectedOption: any) => setCategoryName(selectedOption?.value)}
                                            isClearable={true}
                                            isSearchable
                                            onInputChange={handlecategoryInputChange}
                                            placeholder="Choose a Catégorie"
                                            noOptionsMessage={() => " Saisir..."}
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-0.5 serarch-input"
                                        />

                                        {errors.category && touched.category ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.category}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="company" className='text-left pb-2'>Société</label>
                                        <Field
                                            name="company"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.company && touched.company ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                        <Field
                                            name="address"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.address && touched.address ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="departmentcode" className='text-left pb-2'>Code départemental</label>
                                        <Field
                                            name="departmentcode"
                                            type="number"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.departmentcode && touched.departmentcode ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.departmentcode}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="postcode" className='text-left pb-2'>Code postal</label>
                                        <Field
                                            name="postcode"
                                            type="number"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.postcode && touched.postcode ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.postcode}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="city" className='text-left pb-2'>Ville</label>
                                        <Field
                                            name="city"
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.city && touched.city ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="email" className='text-left pb-2'>Courriel</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <div className="pb-2 flex justify-between">
                                            <label htmlFor="logo-upload" className='text-left pb-2'>Ajouter un logo</label>
                                            {
                                                logoUrl ?
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
                                                className={`flex flex-col items-center justify-center w-full ${logoUrl ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}>
                                                {
                                                    Loading && logoUpload ?
                                                        <Spinner />
                                                        :
                                                        <>
                                                            {
                                                                logoUrl ?
                                                                    <div className="flex flex-col items-center justify-center w-full">
                                                                        <a href="" className="w-full text-wrap break-words px-4">{logoUrl?.imageUrl}</a>
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
                                                                    setLogoUpload(e.target.files[0])
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

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <div className="pb-2 flex justify-between">
                                            <label htmlFor="photos-upload" className='text-left'>Ajouter des photos</label>
                                            {
                                                photosUrl ?
                                                    <div onClick={() => handleRemoveUrl(2)} className="cursor-pointer place-items-end pr-4">
                                                        <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="photos-upload"
                                                className={`flex flex-col items-center justify-center w-full ${photosUrl ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                            >
                                                {
                                                    Loading && photosUpload ?
                                                        <Spinner />
                                                        :
                                                        <>
                                                            {
                                                                photosUrl ?
                                                                    <div className="flex flex-col items-center justify-center w-full">
                                                                        <a href={photosUrl} className="w-full text-wrap break-words px-4">{photosUrl?.imageUrl}</a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (Max 400x250px)</p>
                                                            </div>
                                                            <input
                                                                id="photos-upload"
                                                                name="photos-upload"
                                                                type="file"
                                                                className="hidden"
                                                                onChange={(e: any) => {
                                                                    setPhotosUpload(e.target.files[0])
                                                                }}
                                                                multiple
                                                            />
                                                        </>
                                                }
                                            </label>
                                        </div>
                                        {errorMessagephoto ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorMessagephoto}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4 phone-input'>
                                        <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                        <PhoneInput
                                            country={'fr'}
                                            placeholder="N° de téléphone"
                                            value={phoneNumber}
                                            onChange={(value) => { setPhoneNumber(value) }}
                                        />
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="websiteURL" className='text-left pb-2'>URL du site Web</label>
                                        <Field
                                            name="websiteURL"
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />

                                    </div>
                                    <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                                        <button
                                            type="submit"
                                            className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn"
                                        >
                                            {
                                                Loading ?
                                                    <Spinner />
                                                    : "ENVOYER"
                                            }
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Addetablissement;