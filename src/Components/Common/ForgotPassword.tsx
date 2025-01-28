"use client";

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';


import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import Logo from '@/Images/Home/Logo.png';

import { PiWarningCircleBold } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ForgotPassword } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("Entrez un nom d'utilisateur.").required('Saisissez une adresse e-mail telle que exemple@monsite.com.'),
});

const ForgotPasswordForm = ({roleId}:any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('user-auth-token');
            if (tokenString) {
                router.push(`/dashboard/`);
            }
        }
    }, []);

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                if (success?.token) {
                    dispatch(successMessage(""));
                }
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
            <div className="container mx-auto lg:pb-14">
                <div className="bg-gray-200 d-flex justify-center content-center item-center lg:mx-40">
                    <a href="#" className="flex justify-center content-center item-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-64" />
                    </a>
                </div>
                <div className="bg-white pb-14 pt-8 lg:mx-40">
                    <div className="text-center py-4">
                        <h3 className="font-medium">Mot de passe oublié ?</h3>
                    </div>
                    <div className="pt-4 px-14 sm:px-32 md:px-44 lg:px-28 xl:px-40">
                        <Formik
                            initialValues={{
                                userName: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={values => {
                                let updateData = {
                                    email: values?.userName,
                                    roleId: roleId
                                }
                                console.log(updateData);

                                dispatch(ForgotPassword({ updateData }))
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="">
                                    <div className='flex flex-col pt-4'>
                                        <label htmlFor="userName" className='text-left pb-2'>Nom d'utilisateur</label>
                                        <Field name="userName" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.userName && touched.userName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.userName}</div>
                                        ) : null}
                                    </div>
                                    
                                    <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">
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
                    <div className="px-6 mt-10 sm:text-center">
                        <p className="text-center">Tous les processus sont vérifiés et traités par L’INDICATEUR.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordForm;

