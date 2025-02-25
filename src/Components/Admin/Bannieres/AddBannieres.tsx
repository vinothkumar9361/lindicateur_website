`use client`;

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddBannersForAdmin, GetAllEstablishmentProfileName, GetEtablissementForAdmin } from '@/store/slices/adminAction';
import { ImageUpload, ImageDelete } from '@/store/slices/commonAction';
import { successMessage, errorMessage, removeEtablishmentData } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';

import * as Yup from 'yup';

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

const AddetablishmentSchema = Yup.object().shape({
    company: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter a first name.'),
    email: Yup.string().email('Invalid email').required('Enter an email address like example@mysite.com.'),
    phone: Yup.number().required('Enter a phone number.'),
});


const AddBannieres = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminCompanyProfilesName, AdminEtablise } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);

    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);

    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);

    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);
    const [searchcompanyName, setSearchcompanyName] = useState<any | null>([]);

    const companyNameOptions = AdminCompanyProfilesName?.data?.companyNames?.map((data: any) => ({
        value: data.companyName,
        label: data.companyName,
    }));

    useEffect(() => {
        const companyfilteredOptions = companyNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        setSearchcompanyName(companyfilteredOptions);

    }, [AdminCompanyProfilesName])

    const handleInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
            const filteredOptions = companyNameOptions.filter((option: any) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            ).slice(0, 500);

            setSearchcompanyName(filteredOptions);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    // useEffect(() => {
    //     if (AdminEtablise?.data?.existingCompanyProfile?.phoneNumber) {
    //         setPhoneNumber(AdminEtablise?.data?.existingCompanyProfile?.phoneNumber)
    //     }
    //     if (AdminEtablise?.data?.existingCompanyProfile?.companyName) {
    //         setCompanyName(AdminEtablise?.data?.existingCompanyProfile?.companyName)
    //     }
    // }, [AdminEtablise])

    useEffect(() => {
        if (token) {
            dispatch(GetAllEstablishmentProfileName({}))
        }
    }, [dispatch, token])


    const formik = useFormik({
        initialValues: {
            name: '',
            company: '',
            startdate: '',
            enddate: '',
            address: '',
            postcode: '',
            city: '',
            email: '',
            logo: '',
            photos: '',
            phone: '',
            message: '',
            status: '',
            websiteURL: '',
        },
        onSubmit: async (values: any) => {
            console.log(values);
            let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);

            let bannerData = {
                companyprofileId: CompanyProfileId[0]?.id,
                companyName: values?.company,
                startDate: values?.startdate,
                endDate: values?.enddate,
                address: values?.address,
                postalCode: values?.postcode,
                city: values?.city,
                email: values?.email,
                logo: values?.logo?.imageUrl,
                photos: values?.photos?.imageUrl,
                phoneNumber: values?.phone,
                description: values?.message,
                websiteURL: (values?.websiteURL.includes("https") || values?.websiteURL.includes("http")) ? values?.websiteURL : `https://${values?.websiteURL}`,
                isPublished: values?.status === "1" ? "true" : "false",
            }

            dispatch(AddBannersForAdmin({ token, bannerData }));

        },
        // validationSchema={}
        validate: (values: any) => {
            const errors: any = {};

            if (!values?.startdate) {
                errors.startdate = "Entrez un Date de début";
            }
            if (!values?.enddate) {
                errors.enddate = "Entrez un Date de fin";
            }

            console.log(values.startdate);
            console.log(errors);

            // if (errors.departmentcode || errors.startdate || errors.enddate) {
            //     Swal.fire({
            //         title: errors?.departmentcode || errors?.startdate || errors?.enddate,
            //         icon: "error",
            //         iconColor: "#CA0505",
            //         confirmButtonColor: "#CA0505",
            //         confirmButtonText: "D'accord",
            //         timer: 5000,
            //     }).then(() => {
            //     })
            // }
            return errors;
        }
    })


    useEffect(() => {
        if (!formik?.values?.company) {
            dispatch(removeEtablishmentData(""));
            return;
        }

        let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == formik?.values?.company);
        console.log(CompanyProfileId);

        if (token && CompanyProfileId[0]?.id) {
            dispatch(GetEtablissementForAdmin({ token, id: CompanyProfileId[0]?.id }))
        }
        else {
            dispatch(removeEtablishmentData(""));
        }

    }, [formik?.values?.company])

    useEffect(() => {
        formik.setFieldValue("address", AdminEtablise?.data?.existingCompanyProfile?.address || '');
        formik.setFieldValue("departmentcode", AdminEtablise?.data?.existingCompanyProfile?.departmentCode || '');
        formik.setFieldValue("postcode", AdminEtablise?.data?.existingCompanyProfile?.postalCode || '');
        formik.setFieldValue("city", AdminEtablise?.data?.existingCompanyProfile?.city || '');
        formik.setFieldValue("email", AdminEtablise?.data?.existingCompanyProfile?.email || '');
        formik.setFieldValue("websiteURL", AdminEtablise?.data?.existingCompanyProfile?.websiteURL || '');
        formik.setFieldValue("phone", AdminEtablise?.data?.existingCompanyProfile?.phoneNumber || '');
    }, [AdminEtablise])


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
                            // if (width > 1055 || height > 355) {
                            //     setErrorsMessage('Image dimensions should be less than 1050x350 pixels.');
                            // }
                            // else {
                            handleUploadImg();
                            setErrorsMessage(null);
                            // }

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
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
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
                            if (width > 1055 || height > 355) {
                                setErrorMessagephoto("Les dimensions de l'image doivent être inférieures à 1050x350 pixels.");
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
                        formik.setFieldValue("logo", success?.data || '');
                        setLogoUpload(null)
                    }
                    else if (photosUpload) {
                        formik.setFieldValue("photos", success?.data || '');
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
                    router.push('/admin/liste-des-bannieres/')
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
                    setLogoUpload(null)
                }
                else if (photosUpload) {
                    setPhotosUpload(null)
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
            formik.setFieldValue("logo", '');
            setLogoUpload(null);
        }
        else if (value === 2) {
            dispatch(ImageDelete({ id: photosUrl?.id }))
            formik.setFieldValue("photos", '');
            setPhotosUpload(null);
        }
    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Ajouter une bannière</h3>
                    <hr className="" />
                </div>
                <div className='sm:px-16 md:px-4'>
                    <form action="" className="md:flex md:flex-wrap md:w-full" onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="company" className='text-left mb-1'>Société</label>
                            <Select
                                options={searchcompanyName}
                                name="company"
                                value={companyNameOptions?.find((option: any) => option.value === formik?.values?.company)}
                                onChange={(selectedOption) => { formik.setFieldValue("company", selectedOption?.value) }}
                                isClearable={true}
                                isSearchable
                                onInputChange={handleInputChange}
                                placeholder="Choose an Establishment"
                                noOptionsMessage={() => " Saisir..."}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-0.5 serarch-input"
                            />

                            {formik.errors.company && formik.touched.company && typeof formik.errors.company === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.company}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                            <label htmlFor="startdate" className='text-left pb-2'>Date de début</label>
                            <input
                                name="startdate"
                                type="date"
                                value={formik.values.startdate}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                            />
                            {formik.errors.startdate && formik.touched.startdate && typeof formik.errors.startdate === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.startdate}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="enddate" className='text-left pb-2'>Date de fin</label>
                            <input
                                name="enddate"
                                type="date"
                                value={formik.values.enddate}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                            />
                            {formik.errors.enddate && formik.touched.enddate && typeof formik.errors.enddate === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.enddate}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                            <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                            <input
                                type="text"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                            />
                            {formik.errors.address && formik.touched.address && typeof formik.errors.address === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.address}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="postcode" className='text-left pb-2'>Code postal</label>
                            <input
                                name="postcode"
                                type="number"
                                value={formik.values.postcode}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                            />
                            {formik.errors.postcode && formik.touched.postcode && typeof formik.errors.postcode === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.postcode}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                            <label htmlFor="city" className='text-left pb-2'>Ville</label>
                            <input
                                type="text"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                            />
                            {formik.errors.city && formik.touched.city && typeof formik.errors.city === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.city}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="email" className='text-left pb-2'>Courriel</label>
                            <input
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                            />
                            {formik.errors.email && formik.touched.email && typeof formik.errors.email === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 phone-input md:pl-4'>
                            <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                            <PhoneInput
                                country={'fr'}
                                placeholder="N° de téléphone"
                                inputProps={{ id: "phone", name: "phone" }}
                                value={formik?.values?.phone}
                                onChange={(value) => { formik.setFieldValue("phone", value) }}
                            />
                        </div>

                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <div className="pb-2 flex justify-between">
                                <label htmlFor="logo-upload" className='text-left'>Ajouter un logo</label>
                                {
                                    formik?.values?.logo ?
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
                                    className={`flex flex-col items-center justify-center w-full ${formik?.values?.logo ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                >
                                    {
                                        Loading && logoUpload ?
                                            <Spinner />
                                            :
                                            <>
                                                {
                                                    formik?.values?.logo ?
                                                        <div className="flex flex-col items-center justify-center w-full">
                                                            <a href={formik?.values?.logo?.imageUrl} className="w-full text-wrap break-words px-4">{formik?.values?.logo?.imageUrl}</a>
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
                                    formik?.values?.photos ?
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
                                    className={`flex flex-col items-center justify-center w-full ${formik?.values?.photos ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                >
                                    {
                                        Loading && photosUpload ?
                                            <Spinner />
                                            :
                                            <>
                                                {
                                                    formik?.values?.photos ?
                                                        <div className="flex flex-col items-center justify-center w-full">
                                                            <a href={formik?.values?.photos?.imageUrl} className="w-full text-wrap break-words line-clamp-2 px-4">{formik?.values?.photos?.imageUrl}</a>
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (Max 1050x350px)</p>
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


                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="websiteURL" className='text-left pb-2'>URL du site Web</label>
                            <input
                                type="text"
                                name="websiteURL"
                                value={formik.values.websiteURL}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                            />
                            {formik.errors.websiteURL && formik.touched.websiteURL && typeof formik.errors.websiteURL === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.websiteURL}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                            <label htmlFor="message" className='text-left pb-2'>Description</label>
                            <input
                                type="text"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                            />
                            {formik.errors.message && formik.touched.message && typeof formik.errors.message === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.message}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Statut</label>
                            <select
                                name="status"
                                id="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a Statut</option>
                                <option value="0">Brouillon</option>
                                <option value="1">Publier</option>

                            </select>
                            {formik.errors.status && formik.touched.status && typeof formik.errors.status === 'string' && (
                                <div className="text-red-500 flex text-left gap-1 py-2">
                                    <PiWarningCircleBold className="w-5 h-5" />
                                    {formik.errors.status}
                                </div>
                            )}
                        </div>

                        <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                            <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">
                                {
                                    Loading ?
                                        <Spinner />
                                        : "Commencer la bannière"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddBannieres;