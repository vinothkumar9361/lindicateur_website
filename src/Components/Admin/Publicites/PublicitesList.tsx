'use client';

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { IoSearchOutline } from "react-icons/io5";
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc";


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllPublicitesListForAdmin, DeletePublicitesForAdmin } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const PublicitesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { Loading, success, errors, AdminPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    const handleSearch = (value: any) => {
        dispatch(GetAllPublicitesListForAdmin({ token, page: 1, search: value }));
    }

    useEffect(() => {
        if (token) {
            dispatch(GetAllPublicitesListForAdmin({ token, page: 1, sort: sortAsc ? "ASC" : "DESC" }));
        }
    }, [sortAsc, token]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(GetAllPublicitesListForAdmin({ token, page: 1 }));
        }
    }, [dispatch, token])


    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "Okay",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                dispatch(GetAllPublicitesListForAdmin({ token, page: 1 }));
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
            })
        }
    }, [dispatch, success, errors]);

    const deleteDetails = (id: any) => {
        Swal.fire({
            title: "Etes-vous sûr de vouloir supprimer vos données ?",
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: "Supprimer"
        }).then((result) => {
            if (result?.isConfirmed) {
                dispatch(DeletePublicitesForAdmin({ token, id }));
            }
        })
    }

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Liste des publicités</h3>
                    <hr className="" />
                </div>
                <div className="flex flex-col lg:flex-row gap-5 w-full lg:justify-between py-4">
                    <div className="flex gap-8  lg:gap-14 py-2 px-2">
                        <div className="flex items-center cursor-pointer">
                            <div className="p-1 h-8 border-2 border-gray-500">
                                <IoSearchOutline className="w-6 h-6" />
                            </div>
                            {/* <p>Recherche</p> */}
                            <input className="h-8 w-60 border-2 border-gray-500 pl-2 outline-none focus:ring-transparent" placeholder="Recherche" onChange={(e) => { handleSearch(e.target.value) }} />
                        </div>
                        {/* <div className="flex gap-2 items-center">
                            <CiFilter className="w-6 h-6" />
                            <p>Filtre</p>
                        </div> */}
                        <div
                            onClick={() => {
                                setSortAsc(!sortAsc)
                            }}
                            className="flex gap-2 items-center cursor-pointer">
                            {
                                sortAsc ?
                                    <FcAlphabeticalSortingAz className="w-6 h-6" />
                                    : <FcAlphabeticalSortingZa className="w-6 h-6" />
                            }
                            <p>Trier</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => { router.push('/admin/ajouter-un-publicite/') }}
                            className="text-black font-medium p-3 w-full w-64 bg_green rounded-lg"
                        >
                            Ajouter un Publicité
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full pb-20">
                    {
                        AdminPublicitesList?.data?.data?.length > 0 ?
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr className="border-2">
                                        <th scope="col" className="p-4 border-2">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            No.
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Société ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Nom de la société
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Code postal
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Date de début / de fin
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Statut
                                        </th>
                                        <th scope="col" className="px-6 py-3 border-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AdminPublicitesList?.data?.data?.map((data: any, i: number) => {
                                            return (
                                                <>
                                                    <tr className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="w-4 p-4 border-2">
                                                            <div className="flex items-center">
                                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label className="sr-only">checkbox</label>
                                                            </div>
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2">
                                                            {i + 1}
                                                        </th>
                                                        <td className="px-6 py-4 border-2">
                                                            {"I00" + data?.id}
                                                        </td>
                                                        <td className="px-6 py-4 border-2">
                                                            {data?.companyName}
                                                        </td>
                                                        <td className="px-6 py-4 border-2">
                                                            {data?.postalCode}
                                                        </td>
                                                        <td className="px-6 py-4 border-2">
                                                            {data?.startDate + " / " + data?.endDate}
                                                        </td>
                                                        <td className="px-6 py-4 border-2">
                                                            {data?.isPublished ? "publié" : "inédite"}
                                                        </td>
                                                        <td className="flex items-center px-6 py-4 ">
                                                            <a
                                                                onClick={() => {
                                                                    localStorage.setItem('admin-publicite-id', data?.id)
                                                                    router.push(`/admin/voir-un-publicite/`)
                                                                }}
                                                                className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >Voir</a>
                                                            <a onClick={() => { deleteDetails(data?.id) }} className="cursor-pointer font-medium text-red-600 hover:underline ms-3">Supprimer</a>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <div className="py-20 text-center">
                                <h3 className="text-gray-500 font bold">aucune donnée</h3>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PublicitesList;