import dynamic from 'next/dynamic';

import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from 'sweetalert2';

import { PiWarningCircleBold } from "react-icons/pi";

import axios from 'axios';
import { jsPDF } from "jspdf";
import sharp from 'sharp';
import Logo from '@/Images/Home/Logo.png';

import Spinner from "@/Components/Common/Loading";


import { Formik, Form, Field, useFormikContext } from 'formik';

import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  GetAllEstablishmentProfileName } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

// import PDFDocument from "pdfkit";
// const PDFKit = dynamic(() => import('pdfkit').then((mod) => mod), { ssr: false });
// import blobStream from "blob-stream";


const ImportEtablissementDetails = ({ viewImport, handleCloseDownload }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [fileUpload, setFileUpload] = useState<any | null>(null);
    const [errorsMessage, setErrorsMessage] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    const handleUpload = () => {

    };

    useEffect(() => {
        if (fileUpload) {
            const supportedFormats = ['text/csv'];
            const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes

            if (fileUpload) {
                const fileType: any = fileUpload?.type;
                const fileSize: any = fileUpload?.size;

                if (!supportedFormats.includes(fileType)) {
                    setErrorsMessage("Format non pris en charge. Veuillez télécharger un fichier CSV.");
                    setFileUpload(null);
                }
                else if (fileSize > maxFileSize) {
                    setErrorsMessage("La taille du fichier doit être inférieure à 1 Mo.");
                    setFileUpload(null);
                }
                else {
                    // Create a FileReader to read the image file
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        const text = e.target?.result as string;

                        // Basic CSV structure validation (Checking headers)
                        const lines = text.split("\n");
                        const headers = lines[0]?.split(",");

                        // if (!headers.includes("Name") || !headers.includes("Email")) {
                        //     setErrorsMessage("Le fichier CSV doit contenir les colonnes 'Name' et 'Email'.");
                        //     return;
                        // }

                        setErrorsMessage(null);
                    };
                    reader.readAsText(fileUpload);
                }
            }
            else {
                setErrorsMessage(null);
                setFileUpload(null);
            }
        }
    }, [fileUpload])

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

    console.log(fileUpload);


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
                                Établissement d'importation
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
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    {
                                        fileUpload ?
                                            <div className="flex items-center justify-center w-full">
                                                <p className="w-full text-wrap break-words px-4 text-center">{fileUpload?.name}</p>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">fichier csv uniquement</p>
                                    </div>
                                    <input
                                        id="fileUpload"
                                        name="fileUpload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e: any) => {
                                            setFileUpload(e.target.files[0])
                                        }}
                                    />
                                </label>
                            </div>

                            {errorsMessage ? (
                                <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errorsMessage}</div>
                            ) : null}

                            <div className="w-full flex justify-center">
                                <button
                                    type="submit"
                                    onClick={() => { handleUpload()}}
                                    className="w-80 text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 mt-6 mb-5 lg:mb-3 search-btn"
                                >
                                    {
                                        Loading ?
                                            <Spinner />
                                            : "Télécharger"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImportEtablissementDetails;