"use client";

import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";

import Logo from '@/Images/Home/Logo.png';

import { PiWarningCircleBold } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('Enter a user name.'),
    password: Yup.string().required('Please provide a valid password').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean | null>(false);
    const [showVerfication, setShowVerfication] = useState<boolean | null>(true);

    return (
        <>
            <div className="container mx-auto lg:pb-14">
                <div className="bg-gray-200 d-flex justify-center content-center item-center lg:mx-40">
                    <a href="#" className="flex justify-center content-center item-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-64" />
                    </a>
                </div>
                {
                    showVerfication ?
                        <div className="bg-white pb-14  pt-8 lg:mx-40">
                            <div className="text-center py-4">
                                <h3 className="font-medium">Vérification en deux étapes</h3>
                            </div>
                            <div className="pt-4 px-14 sm:px-32 md:px-44 lg:px-28 xl:px-40">
                                <Formik
                                    initialValues={{
                                        otp: '',
                                    }}
                                    validationSchema={LoginSchema}
                                    onSubmit={values => {
                                        console.log(values);
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="">
                                            <div className='flex flex-col pt-4'>
                                                <label
                                                    htmlFor="otp"
                                                    className='text-left pb-2'>
                                                    Saisissez le code envoyé à votre adresse électronique
                                                </label>
                                                <Field
                                                    name="otp"
                                                    className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                                />
                                                {errors.otp && touched.otp ? (
                                                    <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.otp}</div>
                                                ) : null}
                                            </div>

                                            <button
                                                type="submit"
                                                className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">
                                                S'inscrire
                                            </button>
                                            <div className="px-6 mt-8 text-center cursor-pointer">
                                                <p className="text-sky-400 ">Vous n'avez pas reçu le code ?</p>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        :
                        <div className="bg-white pb-14  pt-8 lg:mx-40">
                            <div className="text-center py-4">
                                <h3 className="font-medium">Connexion administrateur</h3>
                            </div>
                            <div className="pt-4 px-14 sm:px-32 md:px-44 lg:px-28 xl:px-40">
                                <Formik
                                    initialValues={{
                                        userName: '',
                                        password: ''
                                    }}
                                    validationSchema={LoginSchema}
                                    onSubmit={values => {
                                        console.log(values);
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
                                                    <p className="text-xs text-gray-400 text-right pt-1">Mot de passe oublié ?</p>
                                                </div>
                                                <div className="relative">
                                                    <Field name="password" type={`${showPassword ? "text" : "password"}`} className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:border-gray-700 shadow pl-4 w-full' />
                                                    <span
                                                        className='login-eye-icon'
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
                                                <input type="checkbox" className="shadow txt_green" />
                                                <p>Souvenez-vous de moi</p>
                                            </div>
                                            <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">Connexion</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default LoginForm;

