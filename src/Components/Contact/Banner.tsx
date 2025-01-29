"use client";

import Image from "next/image";

import BannerImg from '@/Images/Contact/contact-img-2.jpg'

const Banner = () => {
    return (
        <>
            <div className="h-60 lg:h-80">
                <Image src={BannerImg} alt="banner" className="w-full h-full" />
            </div>
            <div className="container mx-auto text-center py-4 px-4">
                <h1 className="font-normal">Nous contacter : contact@lindicateur.fr</h1>
            </div>
        </>
    )
}

export default Banner;