"use client";

import Image from "next/image";

import { useState, useEffect } from "react";

import Logo from '@/Images/Home/Logo.png';

import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsActive, MdMenu } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";


const NavHeader = ({showsidebar, changesidebar}:any) => {
    const [show, setShow] = useState<boolean | null>(false);

    const handlechange = () => {
        changesidebar(!showsidebar)
    }
    return (
        <>
            <nav className="fixed navbar w-full bg-gray-200 border-gray-200 dark:bg-gray-900 z-10">
                <div className="flex flex-wrap lg:flex-row items-center justify-between mx-auto">
                    <a href="#" className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-40 lg:w-80" />
                    </a>
                    <div className="lg:hidden" onClick={() => { changesidebar()}}>
                        {
                            showsidebar ?
                            <BsArrowLeft className="h-10 w-10 my-2 mx-4 cursor-pointer" />
                            : <MdMenu className="h-10 w-10 my-2 mx-4 cursor-pointer" />
                        }
                        
                    </div>
                    <div className="flex items-center relative lg:gap-8 lg:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-2 lg:mr-10">
                        <div>
                            <MdOutlineNotificationsActive className="w-6 h-6 sm:w-8 sm:h-8 lg:w-8 lg:h-8" />
                        </div>
                        <button
                            type="button"
                            className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                            onClick={() => { setShow(!show)}}
                        >
                            <span className="sr-only">Open user menu</span>
                            <CgProfile className=" w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        </button>
                        <div
                            className={`z-50 ${show ? "" : "hidden"} absolute top-10 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">admin@@econergiefrance.fr</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="/admin/profile/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">se déconnecter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavHeader;