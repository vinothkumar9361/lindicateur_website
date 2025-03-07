`use client`;

import { useState, useEffect } from "react";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetLegalesOrCGVContent } from '@/store/slices/commonAction';
import { RootState, AppDispatch } from '@/store/store';

const ConditionsGenerales = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, MentionsLegalsandCGV } = useSelector((state: RootState) => state.lindicateur);

    useEffect(() => {
        dispatch(GetLegalesOrCGVContent({ id: 2 }))
    }, [])

    console.log(MentionsLegalsandCGV);

    return (
        <>
            <div className="container mx-auto">
                {
                    Loading || !MentionsLegalsandCGV?.data?.existingPage?.pageDescription ?
                        <div className="flex flex-col gap-2 mt-6">
                            <Skeleton style={{ width: "60%" }} height={20} />
                            <Skeleton style={{ width: "70%" }} height={22} />
                            <Skeleton style={{ width: "80%" }} height={25} />
                            <Skeleton style={{ width: "90%" }} height={28} />
                            <Skeleton style={{ width: "100%" }} height={30} />
                            <Skeleton count={5} height={30} className="mb-2" />
                        </div>
                        :
                        <div>
                            <h3 className="py-4 mb-4 text-center" >Conditions générales</h3>


                            <div className="pt-4 px-2">
                                <div dangerouslySetInnerHTML={{ __html: MentionsLegalsandCGV?.data?.existingPage?.pageDescription }} />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default ConditionsGenerales;