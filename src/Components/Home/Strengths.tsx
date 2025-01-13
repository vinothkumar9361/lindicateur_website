"use client";

import Image from "next/image";

import Icon1 from '@/Images/Home/strength-icon-1.png';
import Icon2 from '@/Images/Home/strength-icon-2.jpg';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Strengths = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="mt-10">
                <div className="container mx-auto mb-3">
                    <div className="text-center">
                        <h5 className="txt_green font-bold">Nos points forts</h5>
                        <h2 className="text-black font-bold">Quelles sont les raisons de préférer Mag Entreprise ?</h2>
                    </div>
                </div>
                <div className="py-10 px-4 sm:px-20">
                    <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="bg-white box_shadow_light rounded-lg p-4 text-center justify-items-center">
                            <Image src={Icon1} alt='icon' width={100} height={100} className="mb-5" />
                            <h4 className="text-black font-bold">Une équipe de professionnels entièrement engagée à répondre à vos besoins.</h4>
                            <p>Elle vous guide et vous conseille dans l'élaboration de votre stratégie de communication numérique.</p>
                        </div>
                        <div className="bg-white box_shadow_light rounded-lg p-4 text-center justify-items-center">
                            <Image src={Icon2} alt='icon' width={100} height={100} className="mb-5" />
                            <h4 className="text-black font-bold">Un ensemble d'entreprises en développement dynamique.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Strengths;