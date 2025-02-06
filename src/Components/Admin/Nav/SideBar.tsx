"use client";

import Image from "next/image";
import { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import Icon1 from '@/Images/Dashboard/sidebar-project-icon.svg';
import Icon2 from '@/Images/Dashboard/sidebar-contact-icon.svg';

const SideBar = ({ showsidebar }: any) => {
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState<any | null>(0);
    const [currentPathname, setCurrentPathname] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUrl = new URL(window.location.href);
            setCurrentPathname(currentUrl.pathname);
            if (currentUrl.pathname.includes('/etablissements-en-attente/') || currentUrl.pathname.includes('/liste-des-etablissements/') ||
                currentUrl.pathname.includes('/ajouter-un-etablissement/') || currentUrl.pathname.includes('/voir-un-etablissement/') ||
                currentUrl.pathname.includes('/modifier-an-etablissement/')) {
                setShowDropdown(1);
            }
            else if (currentUrl.pathname.includes('/liste-des-publicites/') || currentUrl.pathname.includes('/ajouter-un-publicite/') ||
                currentUrl.pathname.includes('/voir-un-publicite/') || currentUrl.pathname.includes('/modifier-un-publicite/')) {
                setShowDropdown(2);
            }
            else if (currentUrl.pathname.includes('/liste-des-bannieres/') || currentUrl.pathname.includes('/ajouter-une-banniere/') ||
                currentUrl.pathname.includes('/voir-un-bannieres/') || currentUrl.pathname.includes('/modifier-un-bannieres/')) {
                setShowDropdown(3);
            }
            else if (currentUrl.pathname.includes('/liste-des-categorie/') || currentUrl.pathname.includes('/ajouter-une-categorie/')) {
                setShowDropdown(4);
            }
        }
    }, []);
    return (
        <>
            <aside id="sidebar-multi-level-sidebar" className={`${!showsidebar && "hidden"} lg:block bg-gray-200 lg:bg-gray-50 border-2 border-gray-300 lg:border-none fixed top-16 lg:top-24 left-0 z-40 w-80 h-screen transition duration-500 ease-linear lg:rounded-tr-lg`} aria-label="Sidebar">
                <div className="h-full px-3 py-6 overflow-y-auto bg-gray-200 lg:bg-gray-50 lg:rounded-tr-lg border-r-2 lg:border-none">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                type="button"
                                onClick={() => { setShowDropdown(1) }}
                                className={`${(currentPathname.includes('/etablissements-en-attente/') || currentPathname.includes('/liste-des-etablissements/') || currentPathname.includes('/ajouter-un-etablissement/')) && "bg_green"} flex items-center w-full p-2 px-4 text-base text-gray-900 transition duration-75 rounded-lg group search-btn`}
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={Icon1} alt="icon" className="w-8 h-8" />

                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Établissements</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${showDropdown === 1 ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a
                                        href="/admin/etablissements-en-attente/"
                                        // onClick={() => { router.push('/admin/etablissements-en-attente/') }}
                                        className={`${currentPathname.includes('/etablissements-en-attente/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Établissements en attente
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/admin/liste-des-etablissements/"
                                        // onClick={() => { router.push('/admin/liste-des-etablissements/') }}
                                        className={`${currentPathname.includes('/liste-des-etablissements/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Liste des établissements
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/admin/ajouter-un-etablissement/"
                                        // onClick={() => { router.push('/admin/ajouter-un-etablissement/') }}
                                        className={`${currentPathname.includes('/ajouter-un-etablissement/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Ajouter un établissement
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => { setShowDropdown(2) }}
                                className={`${(currentPathname.includes('/liste-des-publicites/') || currentPathname.includes('/ajouter-un-publicite/')) && "bg_green"} flex items-center w-full p-2 px-4 text-base text-gray-900 cursor-pointer transition duration-75 rounded-lg group search-btn`}
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={Icon1} alt="icon" className="w-8 h-8" />

                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Publicités</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${showDropdown === 2 ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a
                                        href="/admin/liste-des-publicites/"
                                        // onClick={() => { router.push('/admin/liste-des-publicites/') }}
                                        className={`${currentPathname.includes('/liste-des-publicites/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Liste des publicités
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/admin/ajouter-un-publicite/"
                                        // onClick={() => { router.push('/admin/ajouter-un-publicite/') }}
                                        className={`${currentPathname.includes('/ajouter-un-publicite/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Ajouter un Publicité
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => { setShowDropdown(3) }}
                                className={`${(currentPathname.includes('/liste-des-bannieres/') || currentPathname.includes('/ajouter-une-banniere/')) && "bg_green"} flex items-center w-full p-2 px-4 text-base text-gray-900 transition duration-75 rounded-lg group search-btn`}
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={Icon1} alt="icon" className="w-8 h-8" />

                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Bannieres</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${showDropdown === 3 ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a
                                        href="/admin/liste-des-bannieres/"
                                        // onClick={() => { router.push('/admin/liste-des-bannieres/') }}
                                        className={`${currentPathname.includes('/liste-des-bannieres/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Liste des bannières
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/admin/ajouter-une-banniere/"
                                        // onClick={() => { router.push('/admin/ajouter-une-banniere/') }}
                                        className={`${currentPathname.includes('/ajouter-une-banniere/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Ajouter une bannière
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => { setShowDropdown(4) }}
                                className={`${(currentPathname.includes('/liste-des-categorie/') || currentPathname.includes('/ajouter-une-categorie/')) && "bg_green"} flex items-center w-full p-2 px-4 text-base text-gray-900 transition duration-75 rounded-lg group search-btn`}
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <Image src={Icon1} alt="icon" className="w-8 h-8" />

                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Categorie</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${showDropdown === 4 ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a
                                        href="/admin/liste-des-categorie/"
                                        // onClick={() => { router.push('/admin/liste-des-categorie/') }}
                                        className={`${currentPathname.includes('/liste-des-categorie/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Liste des categorie
                                    </a>
                                </li>
                                {/* <li>
                                    <a
                                        onClick={() => { router.push('/admin/ajouter-une-categorie/') }}
                                        className={`${currentPathname.includes('/ajouter-une-categorie/') && "font-bold bg-gray-100"} flex items-center w-full p-2 text-gray-700 cursor-pointer transition duration-75 rounded-lg pl-11 group hover:bg-gray-100`}
                                    >
                                        Ajouter une categorie
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar;