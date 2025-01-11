"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/banner_background.webp';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Service = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="mt-10">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h5 className="txt_green font-bold">Réputé</h5>
                        <h2 className="text-black font-bold">Les spécialistes à votre service</h2>
                    </div>
                </div>
                <div className="bg-gray-100 py-10 px-4 sm:px-20">
                    <div className="container mx-auto grid grid-cols-1 md:gap-3 lg:grid-cols-3">
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Construction et Immobilier</h4>
                              {/* <hr className="hidden mt-4 ml-3 w-24 txt_green bg_green  sm:flex"/> */}
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Finance</h4>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Santé</h4>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Agriculture</h4>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Transports</h4>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light rounded-lg sm:flex-row">
                           <div className="w-full sm:w-2/3 lg:rounded-l-lg">
                              <Image src={TestImg} alt="Img" className="h-40 lg:rounded-l-lg"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3 lg:rounded-r-lg">
                              <h4 className="text-black font-bold">Justice</h4>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service;