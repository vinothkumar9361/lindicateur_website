`use client`;

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetBannersForAdmin, UpdateBannersForAdmin, PublishBannersForAdmin } from '@/store/slices/adminAction';
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
    const { id } = router.query;
    console.log(id);

    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminBanners } = useSelector((state: RootState) => state.lindicateur);
    console.log(AdminBanners);

    const [token, setToken] = useState<string | null>(null);
    const [currentPathname, setCurrentPathname] = useState('');

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
            dispatch(GetBannersForAdmin({ token, id }));
        }
    }, [dispatch, token, id])

    const PublishDetails = (id: any) => {
            Swal.fire({
                title: `Etes-vous sûr de vouloir ${AdminBanners?.data?.existingAds?.isPublished ? "annuler la publication" : "publier"} vos données ?`,
                icon: "warning",
                iconColor: "#CA0505",
                showCancelButton: true,
                cancelButtonColor: "#025BFD",
                confirmButtonColor: "#CA0505",
                confirmButtonText: `${AdminBanners?.data?.existingAds?.isPublished ? "publier" : "annuler la publication"}`
            }).then((result) => {
                if (result?.isConfirmed) {
                    let publishData:any = {
                        id : id,
                        isPublished : !(AdminBanners?.data?.existingAds?.isPublished),
                    }
                    dispatch(PublishBannersForAdmin({ token, publishData }));
                }
            })
        }

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "Okay",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                router.push(`/admin/voir-un-bannieres/${AdminBanners?.data?.existingAds?.id}/`)
            })
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
            })
        }
    }, [dispatch, success, errors]);

    console.log(success);
    console.log(errors);
    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Voir un publicite</h3>
                    <hr className="" />
                </div>
                <div className="flex justify-end gap-5 sm:px-16 md:px-4">
                    <button onClick={() => { router.push(`/admin/modifier-un-bannieres/${AdminBanners?.data?.existingAds?.id}`) }} className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn">Modifier</button>
                    <button onClick={() => { PublishDetails(AdminBanners?.data?.existingAds?.id)}} className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-2 w-32 sm:w-40 md:w-60 mt-6 mb-5 lg:mb-3 search-btn">{ AdminBanners?.data?.existingAds?.isPublished ? "Publier" : "Annuler la publication"}</button>

                </div>
                <div className='sm:px-16 md:px-4'>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            // category: AdminBanners?.data?.existingBanner?.categoryName || '',
                            company: AdminBanners?.data?.existingBanner?.companyName || '',
                            startdate: AdminBanners?.data?.existingBanner?.startDate || '',
                            enddate: AdminBanners?.data?.existingBanner?.endDate || '',
                            postcode: AdminBanners?.data?.existingBanner?.postalCode || '',
                            city: AdminBanners?.data?.existingBanner?.city || '',
                            email: AdminBanners?.data?.existingBanner?.email || '',
                            logo: AdminBanners?.data?.existingBanner?.logo || '',
                            photos: AdminBanners?.data?.existingBanner?.photos || '',
                            phone: AdminBanners?.data?.existingBanner?.phoneNumber || '',
                            message: AdminBanners?.data?.existingBanner?.description || '',
                            // images: AdminBanners?.data?.existingBanner?.imageSize || '',
                            status: AdminBanners?.data?.existingBanner?.isPublished ? "1" : "0",
                        }}
                        validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            console.log(values);
                            let updateData = {
                                companyName: values?.company,
                                // categoryName: values?.category,
                                startDate: values?.startdate,
                                endDate: values?.enddate,
                                postalCode: values?.postcode,
                                city: values?.city,
                                email: values?.email,
                                logo: values?.logo,
                                photos: values?.photos,
                                phoneNumber: values?.phone,
                                description: values?.message,
                                // imageSize: values?.images,
                                isPublished: values?.status === "1" ? true : false,
                                id: AdminBanners?.data?.existingAds?.id,
                            }
                            console.log(updateData);
                            dispatch(UpdateBannersForAdmin({ token, updateData }))
                        }}
                    >
                        {({ errors, touched }: any) => (
                            <Form className="md:flex md:flex-wrap md:w-full">
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="company" className='text-left pb-2'>Société</label>
                                    <Field name="company" disabled={currentPathname.includes("/voir-un-bannieres/")} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                    {errors.company && touched.company ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                    ) : null}
                                </div>
                                {/* <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                                    <Field name="category" disabled={currentPathname.includes("/voir-un-bannieres/")} className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.category && touched.category ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.category}</div>
                                    ) : null}
                                </div> */}
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="startdate" className='text-left pb-2'>Date de début</label>
                                    <Field name="startdate" type="date" disabled={currentPathname.includes("/voir-un-bannieres/")} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                    {errors.startdate && touched.startdate ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.startdate}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="enddate" className='text-left pb-2'>Date de fin</label>
                                    <Field name="enddate" disabled={currentPathname.includes("/voir-un-bannieres/")} type="date" className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                    {errors.enddate && touched.enddate ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.enddate}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
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
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
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

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
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
                                {/* <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tailles</label>
                                    <select
                                        id="images"
                                        disabled={currentPathname.includes("/voir-un-bannieres/")}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="1 Écran (900 x 580 px)">1 Écran (900 x 580 px)</option>
                                        <option value="1/2 Écran (700 x 450 px)">1/2 Écran (700 x 450 px)</option>
                                        <option value="1/4 Écran (500 x 370 px)">1/4 Écran (500 x 370 px)</option>
                                    </select>
                                    {errors.images && touched.images ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.images}</div>
                                    ) : null}
                                </div> */}
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="logo" className='text-left pb-2'>Ajouter un logo</label>
                                    {/* <Field name="logo" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' /> */}
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou faites glisser et déposez</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                disabled={currentPathname.includes("/voir-un-bannieres/")}
                                            />
                                        </label>
                                    </div>
                                    {errors.logo && touched.logo ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.logo}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="photos" className='text-left pb-2'>Ajouter des photos</label>
                                    {/* <Field name="photos" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' /> */}
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou faites glisser et déposez</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                disabled={currentPathname.includes("/voir-un-bannieres/")}
                                                multiple
                                            />
                                        </label>
                                    </div>
                                    {errors.photos && touched.photos ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.photos}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
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
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
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
                                        <option value="0">Brouillon</option>
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
                                                : "Commencer la publicité"
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