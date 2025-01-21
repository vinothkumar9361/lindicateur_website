"use client";

import { CgProfile } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";


const Profile = () => {
    return (
        <>
            <div>
                <h3 className="pb-4 lg:pb-8" >Profil</h3>
                <hr className="" />
            </div>
            <div className="py-10 px-2 md:px-8 pb-16 md:pb-24">
                <div className="pb-4 flex justify-end">
                    <div className="flex gap-2 text-black font-bold border_black p-1 px-2 w-32 search-btn">
                        <MdModeEdit className="w-5 h-5" />
                        <p className="text-base">modifier</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 shadow py-2 px-4 border-2">
                    <div>
                        <CgProfile className="w-20 h-20" />
                    </div>
                    <div className="py-3">
                        <p className="block text-lg text-gray-900">Bonnie Green</p>
                        <p className="block text-sm  text-gray-500 truncate">admin@@econergiefrance.fr</p>
                    </div>
                </div>
                <div className="shadow py-2 px-4 border-2 mt-6 sm:flex sm:flex-wrap">
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Nom </p>
                        <p className="block text-base text-gray-600 truncate">admin</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Prénom</p>
                        <p className="block text-base text-gray-600 truncate">admin</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Email </p>
                        <p className="block text-base text-gray-600 truncate">admin@@econergiefrance.fr</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Téléphone </p>
                        <p className="block text-base text-gray-600 truncate">06 03 84 08 12</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Nom de l'entreprise</p>
                        <p className="block text-base text-gray-600 truncate">Akkenna</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Adresse</p>
                        <p className="block text-base text-gray-600 truncate">53 Rue Carnot</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">ville</p>
                        <p className="block text-base text-gray-600 truncate">Boulogne</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">État</p>
                        <p className="block text-base text-gray-600 truncate">Billancourt</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">code PIN</p>
                        <p className="block text-base text-gray-600 truncate">92100</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;