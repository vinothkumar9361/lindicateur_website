`use client`;

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UpdateLegalsOrCGVContent } from '@/store/slices/adminAction';
import { GetLegalesOrCGVContent } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

import Spinner from "@/Components/Common/Loading";

const MentionsLegalesandCGV = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, MentionsLegalsandCGV } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [currentPathname, setCurrentPathname] = useState('');

    const [content, setContent] = useState<any | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
            const currentUrl = new URL(window.location.href);
            setCurrentPathname(currentUrl.pathname);
        }
    }, []);

    useEffect(() => {
        if (token) {
            if (currentPathname.includes("/voir-un-mentions-legales/") || currentPathname.includes("/modifier-un-mentions-legales/")) {
                dispatch(GetLegalesOrCGVContent({ id: 1 }))
            }
            else {
                dispatch(GetLegalesOrCGVContent({ id: 2 }))
            }
        }
    }, [dispatch, token])

    useEffect(() => {
        if (MentionsLegalsandCGV) {
            setContent(MentionsLegalsandCGV?.data?.existingPage?.pageDescription)
        }
    }, [MentionsLegalsandCGV])

    console.log(MentionsLegalsandCGV);

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                if (currentPathname.includes("/modifier-un-mentions-legales/")) {
                    router.push(`/admin/voir-un-mentions-legales/`);
                }
                else {
                    router.push(`/admin/voir-un-cgv/`);
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

    console.log(success);
    console.log(errors);

    const editDetails = () => {
        Swal.fire({
            title: "Etes-vous sûr de vouloir modifier vos données ?",
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: "Modifier"
        }).then((result) => {
            if (result?.isConfirmed) {
                if (currentPathname.includes("/voir-un-mentions-legales/")) {
                    router.push(`/admin/modifier-un-mentions-legales/`);
                }
                else {
                    router.push(`/admin/modifier-un-cgv/`);
                }
            }
        })
    }

    const handleUpdate = () => {

        let updateData = {
            pageDescription: content,
            id: currentPathname.includes("/modifier-un-mentions-legales/") ? 1 : 2
        }

        dispatch(UpdateLegalsOrCGVContent({ token, updateData }))

    }

    return (
        <>
            <div className="w-full lg:w-auto pb-16 lg:pb-32">
                <div>
                    <h3 className="pb-4" >
                        {currentPathname.includes("/voir-un-mentions-legales/") || currentPathname.includes("/voir-un-cgv/") ? "" : "Modifier"}
                        {
                            currentPathname.includes("/voir-un-mentions-legales/") || currentPathname.includes("/modifier-un-mentions-legales/") ?
                                "Mentions Legales"
                                : "CGV"
                        }
                    </h3>
                    <hr className="" />
                </div>
                {
                    currentPathname.includes("/voir-un-mentions-legales/") || currentPathname.includes("/voir-un-cgv/") ?
                        <div className="flex justify-end md:px-4">
                            <button
                                onClick={() => { editDetails() }}
                                className="text-black font-medium p-3 w-64 bg_green rounded-lg mt-4"
                            >
                                {
                                    currentPathname.includes("/voir-un-mentions-legales/") ?
                                        "Modifier mentions legales"
                                        :
                                        "Modifier CGV"
                                }

                            </button>
                        </div>
                        : null
                }

                <div className='flex flex-col w-full md:px-4'>
                    <div className='flex flex-col pt-4 md:pt-8 w-full'>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={(data) => setContent(data)}
                            readOnly={currentPathname.includes("/voir-un-mentions-legales/") || currentPathname.includes("/voir-un-cgv/")}
                            className="quill-editor-2 border border-gray-300 bg-white"
                        />
                    </div>
                </div>

                {
                    currentPathname.includes("/modifier-un-mentions-legales/") || currentPathname.includes("/modifier-un-cgv/") ?
                        <div className="w-full lg:flex lg:justify-center lg:pt-8 lg:px-16">
                            <button
                                type="submit"
                                className="text-black rounded-lg border-2 border-gray-300 hover:border-gray-700 p-3 w-full mt-6 mb-5 lg:mb-3 search-btn"
                                onClick={() => handleUpdate()}
                            >
                                {
                                    Loading ?
                                        <Spinner />
                                        : "sauvegarder"
                                }
                            </button>
                        </div>
                        : null
                }

            </div>
        </>
    )
}

export default MentionsLegalesandCGV;