"use client";

import Image from "next/image";

import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";


const BannieresList = () => {
    return (
        <>
            <div className="w-full lg:w-auto">
                <div>
                    <h3 className="pb-4" >Liste des bannières</h3>
                    <hr className="" />
                </div>
                <div className="flex flex-col lg:flex-row gap-5 w-full lg:justify-between py-4">
                    <div className="flex justify-between  lg:gap-14 py-2 px-2">
                        <div className="flex gap-2 items-center">
                            <IoSearchOutline className="w-6 h-6" />
                            <p>Recherche</p>
                        </div>
                        {/* <div className="flex gap-2 items-center">
                            <CiFilter className="w-6 h-6" />
                            <p>Filtre</p>
                        </div> */}
                        <div className="flex gap-2 items-center">
                            <BiSort className="w-6 h-6" />
                            <p>Trier</p>
                        </div>
                    </div>
                    <div>
                        <button className="text-black font-medium p-3 w-full w-64 bg_green rounded-lg">Ajouter une bannière</button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 w-full">
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
                            <tr className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4 border-2">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2">
                                    1
                                </th>
                                <td className="px-6 py-4 border-2">
                                    I003
                                </td>
                                <td className="px-6 py-4 border-2">
                                    LE ROI MERLIN
                                </td>
                                <td className="px-6 py-4 border-2">
                                    75013
                                </td>
                                <td className="px-6 py-4 border-2">
                                    Fev 21 - Mar 1, 2024
                                </td>
                                <td className="px-6 py-4 border-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">On</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Off</a>
                                </td>
                                <td className="flex items-center px-6 py-4 ">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Supprimer</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4 border-2">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2">
                                    2
                                </th>
                                <td className="px-6 py-4 border-2">
                                    I006
                                </td>
                                <td className="px-6 py-4 border-2">
                                    PHO 13
                                </td>
                                <td className="px-6 py-4 border-2">
                                    94200
                                </td>
                                <td className="px-6 py-4 border-2">
                                    Mai 1 - Mai 11, 2024
                                </td>
                                <td className="px-6 py-4 border-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">On</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Off</a>
                                </td>
                                <td className="flex items-center px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Supprimer</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default BannieresList;