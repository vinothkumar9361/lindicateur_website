"use client";

import Image from "next/image";

import { useState } from "react";

import Icon1 from '@/Images/Dashboard/sidebar-project-icon.svg';
import Icon2 from '@/Images/Dashboard/sidebar-contact-icon.svg';

const SideBar = () => {
    const [showDropdown, setShowDropdown] = useState<boolean | null>(false);

    return (
        <>
            <aside id="sidebar-multi-level-sidebar" className="bg-gray-50 fixed top-16 lg:top-24 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 rounded-tr-lg" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 rounded-tr-lg">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                type="button"
                                onClick={() => { setShowDropdown(!showDropdown) }}
                                className="flex items-center w-full p-2 px-4 text-base text-gray-900 transition duration-75 rounded-lg group search-btn"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={Icon1} alt="icon" className="w-8 h-8" />

                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Mes établissements</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${showDropdown ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Toute</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Ajouter un établissement</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 px-4 text-gray-900 rounded-lg search-btn group">
                                <Image src={Icon2} alt="icon" className="w-8 h-8" />
                                <span className="ms-3">Contacts</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar;