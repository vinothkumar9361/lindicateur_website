`use client`;

import Image from "next/image";
import { useRouter } from 'next/router';

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import Logo from '@/Images/Home/Logo.png';

import { PiWarningCircleBold } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Spinner from "@/Components/Common/Loading";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SignUpForCustomer } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';
import { log } from "console";

const LoginSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Trop court !')
        .max(50, 'rop longtemps !')
        .required('Entrez un prénom.'),
    email: Yup.string().email('E-mail invalide').required('Saisissez une adresse e-mail telle que exemple@monsite.com.'),
    password: Yup.string().required('Veuillez fournir un mot de passe valide.').min(8, 'Le mot de passe est trop court - il doit comporter au moins 8 caractères.').matches(/[a-zA-Z]/, 'Le mot de passe ne peut contenir que des lettres latines.'),
});

const SignupForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);

    const [showPassword, setShowPassword] = useState<boolean | null>(false);
    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);

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
                dispatch(successMessage(''));
                router.push('login');
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
                dispatch(errorMessage(''));
            })
        }
    }, [dispatch, success, errors]);

    console.log(success);
    console.log(errors);

    return (
        <>
            <div className="container mx-auto lg:pb-14">
                <div className="bg-gray-200 d-flex justify-center content-center item-center lg:mx-28">
                    <a href="#" className="flex justify-center content-center item-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-64" />
                    </a>
                </div>
                <div className="bg-white pb-14 pt-8 lg:mx-28 xl:16">
                    <div className="text-center py-4">
                        <h3 className="font-medium">Créer un nouveau compte</h3>
                    </div>
                    <div className="pt-4 px-14 sm:px-32 md:px-44 lg:px-16 ">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                                phone: '',
                                address: '',
                                city: '',
                                state: '',
                                pincode: '',
                                companyName: ''
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={values => {
                                console.log(values);
                                let newCustomer = {
                                    customerName: values?.firstName + "" + values?.lastName,
                                    email: values?.email,
                                    password: values?.password,
                                    phone: phoneNumber,
                                    address: values?.address,
                                    city: values?.city,
                                    state: values?.state,
                                    pincode: values?.pincode,
                                    roleId: 2,
                                    companyName: values?.companyName
                                }

                                dispatch(SignUpForCustomer(newCustomer));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="lg:flex lg:flex-wrap lg:w-full">
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="firstName" className='text-left pb-2'>Nom *</label>
                                        <Field name="firstName" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.firstName && touched.firstName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.firstName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="lastName" className='text-left pb-2'>Prénom</label>
                                        <Field name="lastName" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.lastName && touched.lastName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.lastName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="email" className='text-left pb-2'>Email *</label>
                                        <Field name="email" type="email" className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' />
                                        {errors.email && touched.email ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 phone-input lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="phone" className='text-left pb-2'>Téléphone *</label>
                                        <PhoneInput
                                            country={'fr'}
                                            placeholder="N° de téléphone"
                                            value={phoneNumber}
                                            onChange={(value) => { setPhoneNumber(value) }}
                                        />
                                        {/* <Field name="phone" className='h-10 rounded-lg border-2 border-gray-300 outline-none focus:ring-transparent focus:border-gray-700 pl-4' /> */}
                                        {errors.phone && touched.phone ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="companyName" className='text-left pb-2'>Nom de l'entreprise</label>
                                        <Field name="companyName" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.companyName && touched.companyName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.companyName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="password" className='text-left pb-2'>Mot de passe *</label>
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
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="address" className='text-left pb-2'>Adresse</label>
                                        <Field name="address" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.address && touched.address ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.address}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="city" className='text-left pb-2'>ville</label>
                                        <Field name="city" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.city && touched.city ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.city}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="state" className='text-left pb-2'>État</label>
                                        <Field name="state" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.state && touched.state ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.state}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="pincode" className='text-left pb-2'>code PIN</label>
                                        <Field name="pincode" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                        {errors.pincode && touched.pincode ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.pincode}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:flex lg:justify-center lg:pt-8">
                                        <button type="submit" className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 lg:w-96 mb-5 lg:mb-3 search-btn">
                                            {
                                                Loading ?
                                                    <Spinner />
                                                    : "Créer un compte"
                                            }
                                        </button>
                                    </div>
                                    <div className="w-full text-center">
                                        <p className="px-8 pt-4">Vous avez déjà un compte ? <a href="/login/" className="text-black font-medium underline">Se connecter</a></p>
                                    </div>
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

export default SignupForm;

