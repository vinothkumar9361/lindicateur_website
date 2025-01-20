"use client";

import Image from "next/image";

import Icon1 from '@/Images/Home/strength-icon-2.png';
import Icon2 from '@/Images/Home/strength-icon-3.png';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Strengths = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="bg-gray-100 pt-8 mt-14">
                <div className="container mx-auto mb-3">
                    <div className="text-center px-8">
                        <h5 className="txt_green font-medium">Nos points forts</h5>
                        <h2 className="text-black font-normal lg:px-0">Quelles sont les raisons de préférer L'indicateur ?</h2>
                    </div>
                </div>
                <div className="py-10 px-4 sm:px-20">
                    <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="bg-white box_shadow_light p-4 px-8 lg:px-12 lg:py-12 text-center justify-items-center">
                            <Image src={Icon1} alt='icon' width={70} height={70} className="mb-5" />
                            <h4 className="text-black font-medium">Une équipe de professionnels entièrement engagée à répondre à vos besoins.</h4>
                            <p>Elle vous guide et vous conseille dans l'élaboration de votre stratégie de communication numérique.</p>
                        </div>
                        <div className="bg-white box_shadow_light p-4 px-8 lg:px-12 lg:py-12 text-center justify-items-center">
                            <Image src={Icon2} alt='icon' width={70} height={70} className="mb-5" />
                            <h4 className="text-black font-medium">Un ensemble d'entreprises en développement dynamique.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Strengths;