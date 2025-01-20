"use client";

import Image from "next/image";

import serviceImg1 from '@/Images/Home/Construction.webp';
import serviceImg2 from '@/Images/Home/Finance.webp';
import serviceImg3 from '@/Images/Home/Santé.jpeg';
import serviceImg4 from '@/Images/Home/Agriculture.webp';
import serviceImg5 from '@/Images/Home/Transports.webp';
import serviceImg6 from '@/Images/Home/Justice.webp';

import { useState } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";

const Service = () => {
    const [show, setShow] = useState<boolean | null>(true);

    return (
        <>
            <div className="bg-gray-100  pt-14">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h4 className="txt_green font-medium">Réputé</h4>
                        <h2 className="text-black font-normal">Les spécialistes à votre service</h2>
                    </div>
                </div>
                <div className="mt-4 py-10 sm:px-20">
                    <div className="container mx-auto grid grid-cols-1 md:gap-10 lg:grid-cols-3">
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg1} alt="Img" className="h-36"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black">Construction et Immobilier</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg2} alt="Img" className="h-36"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black">Finance</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg3} alt="Img" className="h-36"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black ">Santé</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg4} alt="Img" className="h-36"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black">Agriculture</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg5} alt="Img" className="h-36 w-full"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black">Transports</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                        <div className="flex flex-col box_shadow_light sm:flex-row">
                           <div className="w-full sm:w-2/3">
                              <Image src={serviceImg6} alt="Img" className="h-36"/>
                           </div>
                           <div className="bg-white p-4 text-center sm:content-center sm:w-2/3">
                              <h4 className="text-black">Justice</h4>
                              <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex"/>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service;