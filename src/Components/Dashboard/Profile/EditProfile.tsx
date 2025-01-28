`use client`;

import { useState, useEffect } from "react";

import { PiWarningCircleBold } from "react-icons/pi";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetCustomerProfile, UpdateCustomerProfile } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Swal from 'sweetalert2';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

const AdminSchema = Yup.object().shape({
    name: Yup.string().required('Enter a user name'),
    email: Yup.string().required('Enter a email.').required('Enter an email address like example@mysite.com.'),
    phone: Yup.string().required('Please provide a valid number').min(10).max(10),
});

const EditProfile = ({ showEdit, closeEdit }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, Customer } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('user-auth-token');
            const userID: any = localStorage.getItem('user-auth-id');
            setToken(tokenString);
            setUserId(userID);
        }
    }, []);

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
                if (token && userId) {
                    dispatch(GetCustomerProfile({ token, userId }));
                }
                closeEdit();
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


    return (
        <>
            <div
                id="static-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="flex justify-center overflow-y-auto overflow-x-hidden fixed top-16 right-0 left-0 z-50 justify-center items-center w-full h-screen lg:absolute custom-modal"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Modifier le profil
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal"
                                onClick={() => { closeEdit() }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: Customer?.data?.existingUser?.customerName || '',
                                    email: Customer?.data?.existingUser?.email || '',
                                    phone: Customer?.data?.existingUser?.phone || '',
                                    company: Customer?.data?.existingUser?.companyName || '',
                                    address: Customer?.data?.existingUser?.address || '',
                                    city: Customer?.data?.existingUser?.city || '',
                                    state: Customer?.data?.existingUser?.state || '',
                                    pincode: Customer?.data?.existingUser?.pincode || '',
                                }}
                                validationSchema={AdminSchema}
                                onSubmit={values => {
                                    let updateData = {
                                        customerName: values?.name,
                                        email: values?.email,
                                        phone: values?.phone,
                                        address: values?.address,
                                        city: values?.city,
                                        state: values?.state,
                                        pincode: values?.pincode,
                                        companyName: values?.company,
                                        roleId: 2
                                    }
                                    console.log(updateData);

                                    dispatch(UpdateCustomerProfile({ token, updateData }));
                                }}
                            >
                                {({ errors, touched }: any) => (
                                    <Form className="flex flex-wrap pb-20">
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pr-2'>
                                            <label htmlFor="name" className='text-left pb-2'>Nom</label>
                                            <Field name="name" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.name && touched.name ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pl-2'>
                                            <label htmlFor="email" className='text-left pb-2'>Email</label>
                                            <Field name="email" type="email" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.email && touched.email ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pr-2'>
                                            <label htmlFor="phone" className='text-left pb-2'>Téléphone</label>
                                            <Field name="phone" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.phone && touched.phone ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pl-2'>
                                            <label htmlFor="company" className='text-left pb-2'>Nom de l'entreprise</label>
                                            <Field name="company" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.company && touched.company ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.company}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pr-2'>
                                            <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                            <Field name="address" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.address && touched.address ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pl-2'>
                                            <label htmlFor="city" className='text-left pb-2'>ville</label>
                                            <Field name="city" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.city && touched.city ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pr-2'>
                                            <label htmlFor="state" className='text-left pb-2'>État</label>
                                            <Field name="state" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.state && touched.state ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.state}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4 w-full sm:w-1/2 sm:pl-2'>
                                            <label htmlFor="pincode" className='text-left pb-2'>code PIN</label>
                                            <Field name="pincode" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.pincode && touched.pincode ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.pincode}</div>
                                            ) : null}
                                        </div>
                                        <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 mb-16 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">
                                            {
                                                Loading ?
                                                    <Spinner />
                                                    : "Soumettre"
                                            }
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;