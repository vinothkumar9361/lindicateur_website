"use client";

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import { IoSearchOutline } from "react-icons/io5";
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc";

import ReactPaginate from 'react-paginate';

import AddSecteur from "./AddSecteur";
import EditSecteur from './EditSecteur'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllSecteursListForAdmin, DeleteSecteursForAdmin } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const data = [
    {
        id: "0001",
        name: "test",
        imageUrl: "",

    },
    {
        id: "0002",
        name: "test2",
        imageUrl: "",

    },
    {
        id: "0003",
        name: "test3",
        imageUrl: "",

    },
]

const NosSecteursList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, AdminCategoryList, SecteurList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [showAdd, setShowAdd] = useState<boolean | null>(false);
    const [showEdit, setShowEdit] = useState<boolean | null>(false);
    const [secteurData, setSecteurData] = useState<boolean | null>(false);

    const handleCloseAdd = () => {
        setShowAdd(false);
    }
    const handleCloseEdit = () => {
        setShowEdit(false);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        dispatch(GetAllSecteursListForAdmin({ type: "admin" }))
    }, [])

    console.log(SecteurList?.data?.serviceList);

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.data.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
                if (token) {
                    dispatch(GetAllSecteursListForAdmin({ type: 'admin' }));
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

    const editDetails = (data: any) => {
        Swal.fire({
            title: "Êtes-vous sûr de vouloir modifier vos données ?",
            icon: "warning",
            iconColor: "#CA0505",
            showCancelButton: true,
            cancelButtonColor: "#025BFD",
            confirmButtonColor: "#CA0505",
            confirmButtonText: "Modifier"
        }).then((result) => {
            if (result?.isConfirmed) {
                setShowEdit(true);
                setSecteurData(data);
            }
        })
    }

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
                dispatch(DeleteSecteursForAdmin({ token, id }))
            }
        })
    }

    return (
        <>
            {
                showAdd ?
                    <AddSecteur
                        showAdd={showAdd}
                        closeAdd={handleCloseAdd}
                    />
                    : null
            }
            {
                showEdit ?
                    <EditSecteur
                        showEdit={showEdit}
                        closeEdit={handleCloseEdit}
                        data={secteurData}
                    />
                    : null
            }

            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Liste des nos secteurs</h3>
                    <hr className="" />
                </div>

                <div className="flex flex-col lg:flex-row gap-5 w-full lg:justify-between py-4">
                    <div className="flex gap-8  lg:gap-14 py-2 px-2">
                        {/* <div className="flex items-center cursor-pointer">
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
                        </div> */}
                    </div>
                    <div>
                        <button
                            onClick={() => { setShowAdd(true) }}
                            className="text-black font-medium p-3 w-full w-64 bg_green rounded-lg"
                        >
                            Ajouter une secteurs
                        </button>
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full pb-20">
                    {
                        SecteurList?.data?.serviceList?.length > 0 ?
                            <>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr className="border-2">
                                            <th scope="col" className="px-6 py-3 border-2">
                                                No.
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-2">
                                                secteur ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-2">
                                                Nom de la secteur
                                            </th>
                                            <th scope="col" className="px-6 py-3 border-2">
                                                URL de l'image
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
                                            SecteurList?.data?.serviceList?.map((data: any, i: number) => {
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
                                                                {data?.sectorTitle}
                                                            </td>
                                                            <td className="px-6 py-4 border-2">
                                                                <a
                                                                    href={data?.sectorURL}
                                                                    target="_blank"
                                                                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                                                                >
                                                                    View
                                                                </a>
                                                            </td>
                                                            <td className="px-6 py-4 border-2">
                                                                {data?.isPublished ? "publié" : "inédite"}
                                                            </td>
                                                            <td className="flex items-center px-6 py-4 ">
                                                                <a onClick={() => {
                                                                    editDetails(data)
                                                                }}
                                                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Modifier
                                                                </a>
                                                                <a
                                                                    onClick={() => { deleteDetails(data?.id) }}
                                                                    className="cursor-pointer font-medium text-red-600 hover:underline ms-3"
                                                                >Supprimer
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                {/* <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    pageCount={AdminBannersList?.data?.pagination?.totalPages}
                                    previousLabel="<"
                                    renderOnZeroPageCount={null}
                                    className='custom-pagination'
                                /> */}
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

export default NosSecteursList;