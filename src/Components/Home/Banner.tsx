"use client";

import Image from "next/image";

import Logo from '@/Images/Home/logo.svg';

import { FaSearch } from "react-icons/fa";

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import { MultiSelect } from "react-multi-select-component";

const categoryType = [
    { value: 'item-1', label: 'Fabrication, location, vente de coffrages' },
    { value: 'item-2', label: 'Affinage de fromages' },
    { value: 'item-3', label: 'Arboriculture et production de fruits' },
]

const Banner = () => {
    const [show, setShow] = useState<boolean | null>(false);
    const [select, setSelect] = useState<any | null>([]);

    const changeShow = () => {
        setShow(!show);
    }
    return (
        <>
            <div className="home_banner py-16 px-6 lg:py-24">
                <div className="container mx-auto">
                    <div className="flex flex-col content-center items-center text-center">
                        <svg className="w-32 h-32 invert lg:w-40 lg:h-40" preserveAspectRatio="none" data-bbox="20 20 160 160" viewBox="20 20 160 160" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="img" aria-label="Page d'accueil">
                            <g>
                                <path d="M180 102.224C180 56.813 144.183 20 100 20s-80 36.813-80 82.224h44.811L20 110.705l1.615 9.013 56.914-10.771-47.638 32.657 4.948 7.624 48.793-33.449-31.894 48.815 7.402 5.109 30.628-46.878-10.764 55.378L88.748 180 100 122.112 111.252 180l8.744-1.795-10.764-55.378 30.628 46.878 7.402-5.109-31.894-48.815 48.793 33.449 4.948-7.624-47.638-32.657 56.914 10.771 1.615-9.013-44.811-8.481H180z" />
                            </g>
                        </svg>
                        <h1 className="font-bold pt-4">Tous les experts à proximité de chez vous !</h1>
                    </div>
                    <div className="pt-4 rounded-lg md:px-20 lg:px-20">
                        <div className="px-4 rounded-lg bg-white lg:bg-transparent lg:px-6">
                            <div className="flex flex-col px-4 pt-6 lg:flex-row lg:px-0">
                                <p className="bg_green rounded-t-lg lg:rounded-none lg:rounded-tl-lg lg:bg-white py-2 flex lg:h-16"> {!show && <FaSearch className="mt-3 ml-4" />} <span className="bg_green py-2 pr-6 pl-2 w-64">{show ? "À qui appartient ce numéro ?" : "Vous recherchez ?"}</span></p>
                                <p className="bg_black rounded-b-lg lg:rounded-none lg:rounded-tr-lg py-4 px-6 cursor-pointer flex" onClick={changeShow}> {show && <FaSearch className="mt-1 mr-2" />} {show ? "Vous recherchez ?" : "À qui appartient ce numéro ?"}</p>
                            </div>
                            {
                                show ?
                                    <div className="lg:bg-white lg:rounded-b-lg">
                                        <div className="px-10 py-8 sm:flex sm:flex-col justify-center lg:flex-row lg:gap-10  lg:px-4">
                                            <div>
                                                <label htmlFor="" className="text-black ">À qui appartient ce numéro ?</label>
                                                <PhoneInput
                                                    country={'fr'}
                                                    placeholder="N° de téléphone"
                                                // id='phoneNumber'
                                                // name='phoneNumber'
                                                />
                                            </div>
                                            <div>
                                                <button className="txt_green border_green p-3 w-full my-5 rounded-lg search-btn flex gap-3 place-content-center sm:w-64 "><FaSearch className="mt-1" /> Rechercher</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="lg:bg-white lg:rounded-b-lg lg:rounded-tr-lg">
                                        <div className="px-10 pt-3">
                                            <label htmlFor="">À qui appartient ce numéro ?</label>
                                        </div>
                                        <div className="px-10 pt-3 lg:grid lg:grid-cols-4 lg:gap-3 lg:px-6 lg:pb-4">
                                            <MultiSelect
                                                options={categoryType}
                                                value={select}
                                                onChange={setSelect}
                                                labelledBy="Quoi: Un restaurant, un dentiste..."
                                                overrideStrings={{ "selectSomeItems": "Quoi: Un restaurant, un dentiste..."}}
                                                className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500"
                                            />
                                            {/* <input type="text" placeholder="Quoi: Un restaurant, un dentiste..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500" /> */}
                                            <input type="text" placeholder="Qui: Monsieur Jean, SARL..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2" />
                                            <input type="text" placeholder="Où: France, Ile-de-France, Paris..." className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2" />
                                            <button className="txt_green border_green p-3 w-full mb-5 lg:mb-3 rounded-lg search-btn">Rechercher</button>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;