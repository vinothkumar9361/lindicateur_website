"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/Exhibition (1).avif';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Visitors = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="mt-14">
                <div className="container mx-auto lg:flex">
                    <div className="text-center px-4 lg:w-1/3">
                        <div className="visitor-left-content">
                            <h5 className="txt_green font-bold">Augmentez votre visibilité</h5>
                            <h2 className="text-black font-bold mb-2">Des visiteurs, mais de quelle manière?</h2>
                            <p><b>Objectif professionnel :</b> stimuler l'engagement et les interactions grâce à nos campagnes publicitaires. Nous vous assurons une visibilité optimale sur les moteurs de recherche les plus utilisés (Google, Bing, etc.).</p>
                            <button className="text-black font-bold border_black p-3 w-60 mt-5 mb-5 lg:mb-3 search-btn">Rechercher</button>
                            </div>
                    </div>
                    <div className="lg:pl-6 lg:pr-0 lg:w-2/3 px-4">
                        <Image src={TestImg} alt="img" className="lg:h-full lg:w-full" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Visitors;