
import Banner from "@/Components/Entreprises/Banner";
import Details from "@/Components/Entreprises/Details";

import { useState, useEffect } from "react";


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetPublicitiesData } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const Index = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, CustomerPublicities } = useSelector((state: RootState) => state.lindicateur);

    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const publicitesId:any = localStorage.getItem('publicites-webiste-auth-id');
            setId(publicitesId);
        }
    }, []);

    useEffect(() => {
        if(id){
            dispatch(GetPublicitiesData({ id }));
        }
    }, [id])

    console.log(CustomerPublicities);

    return (
        <>
            <Banner data={CustomerPublicities?.data?.existingAds} />
            <Details data={CustomerPublicities?.data?.existingAds} />
        </>
    )
}

export default Index;