"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/banner_background.webp';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Visitors = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="mt-10">
                <div className="container mx-auto lg:flex">
                    <div className="text-center px-4 lg:w-1/3">
                        <div className="visitor-left-content">
                            <h5 className="txt_green font-bold">Augmentez votre visibilité</h5>
                            <h2 className="text-black font-bold">Des visiteurs, mais de quelle manière?</h2>
                            <p>Objectif professionnel : stimuler l'engagement et les interactions grâce à nos campagnes publicitaires. Nous vous assurons une visibilité optimale sur les moteurs de recherche les plus utilisés (Google, Bing, etc.).</p>
                            <button className="txt_green border_green p-3 w-60 mb-5 mt-4 rounded-lg hover:bg_green hover:text-white search-btn">Rechercher</button>
                        </div>
                    </div>
                    <div className="px-4 lg:w-2/3">
                        <Image src={TestImg} alt="img" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Visitors;