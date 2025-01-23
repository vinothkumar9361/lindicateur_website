'use client';

import { useState, useEffect } from "react";

import { CgProfile } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";

import EditProfile from "./EditProfile";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAdminProfile } from '@/store/slices/adminAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, Admin } = useSelector((state: RootState) => state.lindicateur);

    const [showEdit, setShowEdit] = useState<boolean | null>(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
    } 

    console.log(Admin);


    return (
        <>
        {
            showEdit ?
            <EditProfile showEdit={showEdit} closeEdit={handleCloseEdit} />
            : null
        }
            <div>
                <h3 className="pb-4 lg:pb-8" >Profil</h3>
                <hr className="" />
            </div>
            <div className="py-10 px-2 md:px-8 pb-16 md:pb-24">
                <div className="pb-4 flex justify-end">
                    <div onClick={() => { setShowEdit(true)}} className="flex gap-2 text-black font-bold border_black p-1 px-2 w-32 cursor-pointer search-btn">
                        <MdModeEdit className="w-5 h-5" />
                        <p className="text-base">modifier</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 shadow py-2 px-4 border-2">
                    <div>
                        <CgProfile className="w-20 h-20" />
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