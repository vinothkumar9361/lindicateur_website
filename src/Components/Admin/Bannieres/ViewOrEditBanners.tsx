`use client`;

import { useRouter } from "next/router";
import { useParams } from 'next/navigation';

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Select from "react-select";

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetBannersForAdmin, UpdateBannersForAdmin, PublishBannersForAdmin, GetAllEstablishmentProfileName } from '@/store/slices/adminAction';
import { ImageUpload } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddetablishmentSchema = Yup.object().shape({
    company: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter a first name.'),
    email: Yup.string().email('Invalid email').required('Enter an email address like example@mysite.com.'),
    phone: Yup.number().required('Enter a phone number.'),
});


const ViewOrEditBanners = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminBanners, AdminCompanyProfilesName } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    const [currentPathname, setCurrentPathname] = useState('');
    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);

    const [initialValue, setInitialValue] = useState<any | null>({
        company: AdminBanners?.data?.existingBanner?.companyName || '',
        startdate: AdminBanners?.data?.existingBanner?.startDate || '',
        enddate: AdminBanners?.data?.existingBanner?.endDate || '',
        address: AdminBanners?.data?.existingBanner?.address || '',
        postcode: AdminBanners?.data?.existingBanner?.postalCode || '',
        city: AdminBanners?.data?.existingBanner?.city || '',
        email: AdminBanners?.data?.existingBanner?.email || '',
        logo: AdminBanners?.data?.existingBanner?.logo || '',
        photos: AdminBanners?.data?.existingBanner?.photos || '',
        phone: AdminBanners?.data?.existingBanner?.phoneNumber || '',
        message: AdminBanners?.data?.existingBanner?.description || '',
        // images: AdminBanners?.data?.existingBanner?.imageSize || '',
        websiteURL: AdminBanners?.data?.existingBanner?.websiteURL || '',
        status: AdminBanners?.data?.existingBanner?.isPublished ? "1" : "0",
    });

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
            const localId = localStorage.getItem('admin-banner-id');
            setId(localId);
            const currentUrl = new URL(window.location.href);
            setCurrentPathname(currentUrl.pathname);
        }
    }, []);

    useEffect(() => {
        if (token && id) {
            dispatch(GetBannersForAdmin({ token, id }));
            dispatch(GetAllEstablishmentProfileName({}))
        }
    }, [dispatch, token, id])

    useEffect(() => {
        if (AdminBanners?.data?.existingBanner) {
            setInitialValue({
                company: AdminBanners?.data?.existingBanner?.companyName || '',
                startdate: AdminBanners?.data?.existingBanner?.startDate || '',
                enddate: AdminBanners?.data?.existingBanner?.endDate || '',
                address: AdminBanners?.data?.existingBanner?.address || '',
                postcode: AdminBanners?.data?.existingBanner?.postalCode || '',
                city: AdminBanners?.data?.existingBanner?.city || '',
                email: AdminBanners?.data?.existingBanner?.email || '',
                logo: AdminBanners?.data?.existingBanner?.logo || '',
                photos: AdminBanners?.data?.existingBanner?.photos || '',
                phone: AdminBanners?.data?.existingBanner?.phoneNumber || '',
                message: AdminBanners?.data?.existingBanner?.description || '',
                // images: AdminBanners?.data?.existingBanner?.imageSize || '',
                websiteURL: AdminBanners?.data?.existingBanner?.websiteURL || '',
                status: AdminBanners?.data?.existingBanner?.isPublished ? "1" : "0",
            })
            setCompanyName(AdminBanners?.data?.existingBanner?.companyName);
        }
    }, [AdminBanners])

    useEffect(() => {
        if (logoUpload) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
            const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

            if (logoUpload) {
                const fileType: any = logoUpload?.type;
                const fileSize: any = logoUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorsMessage("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                    setLogoUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorsMessage("La taille du fichier doit être inférieure à 2 Mo.");
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
            const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

            if (photosUpload) {
                const fileType: any = photosUpload?.type;
                const fileSize: any = photosUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorMessagephoto("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                    setPhotosUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorMessagephoto("La taille du fichier doit être inférieure à 2 Mo.");
                    setPhotosUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img: any = new Image();
                        img.onload = () => {
                            const { width, height } = img;
                            if (width > 1050 || height > 350) {
                                setErrorMessagephoto("Les dimensions de l'image doivent être inférieures à 1050x350 pixels.");
                            }
                            else {
                                handleUploadImg();
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

    const PublishDetails = (id: any) => {
        Swal.fire({
            title: `Etes-vous sûr de vouloir ${AdminBanners?.data?.existingBanner?.isPublished ? "annuler la publication" : "publier"} vos données ?`,
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: `${AdminBanners?.data?.existingBanner?.isPublished ? "annuler la publication" : "publier"}`
        }).then((result) => {
            if (result?.isConfirmed) {
                let publishData: any = {
                    id: AdminBanners?.data?.existingBanner?.id,
                    isPublished: !(AdminBanners?.data?.existingBanner?.isPublished),
                }
                dispatch(PublishBannersForAdmin({ token, publishData }));
            }
        })
    }

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
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    dispatch(successMessage(""));
                    if (!currentPathname.includes("/voir-un-bannieres/")) {
                        router.push(`/admin/voir-un-bannieres/`);
                    }
                    dispatch(GetBannersForAdmin({ token, id }));
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

    const editDetails = (id: any) => {
        Swal.fire({
            title: "Etes-vous sûr de vouloir modifier vos données ?",
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: "Modifier"
        }).then((result) => {
            if (result?.isConfirmed) {
                localStorage.setItem('customer-banner-id', id)
                router.push(`/admin/modifier-un-bannieres/`)
            }
        })
    }

    const handleRemoveUrl = (value: any) => {
        if (value === 1) {
            setInitialValue((prevState: any) => ({
                ...prevState,
                logo: ''
            }));
            setLogoUrl(null);
            setLogoUpload(null);
        }
        else if (value === 2) {
            setInitialValue((prevState: any) => ({
                ...prevState,
                photos: ''
            }));
            setPhotosUrl(null);
            setPhotosUpload(null);
        }
    }

    return (
        <>
            <div className="w-full lg:w-auto pb-20">
                <div>
                    <h3 className="pb-4" >{currentPathname.includes("/voir-un-bannieres/") ? "Voir un bannieres" : "modifier un bannieres"}</h3>
                    <hr className="" />
                </div>
                <div className="flex justify-end gap-5 sm:px-16 md:px-4">
                    {
                        currentPathname.includes("/voir-un-bannieres/") ?
                            <button
                                onClick={() => { editDetails(AdminBanners?.data?.existingBanner?.id) }}
                                className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn"
                            >
                                Modifier
                            </button>
                            : null
                    }

                    <button
                        onClick={() => { PublishDetails(AdminBanners?.data?.existingBanner?.id) }}
                        className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn"
                    >
                        {AdminBanners?.data?.existingBanner?.isPublished ? "Annuler la publication" : "Publier"}
                    </button>
                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        enableReinitialize
                        initialValues={initialValue}
                        // validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);

                            let updateData = {
                                companyprofileId: CompanyProfileId[0]?.id,
                                companyName: companyName || values?.company,
                                startDate: values?.startdate,
                                endDate: values?.enddate,
                                address: values?.address,
                                postalCode: values?.postcode,
                                city: values?.city,
                                email: values?.email,
                                logo: logoUrl ? logoUrl : values?.logo,
                                photos: photosUrl ? photosUrl : values?.photos,
                                phoneNumber: values?.phone,
                                description: values?.message,
                                // imageSize: values?.images,
                                websiteURL: (values?.websiteURL.includes("https") || values?.websiteURL.includes("http")) ? values?.websiteURL : `https://${values?.websiteURL}`,
                                isPublished: values?.status === "1" ? "true" : "false",
                                id: AdminBanners?.data?.existingBanner?.id,
                            }

                            dispatch(UpdateBannersForAdmin({ token, updateData }))
                        }}
                    >
                        {({ errors, touched, values }: any) => (
                            <Form className="md:flex md:flex-wrap md:w-full">
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="company" className='text-left pb-2'>Société</label>
                                    <Select
                                        options={searchcompanyName}
                                        name="company"
                                        value={companyNameOptions?.find((option: any) => option.value === companyName)}
                                        onChange={(selectedOption) => setCompanyName(selectedOption?.value)}
                                        isClearable={true}
                                        isSearchable
                                        onInputChange={handleInputChange}
                                        placeholder="Choose an Establishment"
                                        noOptionsMessage={() => " Saisir..."}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-0.5 serarch-input"
                                    />

                                    {errors.company && touched.company ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="startdate" className='text-left pb-2'>Date de début</label>
                                    <Field
                                        name="startdate"
                                        type="date"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                    />
                                    {errors.startdate && touched.startdate ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.startdate}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="enddate" className='text-left pb-2'>Date de fin</label>
                                    <Field
                                        name="enddate"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        type="date"
                                        className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                    />
                                    {errors.enddate && touched.enddate ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.enddate}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                    <Field
                                        name="address"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                    />
                                    {errors.address && touched.address ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="postcode" className='text-left pb-2'>Code postal</label>
                                    <Field
                                        name="postcode"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                    />
                                    {errors.postcode && touched.postcode ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.postcode}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="city" className='text-left pb-2'>Ville</label>
                                    <Field
                                        name="city"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                    {errors.city && touched.city ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="email" className='text-left pb-2'>Courriel</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                    <Field
                                        name="phone"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                    {errors.phone && touched.phone ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <div className="pb-2 flex justify-between">
                                        <label htmlFor="logo-upload" className='text-left pb-2'>Ajouter un logo</label>
                                        {
                                            (logoUrl || values?.logo) && currentPathname.includes("/modifier-un-bannieres/") ?
                                                <div onClick={() => handleRemoveUrl(1)} className="cursor-pointer place-items-end pr-4">
                                                    <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="logo-upload" className={`flex flex-col items-center justify-center w-full ${logoUrl || values?.logo ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}>
                                            {
                                                Loading && logoUpload ?
                                                    <Spinner />
                                                    :
                                                    <>
                                                        {
                                                            logoUrl || values?.logo ?
                                                                <div className="flex w-full text-wrap break-words text-black">
                                                                    <div className="w-full">
                                                                        <p className="w-full px-4">{logoUrl || values?.logo}</p>
                                                                    </div>
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
                                                            disabled={currentPathname.includes("/voir-un-bannieres/")}
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
                                        <label htmlFor="photos-upload" className='text-left pb-2'>Ajouter des photos</label>
                                        {
                                            (photosUrl || values?.photos) && currentPathname.includes("/modifier-un-bannieres/") ?
                                                <div onClick={() => handleRemoveUrl(2)} className="cursor-pointer place-items-end pr-4">
                                                    <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    <div className="flex items-center justify-center w-full">

                                        <label htmlFor="photos-upload" className={`flex flex-col items-center justify-center w-full ${photosUrl || values?.photos ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}>
                                            {
                                                Loading && photosUpload ?
                                                    <Spinner />
                                                    :
                                                    <>
                                                        {
                                                            photosUrl || values?.photos ?
                                                                <p className="w-full text-wrap break-words px-4 text-black">{photosUrl || values?.photos}</p>
                                                                :
                                                                null
                                                        }
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (MAX. 1050x350px)</p>
                                                        </div>
                                                        <input
                                                            id="photos-upload"
                                                            name="photos-upload"
                                                            type="file"
                                                            className="hidden"
                                                            disabled={currentPathname.includes("/voir-un-bannieres/")}
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
                                    <label htmlFor="message" className='text-left pb-2'>Je souhaite référencer mon établissement</label>
                                    <Field
                                        name="message"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                    {errors.message && touched.message ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="websiteURL" className='text-left pb-2'>URL du site Web</label>
                                    <Field
                                        name="websiteURL"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                    />
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Statut</label>
                                    <Field
                                        as="select"
                                        name="status"
                                        id="status"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected>Choose a Statut</option>
                                        <option value="0">Non ligne</option>
                                        <option value="1">Publier</option>

                                    </Field>
                                    {errors.status && touched.status ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.status}</div>
                                    ) : null}
                                </div>

                                <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                                    <button type="submit" className={`${currentPathname.includes("/voir-un-bannieres/") && "hidden"} text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn`}>
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Commencer la bannieres"
                                        }
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ViewOrEditBanners;