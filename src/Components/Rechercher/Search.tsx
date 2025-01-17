"use client";

import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import { MultiSelect } from "react-multi-select-component";

const categoryType = [
    { value: 'item-1', label: 'Fabrication, location, vente de coffrages' },
    { value: 'item-2', label: 'Affinage de fromages' },
    { value: 'item-3', label: 'Arboriculture et production de fruits' },
]

const Search = () => {
     const [show, setShow] = useState<boolean | null>(false);
        const [select, setSelect] = useState<any | null>([]);
    
    return (
        <>
            <div className="bg-white p-2 sm:p-4">
                <div className="bg-white lg:bg-transparent">
                    <div className="flex flex-col xl:flex-row sm:px-6 lg:px-0 ">
                        <div
                            className={`${show ? "bg_black" : "bg_green"} banner-btn sm:py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center xl:h-16 xl:w-1/2`}
                            onClick={() => setShow(false)}
                        >
                            <p className={`py-2 font-bold ${show ? "text-white" : "text-black"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>
                                <FaSearch className="mt-1 ml-2" />
                                <span>Vous recherchez </span>
                            </p>
                        </div>
                        <div
                            className={`${show ? "bg_green" : "bg_black"} banner-btn sm:py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center xl:h-16 xl:w-1/2`}
                            onClick={() => setShow(true)}
                        >
                            <p className={`py-2 font-bold ${show ? "text-black" : "text-white"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>À qui appartient ce numéro ?</p>
                        </div>
                    </div>
                    {
                        show ?
                            <div className="lg:bg-white lg:h-32">
                                <div className="px-2 py-4 sm:px-10 sm:py-8 sm:flex sm:flex-col justify-center">
                                    <label htmlFor="" className="text-black mb-2 xl:mb-0 xl:w-1/2 content-center font-bold">À qui appartient ce numéro ?</label>
                                    <div className="xl:w-1/2 flex ">
                                        <PhoneInput
                                            country={'fr'}
                                            placeholder="N° de téléphone"
                                        />
                                        <button className="border-2 px-4 border-gray-400 hover:border-3 hover:border-gray-800"><FaSearch className="text-black" /></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="lg:bg-white xl:h-32">
                                <div className="px-2 sm:px-10 pt-4">
                                    <label htmlFor="">À qui appartient ce numéro ?</label>
                                </div>
                                <div className="px-2 sm:px-10 pt-3 sm:flex sm:flex-col sm:item-center xl:grid xl:grid-cols-4 xl:gap-5 xl:px-8 xl:pb-8">
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
        </>
    )
}

export default Search;