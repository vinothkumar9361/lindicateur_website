"use client";

import Image from "next/image";

import { useState, useEffect } from "react";

import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import Logo from '@/Images/Home/Logo.png';

function Header() {
    const [show, setShow] = useState<boolean | null>(true);
    const [currentPathname, setCurrentPathname] = useState('');
    const [scrollPositionY, setScrollPositionY] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUrl = new URL(window.location.href);
            console.log(currentUrl.pathname);
            setCurrentPathname(currentUrl.pathname);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 1050) {
                setScrollPositionY(window.scrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`${scrollPositionY >= 600 ? "hidden transition-transform duration-300" : "fixed"} navbar w-full bg-gray-100 border-gray-200 dark:bg-gray-900 box_shadow_light z-10`}>
                <div className="flex flex-wrap lg:flex-row items-center justify-between mx-auto">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse py-4">
                        <Image src={Logo} alt="logo" width={300} height={100} className="w-56" />
                    </a>
                    <div className="md:inline lg:hidden flex items-center lg:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mr-5 ">
                        <button
                            type="button"
                            className="flex hidden text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
                        </button>
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            onClick={() => { setShow(!show) }}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`${show && "hidden"} items-center justify-between w-full lg:flex lg:w-auto py-4 lg:pr-20`} id="navbar-user">
                        <ul className="header-ul flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-gray-100 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                            <li className={currentPathname === "/" ? "active" : undefined} >
                                <a href="/" className="block py-2 px-3 font-medium text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Accueil</a>
                            </li>
                            <li className={`${currentPathname === "/rechercher/" ? "active" : undefined} mar-left`}>
                                <a href="/rechercher/" className="block py-2 px-3 font-medium text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Rechercher</a>
                            </li>
                            {/* <li className={`${currentPathname === "/login/" || currentPathname === "/signup/" ? "active" : undefined} mar-left`}>
                                <a href="/login/" className="block py-2 px-3 font-medium text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Référencer un établissement</a>
                            </li> */}
                            <li className={`${currentPathname === "/contact/" ? "active" : undefined} mar-left`}>
                                <a href="/contact/" className="block py-2 px-3 font-medium text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Référencer un établissement</a>
                            </li>
                            <li className={`${currentPathname === "/contact/" ? "active" : undefined} mar-left`}>
                                <a href="/contact/" className="block py-2 px-3 font-medium text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="hidden lg:inline lg:flex header-card">
                        <div className="bg_black text-white pt-2 pb-3 lg:px-4 xl:px-6 text-center">
                            <p className="font-medium">Nous contacter</p>
                            <p className="">Du lundi au vendredi</p>
                            <p className="">De 9h à 18h</p>
                        </div>
                        <div className="bg_green py-4 text-center flex justify-center item-center content-center place-items-center lg:px-4">
                            <div className="text-center">
                                <p className="fs_20 text-center">06 03 84 08 12</p>
                            </div>
                            <div className="flex justify-center item-center content-center place-items-center">
                                <p className="font-medium"> contact@lindicateur.fr</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </nav>
        </>

    );
}

export default Header;