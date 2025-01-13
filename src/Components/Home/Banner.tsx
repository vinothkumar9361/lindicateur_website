"use client";

import Image from "next/image";

import Logo from '@/Images/Home/logo.svg';
import BannerBackground from '@/Images/Home/banner_background.jpg';

import { FaSearch } from "react-icons/fa";

import { useState, useEffect } from "react";

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

     const [scrollPositionY, setScrollPositionY] = useState(0);
    
        useEffect(() => {
            const handleScroll = () => {
                setScrollPositionY(window.scrollY);
            };
        
            window.addEventListener("scroll", handleScroll);
        
            return () => {
              window.removeEventListener("scroll", handleScroll);
            };
          }, []);
          
   
    return (
        <>
            <div className="home_banner px-6 flex flex-col content-center items-center justify-center h-full">
                <div className="container mx-auto banner-text">
                    <div className="flex flex-col content-center items-center text-center">
                        <h1 className="font-bold pt-4">Tous les experts à proximité de chez vous !</h1>
                    </div>
                    <div className="pt-4">
                        <div className="bg-white lg:bg-transparent">
                            <div className="flex flex-col pt-6 lg:flex-row px-6 lg:px-0 ">
                                <div
                                    className={`${show ? "bg_black" : "bg_green"} banner-btn py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center lg:h-16 lg:w-1/2`}
                                    onClick={() => setShow(false)}
                                >
                                    <p className={`py-2 font-bold ${show ? "text-white" : "text-black"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>
                                        <FaSearch className="mt-1 ml-2" />
                                        <span>Vous recherchez </span>
                                    </p>
                                </div>
                                <div
                                    className={`${show ? "bg_green" : "bg_black"} banner-btn py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center lg:h-16 lg:w-1/2`}
                                    onClick={() => setShow(true)}
                                >
                                    <p className={`py-2 font-bold ${show ? "text-black" : "text-white"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>À qui appartient ce numéro ?</p>
                                </div>
                            </div>
                            {
                                show ?
                                    <div className="lg:bg-white lg:h-32">
                                        <div className="px-10 py-8 sm:flex sm:flex-col justify-center lg:flex-row lg:gap-10  lg:px-4">
                                            <label htmlFor="" className="text-black lg:w-1/2 content-center font-bold">À qui appartient ce numéro ?</label>
                                            <div className="lg:w-1/2 flex ">
                                                <PhoneInput
                                                    country={'fr'}
                                                    placeholder="N° de téléphone"
                                                />
                                                <button className="border-2 px-4 border-gray-400 hover:border-3 hover:border-gray-800"><FaSearch className="text-black" /></button>
                                            </div>
                                            {/* <div>
                                                <button className="txt_green border_green p-3 w-full my-5 rounded-lg search-btn flex gap-3 place-content-center sm:w-64 "><FaSearch className="mt-1" /> Rechercher</button>
                                            </div> */}
                                        </div>
                                    </div>
                                    :
                                    <div className="lg:bg-white lg:h-32">
                                        <div className="px-10 pt-3">
                                            <label htmlFor="">À qui appartient ce numéro ?</label>
                                        </div>
                                        <div className="px-10 pt-3 sm:flex sm:flex-col sm:item-center lg:grid lg:grid-cols-4 lg:gap-5 lg:px-8 lg:pb-8">
                                            <MultiSelect
                                                options={categoryType}
                                                value={select}
                                                onChange={setSelect}
                                                labelledBy="Quoi: Un restaurant, un dentiste..."
                                                overrideStrings={{ "selectSomeItems": "Quoi: Un restaurant, un dentiste..." }}
                                                className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500"
                                            />
                                            {/* <input type="text" placeholder="Quoi: Un restaurant, un dentiste..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500" /> */}
                                            <input type="text" placeholder="Qui: Monsieur Jean, SARL..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2" />
                                            <input type="text" placeholder="Où: France, Ile-de-France, Paris..." className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2" />
                                            <button className="text-black font-bold border_black p-3 w-full sm:w-64 lg:w-full mb-5 lg:mb-3 search-btn">Rechercher</button>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className={`${scrollPositionY >= 800 ? "absolute" : "fixed" } banner-background`}>
                <Image src={BannerBackground} alt="banner" />
            </div>

        </>
    )
}

export default Banner;