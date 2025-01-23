`use client`;

import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

import { FaSearch } from "react-icons/fa";

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

import { MultiSelect } from "react-multi-select-component";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllEstablishmentProfileSearch, GetAllEstablishmentPhoneNumberSearch, GetAllCategoryList } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const categoryType = [
    { value: 'item-1', label: 'Fabrication, location, vente de coffrages' },
    { value: 'item-2', label: 'Affinage de fromages' },
    { value: 'item-3', label: 'Arboriculture et production de fruits' },
]

const Search = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, CustomerCategoryList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);

    const [show, setShow] = useState<boolean | null>(false);
    const [select, setSelect] = useState<any | null>([]);
    const [latitude, setlatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);
    const [categoryType, setCategoryType] = useState<any | null>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            setToken(tokenString);
        }
    }, []);

    useEffect(() => {
        dispatch(GetAllCategoryList({ type: "website" }));
    }, [dispatch])

    useEffect(() => {
        if (CustomerCategoryList?.data?.category) {
            const options = CustomerCategoryList?.data?.category?.map((value: any) => ({
                value: value?.categoryName,
                label: value?.categoryName
            }));
            setCategoryType(options)
        }
    }, [CustomerCategoryList])

    const inputRef: any = useRef("");

    const handlePlace = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            setlatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
        }
    }

    useEffect(() => {
        validateLocation(latitude, longitude)
    }, [])

    const validateLocation = (latitude: any, longitude: any) => {
        if (latitude.length !== '' && longitude.length !== '') {
            return true
        }
        return false
    }

    const handlePhoneSearch = () => {
        dispatch(GetAllEstablishmentPhoneNumberSearch({ phoneNumber }))
    }

    return (
        <>
            <div className="bg-white p-2 sm:p-4">
                <div className="bg-white lg:bg-transparent">
                    <div className="flex flex-col xl:flex-row sm:px-6 lg:px-0 ">
                        <div
                            className={`${show ? "bg_black" : "bg_green"} banner-btn sm:py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center xl:h-16 xl:w-1/2`}
                            onClick={() => setShow(false)}
                        >
                            <p className={`py-2 font-bold ${show ? "text-white" : "text-black"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>
                                <FaSearch className="mt-1 ml-2" />
                                <span>Vous recherchez </span>
                            </p>
                        </div>
                        <div
                            className={`${show ? "bg_green" : "bg_black"} banner-btn sm:py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center xl:h-16 xl:w-1/2`}
                            onClick={() => setShow(true)}
                        >
                            <p className={`py-2 font-bold ${show ? "text-black" : "text-white"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>À qui appartient ce numéro ?</p>
                        </div>
                    </div>
                    {
                        show ?
                            <div className="lg:bg-white lg:h-32">
                                <div className="px-2 py-4 sm:px-10 sm:py-8 sm:flex sm:flex-col justify-center">
                                    <label htmlFor="" className="text-black mb-2 xl:mb-0 xl:w-1/2 content-center font-bold">À qui appartient ce numéro ?</label>
                                    <div className="xl:w-1/2 flex ">
                                        <PhoneInput
                                            country={'fr'}
                                            placeholder="N° de téléphone"
                                            value={phoneNumber}
                                            onChange={(value) => { setPhoneNumber(value) }}
                                        />
                                        <button onClick={() => handlePhoneSearch()} disabled={!phoneNumber} className="border-2 px-4 border-gray-400 hover:border-3 hover:border-gray-800"><FaSearch className="text-black" /></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="lg:bg-white xl:h-32">
                                <div className="px-2 sm:px-10 pt-4">
                                    <label htmlFor="">À qui appartient ce numéro ?</label>
                                </div>
                                <div className="px-2 sm:px-10 pt-3 sm:flex sm:flex-col sm:item-center xl:grid xl:grid-cols-4 xl:gap-4 xl:px-2 xl:pb-8">
                                    <MultiSelect
                                        options={categoryType}
                                        value={select}
                                        onChange={setSelect}
                                        labelledBy="Quoi: Un restaurant, un dentiste..."
                                        overrideStrings={{ "selectSomeItems": "Quoi: Un restaurant, un dentiste..." }}
                                        className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500"
                                    />
                                    {/* <input type="text" placeholder="Quoi: Un restaurant, un dentiste..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500" /> */}
                                    <input type="text" placeholder="Qui: Monsieur Jean, SARL..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2" />
                                    {/* <input type="text" placeholder="Où: France, Ile-de-France, Paris..." className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2" /> */}

                                    <div className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2">
                                        <LoadScript
                                            googleMapsApiKey='AIzaSyD7xvZFtE4aQWnCIw5UlF8IoayDrYnoiRo'
                                            libraries={["places"]}
                                        >
                                            <StandaloneSearchBox
                                                onLoad={ref => { inputRef.current = ref }}
                                                onPlacesChanged={handlePlace}
                                            >

                                                <input
                                                    type="text"
                                                    placeholder="Où: France, Ile-de-France, Paris..."
                                                    id="validationCustom01"
                                                    className="border-0 border-gray-500 w-full placeholder:text-gray-400 outline-2"
                                                // style={{ width: "100%" }}
                                                />
                                            </StandaloneSearchBox>
                                        </LoadScript>
                                    </div>

                                    <button className="text-black font-bold border_black p-3 w-full sm:w-64 lg:w-full mb-5 lg:mb-3 search-btn">Rechercher</button>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Search;