`use client`;

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { IoSearchOutline } from "react-icons/io5";
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc";

import ReactPaginate from 'react-paginate';

import DownloadEtablissementDetails from "./DownloadEtablissementDetails";
import ImportEtablissementDetails from "./ImportEtablishmentDetails";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllEtablissementListForAdmin, DeleteEtablissementForAdmin } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const EstablishmentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { Loading, success, errors, AdminEtabliselist } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const [viewDownload, setViewDownload] = useState<boolean>(false);
    const [viewImport, setViewImport] = useState<boolean>(false);

    const handleSearch = (value: any) => {
        dispatch(GetAllEtablissementListForAdmin({ token, page: 1, search: value }));
    }

    const handleCloseDownload = () => {
        setViewDownload(false);
        setViewImport(false);
    }
    useEffect(() => {
        if (token) {
            dispatch(GetAllEtablissementListForAdmin({ token, page: 1, sort: sortAsc ? "ASC" : "DESC" }));
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
            dispatch(GetAllEtablissementListForAdmin({ token, page: 1 }));
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
                if (token) {
                    dispatch(GetAllEtablissementListForAdmin({ token, page: 1 }));
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

    const handlePageClick = (event: any) => {
        const newOffset = Number(event.selected) + 1;

        dispatch(GetAllEtablissementListForAdmin({ token, page: newOffset }));
    }

    return (
        <>
            {
                viewDownload && <DownloadEtablissementDetails viewDownload={viewDownload} handleCloseDownload={handleCloseDownload} />
            }
            {
                viewImport && <ImportEtablissementDetails viewImport={viewImport} handleCloseDownload={handleCloseDownload} />
            }
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Liste des établissements</h3>
                    <hr className="" />
                </div>
                <div className="flex flex-col xl:flex-row gap-5 w-full lg:justify-between py-4">
                    <div className="flex gap-8  py-2 px-2">
                        <div className="flex items-center cursor-pointer">
                            <div className="p-1 h-8 border-2 border-gray-500">
                                <IoSearchOutline className="w-6 h-6" />
                            </div>
                            <input
                                className="h-8 w-48 sm:w-60 border-2 border-gray-500 pl-2 outline-none focus:ring-transparent"
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
                    <div className="flex flex-wrap justify-between gap-5 xl:gap-3">
                        <button
                            onClick={() => { setViewImport(true) }}
                            className="text-black font-medium p-2  w-32 sm:w-36 md:w-40 xl:w-32 bg_green rounded-lg cursor-pointer"
                        >
                            Importer
                        </button>
                        <button
                            onClick={() => { setViewDownload(true) }}
                            className="text-black font-medium p-2  w-32 sm:w-36 md:w-40 xl:w-32 bg_green rounded-lg cursor-pointer"
                        >
                            Rapport
                        </button>
                        <button
                            onClick={() => { router.push('/admin/ajouter-un-etablissement/') }}
                            className="text-black font-medium p-2 w-full sm:w-64 md:w-80 xl:w-64 bg_green rounded-lg"
                        >
                            Ajouter un établissement
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full pb-20">
                    {
                        AdminEtabliselist?.data?.data?.length > 0 ?
                            <>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr className="border-2">
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
                                                Statut
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            AdminEtabliselist?.data?.data?.map((data: any, i: number) => {
                                                return (
                                                    <>
                                                        <tr className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2">
                                                            {
                                                                        AdminEtabliselist?.data?.pagination?.currentPage === 1 ?
                                                                            <>
                                                                                {i + 1}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {((AdminEtabliselist?.data?.pagination?.currentPage - 1) * 20) + (i + 1)}
                                                                            </>
                                                                    }
                                                            </th>
                                                            <td className="px-6 py-4 border-2">
                                                                {"I00" + data?.id}
                                                            </td>
                                                            <td className="px-6 py-4 border-2">
                                                                {data?.companyName}
                                                            </td>
                                                            <td className="px-6 py-4 border-2">
                                                                {data?.isApproved ? "Approuvé" : "En attente d'approbation"}
                                                            </td>
                                                            <td className="flex items-center px-6 py-4 ">
                                                                <a
                                                                    onClick={() => {
                                                                        localStorage.setItem('admin-estab-id', data?.id)
                                                                        router.push(`/admin/voir-un-etablissement/`)
                                                                    }}
                                                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline pr-4"
                                                                >
                                                                    Voir
                                                                </a>
                                                                <a onClick={() => {
                                                                    localStorage.setItem('admin-estab-id', data?.id)
                                                                    router.push(`/admin/modifier-an-etablissement/`)
                                                                }}
                                                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Modifier
                                                                </a>
                                                                <a
                                                                    onClick={() => { deleteDetails(data?.id) }}
                                                                    className="cursor-pointer font-medium text-red-600 hover:underline ms-3"
                                                                >
                                                                    Supprimer
                                                                </a>
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
                                    pageCount={AdminEtabliselist?.data?.pagination?.totalPages}
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

export default EstablishmentList;