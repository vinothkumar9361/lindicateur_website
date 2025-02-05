"use client";

import Image from "next/image";

import serviceImg1 from '@/Images/Home/Industrie.webp';
import serviceImg2 from '@/Images/Home/Environnement.png';
import serviceImg3 from '@/Images/Home/Medicale.webp';
import serviceImg4 from '@/Images/Home/Aeronautique.jpg';
import serviceImg5 from '@/Images/Home/Agricole.jpg';
import serviceImg6 from '@/Images/Home/Ferroviaire.jpeg';
import serviceImg7 from '@/Images/Home/Développement.jpg';
import serviceImg8 from '@/Images/Home/PME.jpg';

const Service = () => {
   return (
      <>
         <div className="bg-gray-100  pt-14">
            <div className="container mx-auto">
               <div className="text-center">
                  {/* <h4 className="txt_green font-medium">Réputé</h4> */}
                  <h2 className="text-black font-normal">Nos secteurs d’activités</h2>
               </div>
            </div>
            <div className="mt-4 py-10 px-4 sm:px-10 lg:px-20">
               <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg1} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Industrie</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg2} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Environnement</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg3} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black ">Médicale</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg4} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Aéronautique</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg5} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Agricole</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg6} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Ferroviaire</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg7} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">Développement durable</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
                  <div className="flex flex-col box_shadow_light w-full">
                     <div className="">
                        <Image src={serviceImg8} alt="Img" className="h-52 sm:h-60 lg:h-32 w-full" />
                     </div>
                     <div className="bg-white p-4 text-center sm:content-center w-full h-20 lg:h-28">
                        <h4 className="text-black">PME pmi</h4>
                        {/* <hr className="hidden mt-4 ml-3 w-20 border-green sevice-underline sm:flex" /> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Service;