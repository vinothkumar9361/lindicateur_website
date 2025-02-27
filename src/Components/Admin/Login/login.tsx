"use client";

import Image from "next/image";
import { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import Logo from '@/Images/Home/Logo.png';
import { PiWarningCircleBold } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Swal from 'sweetalert2';

import { isBrowser, isMobile, browserName, deviceType, isMacOs, isMobileSafari, isAndroid, isChrome, isDesktop, isWindows, isIOS } from 'react-device-detect';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LoginForAdmin, ValitateOtpForAdmin } from '@/store/slices/adminAction';
import { GetIPAddress } from '@/store/slices/commonAction';

import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('Enter a user name.').required('Enter an email address like example@mysite.com.'),
    password: Yup.string().required('Please provide a valid password').min(5, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const OtpSchema = Yup.object().shape({
    otp: Yup.string().required('Please provide a 6 digit code').min(6).max(6),
});

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, IpAddress } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [deviceName, setDeviceName] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState<boolean | null>(false);
    const [showVerfication, setShowVerfication] = useState<boolean | null>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
            if (tokenString) {
                router.push(`/admin/liste-des-etablissements/`);
            }
        }
    }, []);

    useEffect(() => {
        dispatch(GetIPAddress());
    }, []);

    useEffect(() => {
        if (isDesktop) {
            if (isWindows) {
                setDeviceName(`Windows ${browserName} - Web Browser`)
            }
            else if (isMacOs) {
                setDeviceName(`Mac ${browserName} - Web Browser`)
            }
        }
        else if (isMobile) {
            if (isAndroid) {
                setDeviceName(`Android ${browserName} - Web Browser`)
            }
            else if (isIOS) {
                setDeviceName(`IOS ${browserName} - Web Browser`)
            }
        }
    }, [isDesktop, isWindows, isMacOs, isMobile, isAndroid, isIOS, browserName])

    useEffect(() => {
        if (success) {
            if (success?.data?.isValidation) {
                Swal.fire({
                    title: success?.data?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    if (success?.data?.token) {
                        localStorage.setItem('admin-auth-token', success?.data?.token);
                        router.push(`/admin/liste-des-etablissements/`);
                    }
                    dispatch(successMessage(""))
                    setShowVerfication(false);
                })
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
                    setShowVerfication(true);
                    if (success?.token) {
                        localStorage.setItem('admin-auth-token', success?.token);
                        // router.push(`/admin/liste-des-etablissements/`);
                    }
                    dispatch(successMessage(""))
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
                dispatch(errorMessage(""))
            })
        }
    }, [dispatch, success, errors]);

    const resendOtp = () => {
        const tokenString: any = localStorage.getItem('admin-login-details');

        var sendOtp: any = JSON.parse(tokenString);
        console.log("sendOtp", sendOtp);
        dispatch(LoginForAdmin(sendOtp))
    }

    return (
        <>
            <div className="container mx-auto lg:pb-14">
                <div className="bg-gray-200 d-flex justify-center content-center item-center lg:mx-40">
                    <a href="/" className="flex justify-center content-center item-center space-x-3 rtl:space-x-reverse py-4">
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
                                    validationSchema={OtpSchema}
                                    onSubmit={values => {
                                        let otp = {
                                            otp: values?.otp,
                                            device: deviceName,
                                            location: `${IpAddress?.city}, ${IpAddress?.region}, ${IpAddress?.country}`
                                        }

                                        let token = localStorage.getItem('admin-auth-token');
                                        token = token || success?.token;

                                        dispatch(ValitateOtpForAdmin({ token, otp }))
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
                                                    type="number"
                                                    className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                                />
                                                {errors.otp && touched.otp ? (
                                                    <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.otp}</div>
                                                ) : null}
                                            </div>

                                            <button
                                                type="submit"
                                                className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3 search-btn">
                                                {
                                                    Loading ?
                                                        <Spinner />
                                                        : "S'inscrire"
                                                }
                                            </button>
                                            <div onClick={() => { resendOtp() }} className="px-6 mt-8 text-center cursor-pointer">
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
                                        let sendOtp = {
                                            email: values?.userName,
                                            password: values?.password,
                                            roleId: "1"
                                        }
                                        localStorage.setItem('admin-login-details', JSON.stringify(sendOtp));
                                        dispatch(LoginForAdmin(sendOtp))
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="">
                                            <div className='flex flex-col pt-4'>
                                                <label htmlFor="userName" className='text-left pb-2'>Nom d'utilisateur</label>
                                                <Field
                                                    name="userName"
                                                    className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4'
                                                />
                                                {errors.userName && touched.userName ? (
                                                    <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.userName}</div>
                                                ) : null}
                                            </div>
                                            <div className='flex flex-col pt-4'>
                                                <div className="flex justify-between">
                                                    <label htmlFor="password" className='text-left pb-2'>Mot de passe </label>
                                                    <p className="text-xs text-gray-400 text-right pt-1"><a href="/forgot-password-admin/" className="text-blue-500">Mot de passe oublié ?</a></p>
                                                </div>
                                                <div className="relative">
                                                    <Field
                                                        name="password"
                                                        type={`${showPassword ? "text" : "password"}`}
                                                        className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:border-gray-700 shadow pl-4 w-full'
                                                    />
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
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                }
            </div >
        </>
    )
}

export default LoginForm;

