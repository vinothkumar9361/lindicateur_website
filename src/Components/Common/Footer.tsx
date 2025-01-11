"use client";

import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {

    return (
        <>
            <div className="bg_light_black mt-10 grid grid-cols-1 py-10 lg:grid-cols-3 lg:py-20">
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

            </div>
        </>

    );
}

export default Footer;