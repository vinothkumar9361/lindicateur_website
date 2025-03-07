`use client`;

import Image from "next/image";

import { useState, useEffect } from "react";

import serviceImg1 from '@/Images/Home/Industrie.webp';
import serviceImg2 from '@/Images/Home/Environnement.png';
import serviceImg3 from '@/Images/Home/Medicale.webp';
import serviceImg4 from '@/Images/Home/Aeronautique.jpg';
import serviceImg5 from '@/Images/Home/Agricole.jpg';
import serviceImg6 from '@/Images/Home/Ferroviaire.jpeg';
import serviceImg7 from '@/Images/Home/Développement.jpg';
import serviceImg8 from '@/Images/Home/PME.jpg';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllSecteursListForAdmin } from '@/store/slices/adminAction';
import { GetBannerImages } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const Service = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, SecteurList } = useSelector((state: RootState) => state.lindicateur);

    useEffect(() => {
        dispatch(GetAllSecteursListForAdmin({ type: "website" }))
    }, [])

    console.log(SecteurList?.data?.serviceList);

    return (
        <>
            <div className="bg-gray-100  pt-14">
                <div className="container mx-auto">
                    <div className="text-center">
                        {/* <h4 className="txt_green font-medium">Réputé</h4> */}
                        <h2 className="text-black font-normal">Nos secteurs d’activités</h2>
                    </div>
                </div>
                <div className="md:mt-4 py-10 px-4 sm:px-10 lg:px-20">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                        {
                            SecteurList?.data?.serviceList?.map((service: any, i: number) => (
                                <>
                                    <div className="flex flex-col box_shadow_light w-full relative cursor-pointer group overflow-hidden">
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img src={service?.sectorURL} alt="Img" className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                        </div>
                                        <div className="p-2 text-center sm:content-center w-full absolute bottom-2 px-4">
                                            <div className="bg-gray-200 opacity-90 group-hover:bg-white group-hover:opacity-100  transition-all duration-300">
                                                <h5 className="text-black font-medium">{service?.sectorTitle}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Service;