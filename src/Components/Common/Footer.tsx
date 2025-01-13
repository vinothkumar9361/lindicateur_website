"use client";

import Image from "next/image";

import Logo from '@/Images/Home/Logo.png';

import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {

    return (
        <>
            {/* <div className="bg_light_black mt-10 grid grid-cols-1 py-10 lg:grid-cols-3 lg:py-20">
                <div className="px-4 pb-4 lg:flex lg:item-center lg:place-content-center">
                    <p className="text-white font-bold text-4xl flex gap-3 place-items-center lg:flex-col lg:place-content-center">
                        <svg className="w-12 h-12 invert lg:w-20 lg:h-20" preserveAspectRatio="none" data-bbox="20 20 160 160" viewBox="20 20 160 160" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="img" aria-label="Page d'accueil">
                            <g>
                                <path d="M180 102.224C180 56.813 144.183 20 100 20s-80 36.813-80 82.224h44.811L20 110.705l1.615 9.013 56.914-10.771-47.638 32.657 4.948 7.624 48.793-33.449-31.894 48.815 7.402 5.109 30.628-46.878-10.764 55.378L88.748 180 100 122.112 111.252 180l8.744-1.795-10.764-55.378 30.628 46.878 7.402-5.109-31.894-48.815 48.793 33.449 4.948-7.624-47.638-32.657 56.914 10.771 1.615-9.013-44.811-8.481H180z" />
                            </g>
                        </svg>
                        <span>L'INDICATEUR</span>
                    </p>
                </div>
                <div>
                    <ul className="py-2 grid grid-cols-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Accueil</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">À propos</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Rechercher</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Actualités</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Contact</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Mentions légales</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">CGV</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Politique de Confidentialité</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Politique de cookies</a>
                        </li>
                    </ul>
                </div>
                <hr className="mx-4 pt-4 border-gray-100 lg:hidden" />
                <div className="lg:flex lg:flex-col lg:gap-10">
                    <ul className="py-2 grid grid-cols-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">LinkedIn</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Instagram</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-white hover:font-bold dark:hover:font-bold dark:font-bold dark:hover:text-white">Facebook</a>
                        </li>
                    </ul>
                    <div className="px-4 pt-4 text-white">
                        <p>53 Rue Carnot </p>
                        <p>Boulogne-Billancourt 92100</p>
                    </div>
                </div>

            </div> */}

            <nav className="w-full bg-gray-100 border-gray-200 dark:bg-gray-900 box_shadow_light z-10">
                <div className="flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse p-4">
                        {/* <p className="flex gap-3 place-items-center font-bold text-xl">
                            <svg className="w-10 h-10" preserveAspectRatio="none" data-bbox="20 20 160 160" viewBox="20 20 160 160" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="img" aria-label="Page d'accueil">
                                <g>
                                    <path d="M180 102.224C180 56.813 144.183 20 100 20s-80 36.813-80 82.224h44.811L20 110.705l1.615 9.013 56.914-10.771-47.638 32.657 4.948 7.624 48.793-33.449-31.894 48.815 7.402 5.109 30.628-46.878-10.764 55.378L88.748 180 100 122.112 111.252 180l8.744-1.795-10.764-55.378 30.628 46.878 7.402-5.109-31.894-48.815 48.793 33.449 4.948-7.624-47.638-32.657 56.914 10.771 1.615-9.013-44.811-8.481H180z" />
                                </g>
                            </svg>
                            <span>L'INDICATEUR</span>
                        </p> */}
                        <Image src={Logo} alt="logo" width={300} height={100} />
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
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
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

                    </div>
                    <div className={`items-center justify-between w-full lg:flex lg:flex-col lg:w-auto p-4`} id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-gray-100 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:hover:font-bold lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Accueil</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:hover:font-bold lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Rechercher</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:hover:font-bold lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Actualités</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:text-black hover:font-bold lg:hover:bg-transparent lg:hover:text-black lg:hover:font-bold lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                        <p className="mt-2">53 Rue Carnot - Boulogne-Billancourt 92100 </p>
                    </div>
                    <div className="hidden lg:inline lg:flex">
                        <div className="bg_black text-white pt-2 pb-3  px-8 text-center">
                            <h5 className="font-bold">Nous contacter</h5>
                            <p className="fs_14">Du lundi au vendredi</p>
                            <p className="fs_14">De 9h à 18h</p>
                        </div>
                        <div className="bg_green text-white py-4 pl-8 pr-16">
                            <div className="flex gap-1 items-center content-center">
                                <FaPhoneAlt />
                                <p>06 03 84 08 12</p>
                            </div>
                            <div className="flex gap-1 items-center content-center">
                                <IoMdMail />
                                <p>contact@econergiefrance.fr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>

    );
}

export default Footer;