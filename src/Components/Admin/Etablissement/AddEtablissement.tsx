"use client";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

import { PiWarningCircleBold } from "react-icons/pi";

const AddetablishmentSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter a first name.'),
    email: Yup.string().email('Invalid email').required('Enter an email address like example@mysite.com.'),
    phone: Yup.number().required('Enter a phone number.'),
});


const Addetablissement = () => {
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
                            postcode: '',
                            city: '',
                            email: '',
                            logo: '',
                            photos: '',
                            phone: '',
                            message: '',
                        }}
                        validationSchema={AddetablishmentSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="md:flex md:flex-wrap md:w-full">
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="name" className='text-left pb-2'>Nom et Prénom</label>
                                    <Field name="name" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.name && touched.name ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégorie</label>
                                    <select id="category" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a Catégorie</option>
                                        <option value="US">1</option>
                                        <option value="CA">2</option>
                                        <option value="FR">3</option>
                                        <option value="DE">4</option>
                                    </select>
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
                                    <Field name="company" className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700' />
                                    {errors.company && touched.company ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="postcode" className='text-left pb-2'>Code postal</label>
                                    <Field name="postcode" className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700' />
                                    {errors.postcode && touched.postcode ? (
                                        <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.postcode}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="city" className='text-left pb-2'>Ville</label>
                                    <Field name="city" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.city && touched.city ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="email" className='text-left pb-2'>Courriel</label>
                                    <Field name="email" type="email" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
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
                                            <input id="dropzone-file" type="file" className="hidden" />
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
                                            <input id="dropzone-file" type="file" className="hidden" multiple />
                                        </label>
                                    </div>
                                    {errors.photos && touched.photos ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.photos}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pr-4'>
                                    <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                    <Field name="phone" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.phone && touched.phone ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className='flex flex-col pt-4 md:pt-8 md:w-1/2 md:pl-4'>
                                    <label htmlFor="message" className='text-left pb-2'>Je souhaite référencer mon établissement</label>
                                    <Field name="message" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                    {errors.message && touched.message ? (
                                        <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                    ) : null}
                                </div>
                                <div className="w-full lg:flex lg:justify-center pb-16 lg:pb-32 lg:pt-8 lg:px-16">
                                    <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn">ENVOYER</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Addetablissement;