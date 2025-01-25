`use client`;

import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc";
import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllEtablissementApprovalForAdmin, DeleteEtablissementForAdmin, ApprovedOrUnApprovalEtablissementForAdmin } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const EstablishmentApproval = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminUnapprovalEtabliselist } = useSelector((state: RootState) => state.lindicateur);

    console.log(AdminUnapprovalEtabliselist);

    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const pageLimit = 20;

    const handleSearch = (value: any) => {
        dispatch(GetAllEtablissementApprovalForAdmin({ token, page: 1, search: value }));
    }
    useEffect(() => {
        if (token) {
            dispatch(GetAllEtablissementApprovalForAdmin({ token, page: 1, sort: sortAsc ? "ASC" : "DESC" }));
        }

    }, [sortAsc]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(GetAllEtablissementApprovalForAdmin({ token, page: 1, pageLimit }));
        }
    }, [dispatch, token, pageLimit])

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
                dispatch(DeleteEtablissementForAdmin({ token, id }));
            }
        })
    }

    const approvedOrUnapprovalDetails = (isApproved: any, id: any) => {
        Swal.fire({
            title: `Etes-vous sûr de vouloir ${isApproved ? "approuver" : "refuser"} vos données ?`,
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: `${isApproved ? "approuver" : "refuser"}`
        }).then((result) => {
            if (result?.isConfirmed) {
                let updateData = {
                    id: id,
                    isApproved: isApproved ? true : false,
                    isRejected : isApproved ? false : true,
                }
                dispatch(ApprovedOrUnApprovalEtablissementForAdmin({ token, updateData }));
            }
        })
    }

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
                dispatch(GetAllEtablissementApprovalForAdmin({ token, page: 1, pageLimit }));
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

    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Établissements en attente</h3>
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
                        <button className="text-black font-medium p-3 w-full w-64 bg_green rounded-lg">Ajouter un établissement</button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full pb-20">
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
                                    Publicité
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
                                AdminUnapprovalEtabliselist?.data?.data?.map((data: any, i: number) => {
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
                                                {/* <td className="px-6 py-4 border-2">
                                                    oui
                                                </td> */}
                                                <td className="px-6 py-4 border-2">
                                                    {data?.isApproved ? "Approuvé" : "En attente d'approbation"}
                                                </td>
                                                <td className="px-6 border-2">
                                                    <a onClick={() => { approvedOrUnapprovalDetails(true, data?.id) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Approuver</a>
                                                    <a onClick={() => { approvedOrUnapprovalDetails(false, data?.id) }} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Refuser</a>
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    <a onClick={() => { router.push(`/admin/voir-un-etablissement/${data?.id}`) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline pr-4">Voir</a>
                                                    <a onClick={() => { router.push(`/admin/modifier-an-etablissement/${data?.id}`) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Modifier</a>
                                                    <a onClick={() => { deleteDetails(data?.id) }} className="cursor-pointer font-medium text-red-600 hover:underline ms-3">Supprimer</a>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EstablishmentApproval;