"use client";

import Image from "next/image";

import Icon1 from '@/Images/Home/strength-icon-new-1.avif';
import Icon2 from '@/Images/Home/strength-icon-new-2.avif';
import Icon3 from '@/Images/Home/strength-icon-new-3.avif';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Strengths = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="bg-gray-100 pt-8 mt-14">
                {/* <div className="container mx-auto mb-3">
                    <div className="text-center px-8">
                        <h5 className="txt_green font-medium">Nos points forts</h5>
                        <h2 className="text-black font-normal lg:px-0">Quelles sont les raisons de préférer L'indicateur ?</h2>
                    </div>
                </div> */}
                <div className="py-10 px-4 sm:px-20">
                    <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white box_shadow_light p-4 px-8 lg:px-12 lg:py-12 text-center justify-items-center">
                            <Image src={Icon1} alt='icon' width={70} height={70} className="mb-5" />
                            <h4 className="text-black font-medium pb-3">Analyse des besoins</h4>
                            <p>Entrez en contact avec un de nos chefs de projet, pour mettre en place un programme adapté à votre situation et à vos besoins</p>
                        </div>
                        <div className="bg-white box_shadow_light p-4 px-8 lg:px-12 lg:py-12 text-center justify-items-center">
                            <Image src={Icon2} alt='icon' width={70} height={70} className="mb-5" />
                            <h4 className="text-black font-medium pb-3">Actualités</h4>
                            <p>Consultez nos derniers communiqués, nos futurs projets, et nos actualités du moment</p>
                        </div>
                        <div className="bg-white box_shadow_light p-4 px-8 lg:px-12 lg:py-12 text-center justify-items-center">
                            <Image src={Icon3} alt='icon' width={70} height={70} className="mb-5" />
                            <h4 className="text-black font-medium pb-3">Nos services</h4>
                            <p>Un éventail de supports distingué, pour répondre à tous types de besoin et s'adapter à toute configuration.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Strengths;