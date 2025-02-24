`use client`;

import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddPublicitesForAdmin, GetAllCategoryListForAdmin, GetAllEstablishmentProfileName, GetEtablissementForAdmin } from '@/store/slices/adminAction';
import { ImageUpload, MultipleImageUpload, ImageDelete } from '@/store/slices/commonAction';
import { successMessage, errorMessage, removeEtablishmentData } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

const AddetablishmentSchema = Yup.object().shape({
    departmentcode: Yup.string()
        .required('Entrez un départemental code')
        .min(2, 'Trop court !')
        .max(3, 'rop longtemps !')
});

const Addetablissement = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminCategoryList, AdminCompanyProfilesName, AdminEtablise } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);
    const [gallery, setGallery] = useState<any | null>([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);
    const [errorMessagegallery, setErrorMessagegallery] = useState<string | null>(null);

    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);
    const [categoryName, setCategoryName] = useState<any | null>(null);
    const [searchcategoryName, setSearchcategoryName] = useState<any | null>([]);
    const [searchcompanyName, setSearchcompanyName] = useState<any | null>([]);

    const [value, setValue] = useState('');
    const [presentation, setPresentation] = useState<any | null>(null);
    const [activities, setActivities] = useState<any | null>(null);
    const [partners, setPartners] = useState<any | null>(null);
    const [references, setReferences] = useState<any | null>(null);

    const [updateValue, setUpdateValue] = useState<any | null>(null);

    const companyNameOptions = AdminCompanyProfilesName?.data?.companyNames?.map((data: any) => ({
        value: data.companyName,
        label: data.companyName,
    }));

    const categoryNameOptions = AdminCategoryList?.data?.category?.map((data: any) => ({
        value: data.categoryName,
        label: data.categoryName,
    }));

    useEffect(() => {
        const companyfilteredOptions = companyNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        setSearchcompanyName(companyfilteredOptions);

        const categoryfilteredOptions = categoryNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        setSearchcategoryName(categoryfilteredOptions);
    }, [AdminCategoryList, AdminCompanyProfilesName])

    const handleInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
            const filteredOptions = companyNameOptions.filter((option: any) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            ).slice(0, 500);

            setSearchcompanyName(filteredOptions);
        }
    };

    const handlecategoryInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
            const filteredOptions = categoryNameOptions.filter((option: any) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
            ).slice(0, 500);

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
        setUpdateValue({
            address: AdminEtablise?.data?.existingCompanyProfile?.address || '',
            departmentcode: AdminEtablise?.data?.existingCompanyProfile?.departmentCode || '',
            postcode: AdminEtablise?.data?.existingCompanyProfile?.postalCode || '',
            city: AdminEtablise?.data?.existingCompanyProfile?.city || '',
            email: AdminEtablise?.data?.existingCompanyProfile?.email || '',
            websiteURL: AdminEtablise?.data?.existingCompanyProfile?.websiteURL || '',
        })
        if (AdminEtablise?.data?.existingCompanyProfile?.phoneNumber) {
            setPhoneNumber(AdminEtablise?.data?.existingCompanyProfile?.phoneNumber)
        }
        if (AdminEtablise?.data?.existingCompanyProfile?.companyName) {
            setCompanyName(AdminEtablise?.data?.existingCompanyProfile?.companyName)
        }
        if (AdminEtablise?.data?.existingCompanyProfile?.categoryName) {
            setCategoryName(AdminEtablise?.data?.existingCompanyProfile?.categoryName)
        }
    }, [AdminEtablise])

    useEffect(() => {
        if (token) {
            dispatch(GetAllCategoryListForAdmin({ token, type: 'website' }));
            dispatch(GetAllEstablishmentProfileName({}))
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
                            //     setErrorMessage('Image dimensions should be less than 150x150 pixels.');
                            // }

                            handleUploadImg(e);
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
                            // if (width > 805 || height > 405) {
                            //     setErrorMessagephoto('Image dimensions should be less than 800x400 pixels.');
                            // }
                            // else{
                            handleUploadImg(e);
                            setErrorMessagephoto(null);
                            // }

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
        else if (gallery) {
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxFileSize = 1 * 1024 * 1024;

            const removeItem = (arr: any, index: any) => [...arr.slice(0, index), ...arr.slice(index + 1)];

            console.log("gallery", gallery);

            if (gallery?.length > 6) {
                setErrorMessagegallery("élécharger seulement 6 images");
                gallery?.map((image: any, i: any) => {
                    if (i > 5) {
                        const updatedGallery = removeItem(gallery, i);
                        console.log(updatedGallery);
                        setGallery(updatedGallery === undefined ? [] : updatedGallery);
                    }
                })
            }
            else {
                let validImages: any[] = [];

                gallery?.map((image: any, i: any) => {
                    console.log(image);

                    const fileType: any = image?.type;
                    const fileSize: any = image?.size;

                    if (!supportedFormats.includes(fileType)) {
                        setErrorMessagegallery("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                        const updatedGallery = removeItem(gallery, i);
                        console.log(updatedGallery);
                        setGallery(updatedGallery === undefined ? [] : updatedGallery);
                    }
                    else if (fileSize > maxFileSize) {
                        setErrorMessagegallery('La taille du fichier doit être inférieure à 1 Mo.');
                        const updatedGallery = removeItem(gallery, i);
                        console.log(updatedGallery);
                        setGallery(updatedGallery === undefined ? [] : updatedGallery);
                    }
                    else {
                        validImages.push(image);

                        // Create a FileReader to read the image file
                        const reader = new FileReader();
                        reader.onload = (e: any) => {
                            const img: any = new Image();
                            img.onload = () => {
                                const { width, height } = img;
                                console.log("testing");
                            };
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(image);
                    }
                })

                // Keep only the first 6 valid images
                validImages = validImages.slice(0, 6);

                // Clear error if exactly 6 valid images are added
                if (validImages.length === 6) {
                    // setGallery(validImages);
                    setErrorMessagegallery(null);
                }
            }
        }
    }, [logoUpload, photosUpload, gallery])

    useEffect(() => {
        const urls = gallery?.map((image: any) => URL.createObjectURL(image));
        setPreviewUrls(urls);
    }, [gallery])

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
            else if (success?.data?.isAddCreated) {
                if (gallery?.length > 0) {
                    dispatch(successMessage(""));
                    const formData = new FormData();

                    gallery.forEach((image: any) => {
                        formData.append("photoUrl", image);
                    });

                    formData.append("photoTitle", "photo");
                    formData.append("adId", success?.data?.newAds?.id);

                    let photosData = {
                        photoUrl: gallery,
                        photoTitle: "photo",
                        adId: success?.data?.newAds?.id
                    }

                    dispatch(MultipleImageUpload({ photosData: formData }))
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
                        router.push('/admin/liste-des-publicites/')
                    })
                }

            }
            else if (success?.isPhotoCreated) {
                Swal.fire({
                    title: "Annonces créées",
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    dispatch(successMessage(""));
                    router.push('/admin/liste-des-publicites/')
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
                    // dispatch(successMessage(""));
                    // router.push('/admin/liste-des-publicites/')
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
                dispatch(errorMessage(""));
                if (logoUpload) {
                    setLogoUpload(null)
                }
                else if (photosUpload) {
                    setPhotosUpload(null)
                }
            })
        }
    }, [dispatch, success, errors]);

    console.log(success);


    const handleUploadImg = (e: any) => {
        e.preventDefault();
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

    console.log("AdminEtablise", AdminEtablise);

    const handleFileChange = (event: any) => {
        const files = Array.from(event.target.files);
        const prevfiles = gallery;
        const mergefiles = [...prevfiles, ...files]
        setGallery(mergefiles);
    };

    const handlePhotosRemove = (value: any) => {
        const removeItemArray = (arr: any, index: any) => [...arr.slice(0, index), ...arr.slice(index + 1)];

        // gallery.splice(1, value);
        // previewUrls.splice(1, value);
        const newGallery: any = removeItemArray(gallery, value);
        const newPreviewUrls: any = removeItemArray(previewUrls, value);
        console.log(newGallery);
        console.log(newPreviewUrls);
        setGallery(newGallery);
        setPreviewUrls(newPreviewUrls);

    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Ajouter un Publicité</h3>
                    <hr className="" />
                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: '',
                            category: categoryName || '',
                            company: companyName || '',
                            startdate: '',
                            enddate: '',
                            address: AdminEtablise?.data?.existingCompanyProfile?.address || '',
                            departmentcode: AdminEtablise?.data?.existingCompanyProfile?.departmentCode || '',
                            postcode: AdminEtablise?.data?.existingCompanyProfile?.postalCode || '',
                            city: AdminEtablise?.data?.existingCompanyProfile?.city || '',
                            email: AdminEtablise?.data?.existingCompanyProfile?.email || '',
                            logo: logoUrl?.imageUrl || '',
                            photos: photosUrl?.imageUrl || '',
                            phone: phoneNumber,
                            message: '',
                            images: '1 Écran',
                            photoType: 'poster',
                            status: '',
                            websiteURL: AdminEtablise?.data?.existingCompanyProfile?.websiteURL || '',
                            presentation: presentation || '',
                            activities: activities || '',
                            partners: partners || '',
                            references: references || '',

                        }}
                        validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);

                            let publicitesData = {
                                companyprofileId: CompanyProfileId[0]?.id,
                                companyName: companyName || values?.company,
                                categoryName: categoryName || values?.category,
                                startDate: values?.startdate,
                                endDate: values?.enddate,
                                address: values?.address,
                                departmentCode: values?.departmentcode,
                                postalCode: values?.postcode,
                                city: values?.city,
                                email: values?.email,
                                logo: logoUrl?.imageUrl,
                                photos: photosUrl?.imageUrl,
                                phoneNumber: phoneNumber,
                                description: values?.message,
                                imageSize: values?.images,
                                adBgType: values?.photoType,
                                websiteURL: (values?.websiteURL.includes("https") || values?.websiteURL.includes("http")) ? values?.websiteURL : `https://${values?.websiteURL}`,
                                isPublished: values?.status === "1" ? "true" : "false",
                                presentation: values?.presentation || '',
                                activities: values?.activities || '',
                                partners: values?.partners || '',
                                references: values?.references || '',
                            }

                            dispatch(AddPublicitesForAdmin({ token, publicitesData }));
                        }}
                    >
                        {({ errors, touched, values, setValues }: any) => {

                            useEffect(() => {
                                console.log(values?.company);

                                let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);
                                console.log(CompanyProfileId);

                                if (token && CompanyProfileId[0]?.id) {
                                    dispatch(GetEtablissementForAdmin({ token, id: CompanyProfileId[0]?.id }))
                                }
                                else {
                                    dispatch(removeEtablishmentData(""));
                                }

                            }, [values?.company])

                            // useEffect(() => {
                            //     if (AdminEtablise) {
                            //         setValues((prevValues: any) => ({
                            //             ...prevValues, // Preserve user-entered data
                            //             ""
                            //         }));
                            //     }

                            // }, [AdminEtablise])

                            return (
                                <Form className="md:flex md:flex-wrap md:w-full">
                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="company" className='text-left mb-1'>Société</label>
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
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                                        <Select
                                            options={searchcategoryName}
                                            name="category"
                                            value={categoryNameOptions?.find((option: any) => option.value === categoryName)}
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
                                        <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                        <Field
                                            name="address"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.address && touched.address ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
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

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
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

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="city" className='text-left pb-2'>Ville</label>
                                        <Field
                                            name="city"
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
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tailles</label>
                                        <Field
                                            as="select"
                                            name="images"
                                            id="images"
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="1 Écran">1 Écran</option>
                                            <option value="1/2 Écran">1/2 Écran</option>
                                            <option value="1/4 Écran">1/4 Écran</option>
                                        </Field>
                                        {errors.images && touched.images ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.images}</div>
                                        ) : null}
                                    </div>

                                    {/* <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="photoType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">type de photo</label>
                                    <select id="photoType" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="blank">image de fond</option>
                                        <option value="poster">affiche</option>
                                    </select>
                                    {errors.images && touched.images ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.images}</div>
                                    ) : null}
                                </div> */}

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
                                                className={`flex flex-col items-center justify-center w-full ${logoUrl ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                            >
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
                                            <label htmlFor="photos-upload" className='text-left'>Ajouter des publicites</label>
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
                                                                        <a href={photosUrl} className="w-full text-wrap break-words line-clamp-2 px-4">{photosUrl?.imageUrl}</a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF ({values?.images})</p>
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
                                        <label htmlFor="startdate" className='text-left pb-2'>Date de début</label>
                                        <Field
                                            name="startdate"
                                            type="date"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.startdate && touched.startdate ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.startdate}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="enddate" className='text-left pb-2'>Date de fin</label>
                                        <Field
                                            name="enddate"
                                            type="date"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.enddate && touched.enddate ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.enddate}</div>
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
                                        {errors.websiteURL && touched.websiteURL ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.websiteURL}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="message" className='text-left pb-2'>Description</label>
                                        <Field
                                            name="message"
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Statut</label>
                                        <Field
                                            as="select"
                                            name="status"
                                            id="status"
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Choose a Statut</option>
                                            <option value="0">Brouillon</option>
                                            <option value="1">Publier</option>

                                        </Field>
                                        {errors.status && touched.status ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.status}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <label htmlFor="message" className='text-left pb-2'>Présentation</label>

                                        <ReactQuill
                                            theme="snow"
                                            value={presentation}
                                            onChange={setPresentation}
                                            className="quill-editor border border-gray-300 bg-white"
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <label htmlFor="message" className='text-left pb-2'>Activités</label>

                                        <ReactQuill
                                            theme="snow"
                                            value={activities}
                                            onChange={setActivities}
                                            className="quill-editor border border-gray-300 bg-white"
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <label htmlFor="message" className='text-left pb-2'>Partenaires</label>

                                        <ReactQuill
                                            theme="snow"
                                            value={partners}
                                            onChange={setPartners}
                                            className="quill-editor border border-gray-300 bg-white"
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <label htmlFor="message" className='text-left pb-2'>Références</label>

                                        <ReactQuill
                                            theme="snow"
                                            value={references}
                                            onChange={setReferences}
                                            className="quill-editor border border-gray-300 bg-white"
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <div className="pb-2 flex justify-between">
                                            <label htmlFor="photos-upload" className='text-left'>Ajouter des photos</label>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mb-5">
                                            {
                                                previewUrls?.map((url: any, i: number) => (
                                                    <>
                                                        <div className="" >
                                                            <div onClick={() => handlePhotosRemove(i)} className="cursor-pointer place-items-end">
                                                                <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                            </div>
                                                            <img src={url} alt="" className="w-30 h-20 object-contain" />
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="gallery-upload"
                                                className={`flex flex-col items-center justify-center w-full ${photosUrl ? "h-60 md:h-80" : "h-32 md:h-40"} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100`}
                                            >
                                                {
                                                    Loading ?
                                                        <Spinner />
                                                        :
                                                        <>
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (6 photos)</p>
                                                            </div>
                                                            <input
                                                                id="gallery-upload"
                                                                name="gallery-upload"
                                                                type="file"
                                                                className="hidden"
                                                                // onChange={(e: any) => {
                                                                //     setGallery(e.target.files[0])
                                                                // }}
                                                                onChange={handleFileChange}
                                                                multiple
                                                            />
                                                        </>
                                                }
                                            </label>
                                        </div>
                                        {errorMessagegallery ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorMessagegallery}</div>
                                        ) : null}
                                    </div>

                                    <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16 mt-6">
                                        <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">
                                            {
                                                Loading ?
                                                    <Spinner />
                                                    : "Commencer la publicité"
                                            }

                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div >
        </>
    )
}

export default Addetablissement;