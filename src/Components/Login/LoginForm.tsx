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
import { LoginForCustomer } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("Entrez un nom d'utilisateur.").required('Saisissez une adresse e-mail telle que exemple@monsite.com.'),
    password: Yup.string().required('Veuillez fournir un mot de passe valide.').min(8, 'Le mot de passe est trop court - il doit comporter au moins 8 caractères.').matches(/[a-zA-Z]/, 'Le mot de passe ne peut contenir que des lettres latines.'),
});

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);

    const [showPassword, setShowPassword] = useState<boolean | null>(false);

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
                confirmButtonText: "Okay",
                timer: 5000,
            }).then(() => {
                if (success?.token) {
                    localStorage.setItem('user-auth-token', success?.token);
                    localStorage.setItem('user-auth-id', success?.existingUser?.id);
                    dispatch(successMessage(""));
                    router.push(`/dashboard/`);

                }
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
            <div className="container mx-auto lg:pb-14">
                <div className="bg-gray-200 d-flex justify-center content-center item-center lg:mx-40">
                    <a href="#" className="flex justify-center content-center item-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-64" />
                    </a>
                </div>
                <div className="bg-white pb-14 pt-8 lg:mx-40">
                    <div className="text-center py-4">
                        <h3 className="font-medium">Se connecter</h3>
                    </div>
                    <div className="pt-4 px-14 sm:px-32 md:px-44 lg:px-28 xl:px-40">
                        <Formik
                            initialValues={{
                                userName: '',
                                password: ''
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={values => {
                                let data = {
                                    email: values?.userName,
                                    password: values?.password,
                                    roleId: "2"
                                }
                                console.log(data);

                                dispatch(LoginForCustomer(data))
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
                                    <div className='flex flex-col pt-4'>
                                        <div className="flex justify-between">
                                            <label htmlFor="password" className='text-left pb-2'>Mot de passe </label>
                                            <p className="text-xs text-gray-400 text-right pt-1"><a href="/forgot-password/" className="text-blue-500">Mot de passe oublié ?</a></p>
                                        </div>
                                        <div className="relative">
                                            <Field name="password" type={`${showPassword ? "text" : "password"}`} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:border-gray-700 shadow pl-4 w-full' />
                                            <span
                                                className='login-eye-icon cursor-pointer'
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash className='icon' /> : <FaEye className='icon' />}
                                            </span>
                                        </div>
                                        {errors.password && touched.password ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <input type="checkbox" className="shadow txt_green cursor-pointer" />
                                        <p>Souvenez-vous de moi</p>
                                    </div>
                                    <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Connexion"
                                        }
                                    </button>
                                    <div className="text-center">
                                        <p className="font-bold text-xl">OU</p>
                                    </div>
                                    <button className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6  mb-5 lg:mb-3 search-btn"><Link href='/signup/'>Créer un nouveau compte</Link></button>

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

export default LoginForm;

