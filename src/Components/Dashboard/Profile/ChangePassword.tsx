`use client`;

import { useRouter } from 'next/router';

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";

import Spinner from "@/Components/Common/Loading";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UpdatePassword } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import { Button, Modal } from "flowbite-react";

import { Formik, Form, Field, useFormikContext } from 'formik';

import * as Yup from 'yup';

const AdminSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Entrez votre ancien mot de passe').min(8, 'Le mot de passe est trop court - il doit comporter au moins 8 caractères.').matches(/[a-zA-Z]/, 'Le mot de passe ne peut contenir que des lettres latines.'),
    newPassword: Yup.string().required('Entrez votre nouveau mot de passe').min(8, 'Le mot de passe est trop court - il doit comporter au moins 8 caractères.').matches(/[a-zA-Z]/, 'Le mot de passe ne peut contenir que des lettres latines.'),
});

const ChangePassword = ({ showChangePassword, handleCloseChangePassword }: any) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, Admin } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('user-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "Okay",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                handleCloseChangePassword();
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
            <div
                id="static-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen lg:absolute custom-modal"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Changer le mot de passe
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal"
                                onClick={() => { handleCloseChangePassword() }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    oldPassword:  '',
                                    newPassword:  '',
                                }}
                                validationSchema={AdminSchema}
                                onSubmit={values => {
                                    let updateData = {
                                        oldpassword: values?.oldPassword,
                                        newpassword: values?.newPassword,
                                    }
                                    console.log(updateData);

                                    dispatch(UpdatePassword({ token, updateData }))
                                }}
                            >
                                {({ errors, touched }: any) => (
                                    <Form className="">
                                        <div className='flex flex-col pt-4'>
                                            <label htmlFor="oldPassword" className='text-left pb-2'>ancien mot de passe</label>
                                            <Field name="oldPassword" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.oldPassword && touched.oldPassword ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors?.oldPassword}</div>
                                            ) : null}
                                        </div>
                                        <div className='flex flex-col pt-4'>
                                            <label htmlFor="newPassword" className='text-left pb-2'>nouveau mot de passe</label>
                                            <Field name="newPassword" className='h-10 rounded-lg border-2 border-gray-300 t outline-none focus:border-gray-700 shadow pl-4' />
                                            {errors.newPassword && touched.newPassword ? (
                                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.newPassword}</div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;