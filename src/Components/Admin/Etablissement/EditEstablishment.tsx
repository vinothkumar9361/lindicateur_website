`use client`;

import { useRouter } from "next/router";
import { useParams } from 'next/navigation';

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UpdateEtablissementForAdmin, GetEtablissementForAdmin } from '@/store/slices/adminAction';
import { ImageUpload } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddetablishmentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter a first name.'),
    email: Yup.string().email('Invalid email').required('Enter an email address like example@mysite.com.'),
    phone: Yup.number().required('Enter a phone number.'),
});


const EditEstablishment = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    console.log(id);

    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminEtablise } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [currentPathname, setCurrentPathname] = useState('');
    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
            const currentUrl = new URL(window.location.href);
            setCurrentPathname(currentUrl.pathname);
        }
    }, []);

    useEffect(() => {
        if (token && id) {
            dispatch(GetEtablissementForAdmin({ token, id }));
        }
    }, [dispatch, token, id])

    useEffect(() => {
        if (logoUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

            if (logoUpload) {
                const fileType: any = logoUpload?.type;
                const fileSize: any = logoUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorsMessage('Unsupported image format. Please upload a JPG, JPEG, PNG, WEBP, or GIF file.');
                }
                else if (fileSize > maxFileSize) {
                    setErrorsMessage('File size should be less than 2 MB.');
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
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(logoUpload);
                }
            }
            else {
                setErrorsMessage(null);
            }
        }
        else if (photosUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

            if (photosUpload) {
                const fileType: any = photosUpload?.type;
                const fileSize: any = photosUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorMessagephoto('Unsupported image format. Please upload a JPG, JPEG, PNG, WEBP, or GIF file.');
                }
                else if (fileSize > maxFileSize) {
                    setErrorMessagephoto('File size should be less than 2 MB.');
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img: any = new Image();
                        img.onload = () => {
                            const { width, height } = img;
                            // if (width > 805 || height > 405) {
                            //     setErrorMessagephoto('Image dimensions should be less than 800x400 pixels.');
                            // }
                            // else{
                            handleUploadImg();
                            // }

                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(photosUpload);
                }
            }
            else {
                setErrorMessagephoto(null);
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
                    confirmButtonText: "Okay",
                    timer: 5000,
                }).then(() => {
                    if (logoUpload) {
                        setLogoUrl(success?.data?.imageUrl);
                        setLogoUpload(null)
                    }
                    else if (photosUpload) {
                        setPhotosUrl(success?.data?.imageUrl);
                        setPhotosUpload(null)
                    }
                    dispatch(successMessage(""));
                })
            }
            else {
                Swal.fire({
                    title: success?.data?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "Okay",
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
                confirmButtonText: "Okay",
                timer: 5000,
            }).then(() => {
                dispatch(errorMessage(""));
            })
        }
    }, [dispatch, success, errors]);

    console.log(success);
    console.log(errors);

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

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Modifier an établissement</h3>
                    <hr className="" />
                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: AdminEtablise?.data?.existingCompanyProfile?.fullName || '',
                            category: AdminEtablise?.data?.existingCompanyProfile?.categoryName || '',
                            company: AdminEtablise?.data?.existingCompanyProfile?.companyName || '',
                            postcode: AdminEtablise?.data?.existingCompanyProfile?.postalCode || '',
                            city: AdminEtablise?.data?.existingCompanyProfile?.city || '',
                            email: AdminEtablise?.data?.existingCompanyProfile?.email || '',
                            logo: AdminEtablise?.data?.existingCompanyProfile?.logo || '',
                            photos: AdminEtablise?.data?.existingCompanyProfile?.photos || '',
                            phone: AdminEtablise?.data?.existingCompanyProfile?.phoneNumber || '',
                            websiteURL: AdminEtablise?.data?.existingCompanyProfile?.websiteURL || '',
                        }}
                        // validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            console.log(values);
                            let updateData = {
                                fullName: values?.name,
                                categoryName: values?.category,
                                companyName: values?.company,
                                postalCode: values?.postcode,
                                email: values?.email,
                                logo: logoUrl ? logoUrl : values?.logo,
                                photos: photosUrl ? photosUrl : values?.photos,
                                phoneNumber: values?.phone,
                                type: "admin",
                                city: values?.city,
                                id: AdminEtablise?.data?.existingCompanyProfile?.id,
                                websiteURL: values?.websiteURL
                            }
                            console.log(updateData);
                            dispatch(UpdateEtablissementForAdmin({ token, updateData }))
                        }}
                    >
                        {({ errors, touched, values }: any) => (
                            <Form className="md:flex md:flex-wrap md:w-full">
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="name" className='text-left pb-2'>Nom et Prénom</label>
                                    <Field
                                        name="name"
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        disabled={currentPathname.includes("/voir-un-etablissement/")}
                                    />
                                    {errors.name && touched.name ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                                    <Field
                                        name="category"
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        disabled={currentPathname.includes("/voir-un-etablissement/")}
                                    />
                                    {errors.category && touched.category ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.category}</div>
                                    ) : null}
                                </div>
                                {/* <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                    <label htmlFor="category" className='text-left pb-2'>Catégorie</label>
                                    <Field name="category" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.category && touched.category ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.category}</div>
                                    ) : null}
                                </div> */}
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="company" className='text-left pb-2'>Société</label>
                                    <Field name="company" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                    {errors.company && touched.company ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="postcode" className='text-left pb-2'>Code postal</label>
                                    <Field name="postcode" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                    {errors.postcode && touched.postcode ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.postcode}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="city" className='text-left pb-2'>Ville</label>
                                    <Field name="city" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.city && touched.city ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="email" className='text-left pb-2'>Courriel</label>
                                    <Field name="email" type="email" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.email && touched.email ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="logo-upload" className='text-left pb-2'>Ajouter un logo</label>
                                    {/* <Field name="logo" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' /> */}
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                            {
                                                logoUrl || values?.logo ?
                                                    <p className="w-full text-wrap break-words px-4 text-black">{logoUrl || values?.logo}</p>
                                                    :
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 150x150px)</p>
                                                    </div>
                                            }

                                            <input
                                                id="logo-upload"
                                                name="logo-upload"
                                                type="file"
                                                className="hidden"
                                                disabled={currentPathname.includes("/voir-un-etablissement/")}
                                                onChange={(e: any) => {
                                                    setLogoUpload(e.target.files[0])
                                                }}
                                                multiple
                                            />
                                        </label>
                                    </div>
                                    {errorsMessage ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorsMessage}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="photos-upload" className='text-left pb-2'>Ajouter des photos</label>
                                    {/* <Field name="photos" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' /> */}
                                    <div className="flex items-center justify-center w-full">

                                        <label htmlFor="photos-upload" className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                            {
                                                photosUrl || values?.photos ?
                                                    <p className="w-full text-wrap break-words px-4 text-black">{photosUrl || values?.photos}</p>
                                                    :
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                            }
                                            <input
                                                id="photos-upload"
                                                name="photos-upload"
                                                type="file"
                                                className="hidden"
                                                disabled={currentPathname.includes("/voir-un-etablissement/")}
                                                onChange={(e: any) => {
                                                    setPhotosUpload(e.target.files[0])
                                                }}
                                                multiple
                                            />
                                        </label>
                                    </div>
                                    {errorMessagephoto ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorMessagephoto}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                    <Field name="phone" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.phone && touched.phone ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="websiteURL" className='text-left pb-2'>URL du site Web</label>
                                    <Field name="websiteURL" disabled={currentPathname.includes("/voir-un-etablissement/")} className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.message && touched.message ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                    ) : null}
                                </div>
                                <div className="w-full lg:flex lg:justify-center pb-20 lg:pb-32 lg:pt-8 lg:px-16">
                                    {
                                        currentPathname.includes("/voir-un-etablissement/") ?
                                            null
                                            :
                                            <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">
                                                {
                                                    Loading ?
                                                        <Spinner />
                                                        : "Modifier"
                                                }
                                            </button>

                                    }

                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default EditEstablishment;