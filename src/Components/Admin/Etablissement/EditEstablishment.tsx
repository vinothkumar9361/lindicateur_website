`use client`;

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UpdateEtablissementForAdmin, GetEtablissementForAdmin } from '@/store/slices/adminAction';
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
    const { id } = router.query;
    console.log(id);

    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminEtablise } = useSelector((state: RootState) => state.lindicateur);

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
            dispatch(GetEtablissementForAdmin({ token, id }));
        }
    }, [dispatch, token, id])

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
                router.push('/admin/liste-des-etablissements/')
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
                dispatch(errorMessage(""));
            })
        }
    }, [dispatch, success, errors]);

    console.log(success);
    console.log(errors);
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
                                logo: values?.logo,
                                photos: values?.photos,
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
                        {({ errors, touched }: any) => (
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
                                    <label htmlFor="logo" className='text-left pb-2'>Ajouter un logo</label>
                                    {/* <Field name="logo" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' /> */}
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" disabled={currentPathname.includes("/voir-un-etablissement/")} className="hidden" />
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
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" disabled={currentPathname.includes("/voir-un-etablissement/")} className="hidden" multiple />
                                        </label>
                                    </div>
                                    {errors.photos && touched.photos ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.photos}</div>
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
                                <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                                    <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Modifier"
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

export default EditEstablishment;