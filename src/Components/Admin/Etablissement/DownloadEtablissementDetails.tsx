import dynamic from 'next/dynamic';

import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from 'sweetalert2';

import axios from 'axios';
import { jsPDF } from "jspdf";
import sharp from 'sharp';
import Logo from '@/Images/Home/Logo.png';

import Spinner from "@/Components/Common/Loading";


import { Formik, Form, Field, useFormikContext } from 'formik';

import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetEstablishmentProfileReport, GetAllEstablishmentProfileName } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

// import PDFDocument from "pdfkit";
// const PDFKit = dynamic(() => import('pdfkit').then((mod) => mod), { ssr: false });
// import blobStream from "blob-stream";


const DownloadEtablissementDetails = ({ viewDownload, handleCloseDownload }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminCompanyProfilesName } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);

    const companyNameOptions = AdminCompanyProfilesName?.data?.companyNames?.map((data: any) => ({
        value: data.companyName,
        label: data.companyName,
    }));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    const handleDownload = () => {

    };

    useEffect(() => {
        // if (token) {
        dispatch(GetAllEstablishmentProfileName({}))
        // }
    }, [dispatch])


    useEffect(() => {
        if (success) {
            if (success?.data?.pdfIsCreated) {
                Swal.fire({
                    title: success?.data?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    const byteArray = new Uint8Array(success?.data?.pdfBuffer?.data);
                    console.log(byteArray);

                    let pdfBlob = new Blob([byteArray], { type: "application/pdf" }); // Ensure correct MIME type
                    console.log(pdfBlob);

                    let pdfObjectUrl = URL.createObjectURL(pdfBlob);
                    console.log(pdfObjectUrl);

                    const link = document.createElement("a");

                    link.href = pdfObjectUrl;
                    link.setAttribute("download", `${success?.data?.companyName}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(pdfObjectUrl);

                    dispatch(successMessage(""));
                    handleCloseDownload();
                })
            }
            else {
                Swal.fire({
                    title: success?.data?.message,
                    icon: "success",
                    iconColor: "#36AA00",
                    confirmButtonColor: "#36AA00",
                    confirmButtonText: "D'accord",
                    timer: 5000,
                }).then(() => {
                    const byteArray = new Uint8Array(success?.data?.pdfBuffer?.data);

                    console.log(byteArray);

                    // dispatch(successMessage(""));
                })
            }
        }
        else if (errors) {
            Swal.fire({
                title: errors?.data?.message,
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

    console.log(success);


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
                                Télécharger le rapport d'établissement
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal"
                                onClick={() => { handleCloseDownload() }}
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
                                    company: companyName || '',
                                }}
                                onSubmit={values => {

                                    let CompanyProfileId = AdminCompanyProfilesName?.data?.companyNames?.filter((data: any) => data?.companyName == values?.company);

                                    let id = CompanyProfileId[0]?.id;

                                    console.log(id);

                                    dispatch(GetEstablishmentProfileReport({ token, id }))
                                }}
                            >
                                {({ errors, touched, values }: any) => (
                                    <Form className="">
                                        <div className='flex flex-col pt-4 md:pt-8  md:pr-4'>
                                            <label htmlFor="company" className='text-left pb-2'>Société</label>
                                            {/* <Field
                                                as="select"
                                                name="company"
                                                id="company"
                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            >
                                                <option selected value={''}>Choose a Etablissement</option>
                                                {
                                                    AdminCompanyProfilesName?.data?.companyNames?.map((data: any, i: number) => {
                                                        return (
                                                            <>
                                                                <option value={data?.companyName}>{data?.companyName}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Field> */}
                                            <Select
                                                options={companyNameOptions}
                                                name="company"
                                                value={companyNameOptions?.find((option: any) => option.value === values.company)}
                                                onChange={(selectedOption) => setCompanyName(selectedOption?.value)}
                                                isClearable={true}
                                                placeholder="Choose an Establishment"
                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-0.5 serarch-input"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!values?.company}
                                            className={` ${values?.company ? 'text-black cursor-pointer' : 'text-gray-500'}  rounded-lg border-2 border-gray-300 ${values?.company && 'hover:border-gray-700 search-btn'} p-3 w-full mt-6 lg:w-full mb-5 lg:mb-3`}
                                        >
                                            {
                                                Loading ?
                                                    <Spinner />
                                                    : "Télécharger"
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

export default DownloadEtablissementDetails;