'use client';

import { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";

import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Profile = () => {
    const { Admin } = useSelector((state: RootState) => state.lindicateur);

    const [showEdit, setShowEdit] = useState<boolean | null>(false);
    const [showChangePassword, setShowChangePassword] = useState<boolean | null>(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
    }

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
    }

    return (
        <>
            {
                showEdit ?
                    <EditProfile
                        showEdit={showEdit}
                        closeEdit={handleCloseEdit}
                    />
                    : null
            }
            {
                showChangePassword ?
                    <ChangePassword
                        showChangePassword={showChangePassword}
                        handleCloseChangePassword={handleCloseChangePassword}
                    />
                    : null
            }
            <div>
                <h3 className="pb-4 lg:pb-8" >Profil</h3>
                <hr className="" />
            </div>
            <div className="py-10 px-2 md:px-8 pb-16 md:pb-24">
                <div className="pb-4 flex gap-5 justify-end">
                    <div
                        onClick={() => { setShowChangePassword(true) }}
                        className="flex content-center itens-center justify-center gap-2 text-black font-bold border_black p-1 px-2 w-60 cursor-pointer search-btn"
                    >
                        <p className="text-base">changer le mot de passe</p>
                    </div>
                    <div
                        onClick={() => { setShowEdit(true) }}
                        className="flex content-center itens-center justify-center gap-2 text-black font-bold border_black p-1 px-2 w-32 cursor-pointer search-btn"
                    >
                        <MdModeEdit className="w-5 h-5" />
                        <p className="text-base">modifier</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 shadow py-2 px-4 border-2">
                    <div>
                        <CgProfile className="w-16 h-16" />
                    </div>
                    <div className="py-3">
                        <p className="block text-lg text-gray-900">{Admin?.data?.existingUser?.adminName}</p>
                        <p className="block text-sm  text-gray-500 truncate">{Admin?.data?.existingUser?.email}</p>
                    </div>
                </div>
                <div className="shadow py-2 px-4 border-2 mt-6 sm:flex sm:flex-wrap">
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Nom </p>
                        <p className="block text-base text-gray-600 truncate">{Admin?.data?.existingUser?.adminName}</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Email </p>
                        <p className="block text-base text-gray-600 truncate">{Admin?.data?.existingUser?.email}</p>
                    </div>
                    <div className="py-3 sm:w-1/2">
                        <p className="block text-lg font-medium text-gray-900">Téléphone </p>
                        <p className="block text-base text-gray-600 truncate">{Admin?.data?.existingUser?.phone}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;