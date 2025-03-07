 'use client';

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { IoSearchOutline } from "react-icons/io5";
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc";

import ReactPaginate from 'react-paginate';
import { MultiSelect } from "react-multi-select-component";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  DeletePublicitesForAdmin } from '@/store/slices/adminAction';
import { GetAllPublicitesListForCustomer } from '@/store/slices/customerAction';

import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const PublicitesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { Loading, success, errors, AdminPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    console.log("AdminPublicitesList", AdminPublicitesList);
    
    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    const handleSearch = (value: any) => {
        dispatch(GetAllPublicitesListForCustomer({ token, page: 1, search: value }));
    }

    useEffect(() => {
        if (token) {
            dispatch(GetAllPublicitesListForCustomer({ token, page: 1, sort: sortAsc ? "ASC" : "DESC" }));
        }
    }, [sortAsc, token]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('user-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(GetAllPublicitesListForCustomer({ token, page: 1 }));
        }
    }, [dispatch, token])

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
                dispatch(GetAllPublicitesListForCustomer({ token, page: 1 }));
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

    const handlePageClick = (event: any) => {
        const newOffset = Number(event.selected) + 1;

        dispatch(GetAllPublicitesListForCustomer({ token, page: newOffset }));
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
                            <input
                                className="h-8 w-60 border-2 border-gray-500 pl-2 outline-none focus:ring-transparent"
                                placeholder="Recherche"
                                onChange={(e) => { handleSearch(e.target.value) }}
                            />
                        </div>
                        <div
                            onClick={() => { setSortAsc(!sortAsc) }}
                            className="flex gap-2 items-center cursor-pointer">
                            {
                                sortAsc ?
                                    <FcAlphabeticalSortingAz className="w-6 h-6" />
                                    : <FcAlphabeticalSortingZa className="w-6 h-6" />
                            }
                            <p>Trier</p>
                        </div>
                    </div>
                    {/* <div>
                        <button
                            className="text-black font-medium p-3 w-full w-64 bg_green rounded-lg"
                        >
                            <a href="/admin/ajouter-un-publicite/">
                                Ajouter un Publicité
                            </a>
                        </button>
                    </div> */}
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full pb-20">
                    {
                        AdminPublicitesList?.data?.allAds?.length > 0 ?
                            <>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr className="border-2">
                                            <th scope="col" className="px-6 py-3 border-2">
                                                No.
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-2">
                                                Publicités ID
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
                                            AdminPublicitesList?.data?.allAds?.map((data: any, i: number) => {
                                                return (
                                                    <>
                                                        <tr className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                                                        router.push(`/dashboard/voir-un-publicite/`)
                                                                    }}
                                                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >Voir</a>
                                                                {/* <a onClick={() => { deleteDetails(data?.id) }} className="cursor-pointer font-medium text-red-600 hover:underline ms-3">Supprimer</a> */}
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    pageCount={AdminPublicitesList?.data?.pagination?.totalPages}
                                    previousLabel="<"
                                    renderOnZeroPageCount={null}
                                    className='custom-pagination'
                                />
                            </>
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