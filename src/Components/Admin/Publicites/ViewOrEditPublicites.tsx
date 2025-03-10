`use client`;

import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { PiWarningCircleBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetPublicitesForAdmin, UpdatePublicitesForAdmin, PublishPublicitesForAdmin, GetAllCategoryListForAdmin, GetAllEstablishmentProfileName, GetAllDepartmentCodeForAdmin } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';
import { ImageUpload, MultipleImageUpload, ImageDelete, MultipleImageDelete } from '@/store/slices/commonAction';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddetablishmentSchema = Yup.object().shape({
    departmentcode: Yup.string()
        .required('Entrez un départemental code')
        .min(2, 'Trop court !')
        .max(3, 'rop longtemps !')
});

// const departCodeOption = [
//     { value: '5', label: '5' },
//     { value: '10', label: '10' },
//     { value: '15', label: '15' },
//     { value: '20', label: '20' },
//     { value: '25', label: '25' },
//     { value: '40', label: '40' },
//     { value: '50', label: '50' },
//     { value: '60', label: '60' },
//     { value: '75', label: '75' },
// ]

const ViewOrEditPublicites = () => {
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminPublicites, AdminCategoryList, AdminCompanyProfilesName, CustomerDepartmentCodeList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [currentPathname, setCurrentPathname] = useState('');
    const [logoUpload, setLogoUpload] = useState<any | null>(null);
    const [logoUrl, setLogoUrl] = useState<any | null>(null);
    const [photosUpload, setPhotosUpload] = useState<any | null>(null);
    const [photosUrl, setPhotosUrl] = useState<any | null>(null);
    const [oldGallery, setOldGallery] = useState<any | null>([]);
    const [gallery, setGallery] = useState<any | null>([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [removeGalleryId, setRemoveGalleryId] = useState([]);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);
    const [errorMessagephoto, setErrorMessagephoto] = useState<string | null>(null);
    const [errorMessagegallery, setErrorMessagegallery] = useState<string | null>(null);

    const [presentation, setPresentation] = useState<any | null>(null);
    const [activities, setActivities] = useState<any | null>(null);
    const [partners, setPartners] = useState<any | null>(null);
    const [references, setReferences] = useState<any | null>(null);

    const [selected, setSelected] = useState([]);

    const [initialValue, setInitialValue] = useState<any | null>({
        category: AdminPublicites?.data?.existingAds?.categoryName || '',
        company: AdminPublicites?.data?.existingAds?.companyName || '',
        startdate: AdminPublicites?.data?.existingAds?.startDate || '',
        enddate: AdminPublicites?.data?.existingAds?.endDate || '',
        address: AdminPublicites?.data?.existingAds?.address || '',
        departmentcode: AdminPublicites?.data?.existingAds?.departmentCode || '',
        postcode: AdminPublicites?.data?.existingAds?.postalCode || '',
        city: AdminPublicites?.data?.existingAds?.city || '',
        email: AdminPublicites?.data?.existingAds?.email || '',
        logo: AdminPublicites?.data?.existingAds?.logo || '',
        photos: AdminPublicites?.data?.existingAds?.photos || '',
        phone: AdminPublicites?.data?.existingAds?.phoneNumber || '',
        message: AdminPublicites?.data?.existingAds?.description || '',
        images: AdminPublicites?.data?.existingAds?.imageSize || '',
        photoType: AdminPublicites?.data?.existingAds?.adBgType || 'blank',
        status: AdminPublicites?.data?.existingAds?.isPublished ? "1" : "0",
        websiteURL: AdminPublicites?.data?.existingAds?.websiteURL || '',
    });
    const [categoryName, setCategoryName] = useState<any | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);
    const [searchcategoryName, setSearchcategoryName] = useState<any | null>([]);
    const [searchcompanyName, setSearchcompanyName] = useState<any | null>([]);

    const [departCodeOption, setDepartCodeOption] = useState<any | null>([]);

    const categoryNameOptions = AdminCategoryList?.data?.category?.map((data: any) => ({
        value: data.categoryName,
        label: data.categoryName,
    }));

    const companyNameOptions = AdminCompanyProfilesName?.data?.companyNames?.map((data: any) => ({
        value: data.companyName,
        label: data.companyName,
    }));


    useEffect(() => {
        const departCode = CustomerDepartmentCodeList?.data?.departmentCode?.map((data: any) => ({
            value: data.departmentcodeNumber,
            label: data.departmentcodeNumber,
        }));
        if (departCode?.length > 0) {
            setDepartCodeOption(departCode);
        }
    }, [CustomerDepartmentCodeList])

    useEffect(() => {
        const companyfilteredOptions = companyNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        setSearchcompanyName(companyfilteredOptions);

        const categoryfilteredOptions = categoryNameOptions?.filter((option: any) =>
            option.value.toLowerCase().includes("a".toLowerCase())
        ).slice(0, 500);

        setSearchcategoryName(categoryfilteredOptions);
    }, [AdminCompanyProfilesName, AdminCategoryList])

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
            const localId = localStorage.getItem('admin-publicite-id');
            setId(localId);
            const currentUrl = new URL(window.location.href);
            setCurrentPathname(currentUrl.pathname);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(GetAllCategoryListForAdmin({ token, type: 'website' }));
            dispatch(GetAllEstablishmentProfileName({}));
            dispatch(GetAllDepartmentCodeForAdmin({ token }));
        }
    }, [dispatch, token])

    useEffect(() => {
        if (token && id) {
            dispatch(GetPublicitesForAdmin({ token, id }));
        }
    }, [dispatch, token, id])

    useEffect(() => {
        if (AdminPublicites?.data?.existingAds) {
            setInitialValue({
                category: AdminPublicites?.data?.existingAds?.categoryName || '',
                company: AdminPublicites?.data?.existingAds?.companyName || '',
                startdate: AdminPublicites?.data?.existingAds?.startDate || '',
                enddate: AdminPublicites?.data?.existingAds?.endDate || '',
                address: AdminPublicites?.data?.existingAds?.address || '',
                departmentcode: AdminPublicites?.data?.existingAds?.departmentCode || '',
                postcode: AdminPublicites?.data?.existingAds?.postalCode || '',
                city: AdminPublicites?.data?.existingAds?.city || '',
                email: AdminPublicites?.data?.existingAds?.email || '',
                logo: AdminPublicites?.data?.existingAds?.logo || '',
                photos: AdminPublicites?.data?.existingAds?.photos || '',
                phone: AdminPublicites?.data?.existingAds?.phoneNumber || '',
                message: AdminPublicites?.data?.existingAds?.description || '',
                images: AdminPublicites?.data?.existingAds?.imageSize || '',
                photoType: AdminPublicites?.data?.existingAds?.adBgType || 'blank',
                status: AdminPublicites?.data?.existingAds?.isPublished ? "1" : "0",
                websiteURL: AdminPublicites?.data?.existingAds?.websiteURL || '',
            })

            const departmentCodeArray = AdminPublicites?.data?.existingAds?.departmentCode?.split(",");

            const departmentCodeSelect = departmentCodeArray?.map((data: any) => ({
                value: data,
                label: data,
            }));

            setSelected(departmentCodeSelect);

            setCategoryName(AdminPublicites?.data?.existingAds?.categoryName);
            setCompanyName(AdminPublicites?.data?.existingAds?.companyName);
            setPresentation(AdminPublicites?.data?.existingAds?.presentation || '');
            setActivities(AdminPublicites?.data?.existingAds?.activities || '');
            setPartners(AdminPublicites?.data?.existingAds?.partners || '');
            setReferences(AdminPublicites?.data?.existingAds?.references || '');
            setOldGallery(AdminPublicites?.data?.existingAds?.photolists);
        }
    }, [AdminPublicites])

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
                            // else{
                            handleUploadImg();
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
                    setErrorMessagephoto("La taille du fichier doit être inférieure à 1 Mo.");
                    setPhotosUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const img: any = new Image();
                        img.onload = () => {
                            const { width, height } = img;
                            // if (width > 905 || height > 585) {
                            //     setErrorMessagephoto("Les dimensions de l'image doivent être inférieures à 900x580 pixels.");
                            // }
                            // else {
                            handleUploadImg();
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

            let oldGalleryLength = Number(oldGallery?.length);
            let updateGalleryLength = Number(gallery?.length);
            let totalCount = oldGalleryLength + updateGalleryLength;

            if (totalCount > 6) {
                setErrorMessagegallery("élécharger seulement 6 images");
                gallery?.map((image: any, i: any) => {
                    if ((oldGalleryLength + i + 1) > 6) {
                        const updatedGallery = removeItem(gallery, i);
                        setGallery(updatedGallery === undefined ? [] : updatedGallery);
                    }
                })
            }
            else {
                let validImages: any[] = [];

                gallery?.map((image: any, i: any) => {
                    const fileType: any = image?.type;
                    const fileSize: any = image?.size;

                    if (!supportedFormats.includes(fileType)) {
                        setErrorMessagegallery("Format d'image non pris en charge. Veuillez télécharger un fichier JPG, JPEG, PNG, WEBP ou GIF.");
                        const updatedGallery = removeItem(gallery, i);
                        setGallery(updatedGallery === undefined ? [] : updatedGallery);
                    }
                    else if (fileSize > maxFileSize) {
                        setErrorMessagegallery('La taille du fichier doit être inférieure à 1 Mo.');
                        const updatedGallery = removeItem(gallery, i);
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

    const PublishDetails = (id: any) => {
        Swal.fire({
            title: `Etes-vous sûr de vouloir ${AdminPublicites?.data?.existingAds?.isPublished ? "annuler la publication" : "publier"} vos données ?`,
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: `${AdminPublicites?.data?.existingAds?.isPublished ? "annuler la publication" : "publier"}`
        }).then((result) => {
            if (result?.isConfirmed) {
                let publishData: any = {
                    id: id,
                    isPublished: !(AdminPublicites?.data?.existingAds?.isPublished),
                }
                dispatch(PublishPublicitesForAdmin({ token, publishData }));
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
            else if (success?.data?.isAddUpdated) {
                if (AdminPublicites?.data?.existingAds?.photolists?.length !== oldGallery?.length) {
                    dispatch(successMessage(""));

                    let deletePhotos = {
                        photoIds: removeGalleryId
                    }

                    dispatch(MultipleImageDelete({ deletePhotos }))
                }
                if (gallery?.length > 0) {
                    dispatch(successMessage(""));
                    const formData = new FormData();
                    let id: any = localStorage.getItem("admin-publicite-id");

                    gallery.forEach((image: any) => {
                        formData.append("photoUrl", image);
                    });

                    formData.append("photoTitle", "photo");
                    formData.append("adId", id);

                    dispatch(MultipleImageUpload({ photosData: formData }))

                    setGallery(null);
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
            else if (success?.isPhotoDeleted) {
                if (gallery?.length > 0) {
                    dispatch(successMessage(""));
                    const formData = new FormData();
                    let id: any = localStorage.getItem("admin-publicite-id");

                    gallery.forEach((image: any) => {
                        formData.append("photoUrl", image);
                    });

                    formData.append("photoTitle", "photo");
                    formData.append("adId", id);

                    dispatch(MultipleImageUpload({ photosData: formData }))
                    setGallery(null);
                }
                else {
                    Swal.fire({
                        title: success?.message,
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
                    dispatch(successMessage(""));
                    if (!currentPathname.includes("/voir-un-publicite/")) {
                        router.push(`/admin/voir-un-publicite/`)
                    }
                    dispatch(GetPublicitesForAdmin({ token, id }));
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

    useEffect(() => {
        const urls = gallery?.map((image: any) => URL.createObjectURL(image));
        setPreviewUrls(urls);
    }, [gallery])

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
                localStorage.setItem('customer-publicite-id', id)
                router.push(`/admin/modifier-un-publicite/`)
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

    const handleFileChange = (event: any) => {
        const files = Array.from(event.target.files);
        const prevfiles = gallery;
        const mergefiles = [...prevfiles, ...files]
        setGallery(mergefiles);
    };

    const handlePhotosRemove = (value: any) => {
        const removeItemArray = (arr: any, index: any) => [...arr.slice(0, index), ...arr.slice(index + 1)];

        const newGallery: any = removeItemArray(gallery, value);
        const newPreviewUrls: any = removeItemArray(previewUrls, value);
        setGallery(newGallery);
        setPreviewUrls(newPreviewUrls);

    }

    const handleOldPhotosRemove = (value: any) => {
        const removeItemArray = (arr: any, index: any) => [...arr.slice(0, index), ...arr.slice(index + 1)];
        const removeItemId = (arr: any, index: any) => [...arr.splice(0, index), ...arr.splice(index + 1)];

        const updateGallery: any = removeItemArray(oldGallery, value);
        const deleteGalleryId: any = oldGallery[value];

        setRemoveGalleryId((prevValues): any => ([...prevValues, deleteGalleryId?.id]))

        setOldGallery(updateGallery);
    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" > {currentPathname.includes("/voir-un-publicite/") ? "Voir un publicite" : "Modifier an publicite"}</h3>
                    <hr className="" />
                </div>
                <div className="flex justify-end gap-5 sm:px-16 md:px-4">
                    {
                        currentPathname.includes("/voir-un-publicite/") ?
                            <button
                                onClick={() => { editDetails(AdminPublicites?.data?.existingAds?.id) }}
                                className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn"
                            >
                                Modifier
                            </button>
                            : null
                    }

                    <button
                        onClick={() => { PublishDetails(AdminPublicites?.data?.existingAds?.id) }}
                        className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn"
                    >
                        {AdminPublicites?.data?.existingAds?.isPublished ? "Annuler la publication" : "Publier"}
                    </button>

                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        enableReinitialize
                        initialValues={initialValue}
                        // validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);

                            let departmentcodeSelected: any = selected.map((data: any) => (data?.value));
                            departmentcodeSelected = departmentcodeSelected.join(", ")

                            let updateData = {
                                companyprofileId: CompanyProfileId[0]?.id,
                                companyName: companyName || values?.company,
                                categoryName: categoryName || values?.category,
                                startDate: values?.startdate,
                                endDate: values?.enddate,
                                address: values?.address,
                                departmentCode: departmentcodeSelected,
                                postalCode: values?.postcode,
                                city: values?.city,
                                email: values?.email,
                                logo: logoUrl ? logoUrl : values?.logo,
                                photos: photosUrl ? photosUrl : values?.photos,
                                phoneNumber: values?.phone,
                                description: values?.message,
                                imageSize: values?.images,
                                adBgType: values?.photoType,
                                websiteURL: (values?.websiteURL.includes("https") || values?.websiteURL.includes("http")) ? values?.websiteURL : `https://${values?.websiteURL}`,
                                isPublished: values?.status === "1" ? "true" : "false",
                                id: AdminPublicites?.data?.existingAds?.id,
                                presentation: presentation,
                                activities: activities,
                                partners: partners,
                                references: references,
                            }
                            dispatch(UpdatePublicitesForAdmin({ token, updateData }))
                        }}
                    >
                        {({ errors, touched, values }: any) => {
                            return (
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
                                            isDisabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            isDisabled={currentPathname.includes("/voir-un-publicite/")}
                                        />
                                        {errors.category && touched.category ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.category}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="startdate" className='text-left pb-2'>Date de début</label>
                                        <Field
                                            name="startdate"
                                            type="date"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            type="date"
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.enddate && touched.enddate ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.enddate}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                        <Field
                                            name="address"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        />
                                        {errors.address && touched.address ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="departmentcode" className='text-left pb-2'>Code départemental</label>
                                        {/* <Field
                                            name="departmentcode"
                                            type="number"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4'
                                        /> */}
                                        <MultiSelect
                                            options={departCodeOption}
                                            value={selected}
                                            onChange={setSelected}
                                            className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4 multi-select'
                                            labelledBy="Select Options"
                                            overrideStrings={{
                                                "selectSomeItems": "Choisissez vos options...",
                                                "allItemsAreSelected": "Tous sélectionnés",
                                                "clearSearch": "Claire",
                                                "search": "Tapez pour rechercher...",
                                                "selectAll": "Sélectionner tout",
                                                "noOptions": "Aucune option disponible",
                                            }}
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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

                                    {/* <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <div className="pb-2 flex justify-between">
                                            <label htmlFor="logo-upload" className='text-left pb-2'>Ajouter un logo</label>
                                            {
                                                (logoUrl || values?.logo) && currentPathname.includes("/modifier-un-publicite/") ?
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
                                                                            <p className="w-full px-4 line-clamp-2">{logoUrl || values?.logo}</p>
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
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF </p>
                                                            </div>
                                                            <input
                                                                id="logo-upload"
                                                                name="logo-upload"
                                                                type="file"
                                                                className="hidden"
                                                                disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                    </div> */}

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <div className="pb-2 flex justify-between">
                                            <label htmlFor="photos-upload" className='text-left'>Ajouter des photos</label>
                                            {
                                                (photosUrl || values?.photos) && currentPathname.includes("/modifier-un-publicite/") ?
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
                                                                    <p className="w-full text-wrap break-words px-4 text-black line-clamp-3">{photosUrl || values?.photos}</p>
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
                                                                disabled={currentPathname.includes("/voir-un-publicite/")}
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
                                        <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                        <Field
                                            name="phone"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.phone && touched.phone ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="message" className='text-left pb-2'>Description</label>
                                        <Field
                                            name="message"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                        <label htmlFor="websiteURL" className='text-left pb-2'>URL du site Web</label>
                                        <Field
                                            name="websiteURL"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
                                            className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                        />
                                        {errors.websiteURL && touched.websiteURL ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.websiteURL}</div>
                                        ) : null}
                                    </div>

                                    <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Statut</label>
                                        <Field
                                            as="select"
                                            name="status"
                                            id="status"
                                            disabled={currentPathname.includes("/voir-un-publicite/")}
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

                                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                                        <label htmlFor="message" className='text-left pb-2'>Présentation</label>

                                        <ReactQuill
                                            theme="snow"
                                            value={presentation}
                                            onChange={setPresentation}
                                            readOnly={currentPathname.includes("/voir-un-publicite/")}
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
                                            readOnly={currentPathname.includes("/voir-un-publicite/")}
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
                                            readOnly={currentPathname.includes("/voir-un-publicite/")}
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
                                            readOnly={currentPathname.includes("/voir-un-publicite/")}
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
                                                oldGallery?.map((url: any, i: number) => (
                                                    <>
                                                        <div className="" >
                                                            {
                                                                currentPathname.includes("/modifier-un-publicite/") ?
                                                                    <div onClick={() => handleOldPhotosRemove(i)} className="cursor-pointer place-items-end">
                                                                        <TiDelete className="w-6 h-6 hover:text-red-500" />
                                                                    </div>
                                                                    : null
                                                            }

                                                            <img src={url?.photoUrl} alt="" className="w-30 h-20 object-contain" />
                                                        </div>
                                                    </>
                                                ))
                                            }
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
                                                                disabled={currentPathname.includes("/voir-un-publicite/")}
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

                                    <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                                        <button
                                            type="submit"
                                            className={`${currentPathname.includes("/voir-un-publicite/") && "hidden"} text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn`}
                                        >
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
            </div>
        </>
    )
}

export default ViewOrEditPublicites;