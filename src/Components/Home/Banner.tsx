`use client`;

import Image from "next/image";
import { useRouter } from "next/router";

import Logo from '@/Images/Home/logo.svg';
import BannerBackground from '@/Images/Home/banner_background.jpg';

import { FaSearch } from "react-icons/fa";

import { useState, useEffect } from "react";

import { Tabs } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import Select from 'react-select';
import { MultiSelect } from "react-multi-select-component";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllEstablishmentProfileSearch, GetAllEstablishmentPhoneNumberSearch, GetAllCategoryList, GetAllPublicitesList, GetAllCity } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const categoryType = [
    { value: 'item-1', label: 'Fabrication, location, vente de coffrages' },
    { value: 'item-2', label: 'Affinage de fromages' },
    { value: 'item-3', label: 'Arboriculture et production de fruits' },
]

const Banner = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, CustomerCategoryList, CustomerCityList } = useSelector((state: RootState) => state.lindicateur);
    const [show, setShow] = useState<boolean | null>(false);
    const [select, setSelect] = useState<any | null>([]);

    const [scrollPositionY, setScrollPositionY] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);
    const [categoryType, setCategoryType] = useState<any | null>([]);
    const [cityType, setCityType] = useState<any | null>([]);

    const [categoryName, setCategoryName] = useState<any | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);
    const [locationName, setLocationName] = useState<any | null>(null);
    const [serrorMessage, setSerrorMessage] = useState<any | null>(null);

    console.log(CustomerCityList);


    useEffect(() => {
        dispatch(GetAllCategoryList({ type: "website" }));
        // dispatch(GetAllCity({ type: "website" }));
    }, [dispatch])

    const handleInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
            // setSearchValue(inputValue);
            console.log("Search Value:", inputValue);
            dispatch(GetAllCity({ type: "website", search: inputValue }));

        }
    };

    useEffect(() => {
        if (CustomerCategoryList?.data?.category) {
            const options = CustomerCategoryList?.data?.category?.map((value: any) => ({
                value: value?.categoryName,
                label: value?.categoryName
            }));
            setCategoryType(options)
        }
    }, [CustomerCategoryList])

    useEffect(() => {
        if (CustomerCityList?.data?.states) {
            const options = CustomerCityList?.data?.states?.map((value: any) => ({
                value: `${value?.insee_id.slice(0, 2)}`,
                label: `${value?.name}(${value?.insee_id.slice(0, 2)})`
            }));
            setCityType(options)
        }
    }, [CustomerCityList])

    const handlePhoneSearch = () => {

        if (phoneNumber) {
            localStorage.setItem('phoneNumber', phoneNumber)
        }
        router.push(`/rechercher/`);
        // router.push(`/rechercher/${companyName ? companyName : "companyName"}/${categoryName?.value ? categoryName?.value : "categoryName"}/${locationName ? locationName : "locationName"}/${phoneNumber ? phoneNumber : "phoneNumber"}`)
    }

    const handleProfileSearch = () => {
        if (companyName && !categoryName?.value && !locationName?.value) {
            if (companyName) {
                localStorage.setItem('companyName', companyName)
            }
            router.push(`/rechercher/`);
        }
        else if (!categoryName?.value || !locationName?.value) {
            setSerrorMessage("La catégorie et la ville sont obligatoires.");
        }
        else {
            setSerrorMessage("")
            if (companyName) {
                localStorage.setItem('companyName', companyName)
            }
            if (categoryName?.value) {
                localStorage.setItem('categoryName', categoryName?.value)
            }
            if (locationName?.value) {
                localStorage.setItem('locationName', locationName?.value)
            }
            if (phoneNumber) {
                localStorage.setItem('phoneNumber', phoneNumber)
            }
            router.push(`/rechercher/`);

        }


        // router.push(`/rechercher/${companyName ? companyName : "companyName"}/${categoryName?.value ? categoryName?.value : "categoryName"}/${locationName?.value ? locationName?.value : "locationName"}/${phoneNumber ? phoneNumber : "phoneNumber"}`)
        // dispatch(GetAllEstablishmentProfileSearch({ search: companyName, categoryName: categoryName?.value }));
        // dispatch(GetAllPublicitesList({ categoryName: categoryName?.value }))

    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollPositionY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            <div className="home_banner px-4 sm:px-10 ld:px-6 flex flex-col content-center items-center justify-center h-full">
                <div className="container mx-auto banner-text">
                    <div className="flex flex-col content-center items-center text-center">
                        <h1 className="pt-4">Trouver un professionnel</h1>
                    </div>
                    <div className="pt-8">
                        <div className="bg-white lg:bg-transparent">
                            <div className="flex flex-col pt-6 lg:flex-row px-6 lg:px-0 ">
                                <div
                                    className={`${show ? "bg_black" : "bg_green"} banner-btn py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center lg:h-16 lg:w-1/2`}
                                    onClick={() => setShow(false)}
                                >
                                    <p className={`py-2 font-bold ${show ? "text-white" : "text-black"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>
                                        <FaSearch className="mt-1 ml-2" />
                                        <span>Vous recherchez </span>
                                    </p>
                                </div>
                                <div
                                    className={`${show ? "bg_green" : "bg_black"} banner-btn py-2 flex cursor-pointer lg:flex-row lg:item-center justify-center lg:h-16 lg:w-1/2`}
                                    onClick={() => setShow(true)}
                                >
                                    <p className={`py-2 font-bold ${show ? "text-black" : "text-white"} flex lg:flex-row lg:gap-3 lg:item-center lg:justify-center mb-0`}>À qui appartient ce numéro ?</p>
                                </div>
                            </div>
                            {
                                show ?
                                    <div className="lg:bg-white lg:h-32">
                                        <div className="px-10 py-8 sm:flex sm:flex-col justify-center lg:flex-row lg:gap-10  lg:px-4">
                                            <label htmlFor="" className="text-black lg:w-1/2 content-center font-bold">À qui appartient ce numéro ?</label>
                                            <div className="lg:w-1/2 flex ">
                                                <PhoneInput
                                                    country={'fr'}
                                                    placeholder="N° de téléphone"
                                                    value={phoneNumber}
                                                    onChange={(value) => { setPhoneNumber(value) }}
                                                />
                                                <button
                                                    onClick={() => handlePhoneSearch()}
                                                    className="border-2 px-4 border-gray-400 hover:border-3 hover:border-gray-800">
                                                    <FaSearch className="text-black" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="lg:bg-white lg:h-36">
                                        <div className="px-10 pt-3">
                                            <label htmlFor="">À qui appartient ce numéro ?</label>
                                            <p className="text-red-500 ">{serrorMessage}</p>
                                        </div>
                                        <div className="px-10 pt-3 sm:flex sm:flex-col sm:item-center lg:grid lg:grid-cols-4 lg:gap-5 lg:px-8 lg:pb-8">
                                            <Select
                                                options={categoryType}
                                                value={categoryName}
                                                onChange={(value) => { setCategoryName(value) }}
                                                isClearable={true}
                                                placeholder="Quoi:Un restaurant..."
                                                className="cursor-pointer border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500 serarch-input focus:ring-transparent"
                                            />
                                            {/* <input type="text" placeholder="Quoi: Un restaurant, un dentiste..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500" /> */}
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Qui: Monsieur Jean, SARL..."
                                                className="border-0 border-b-2 text-black border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2"
                                            />
                                            <Select
                                                options={cityType}
                                                value={locationName}
                                                isSearchable
                                                onInputChange={handleInputChange}
                                                onChange={(value) => { setLocationName(value) }}
                                                isClearable={true}
                                                placeholder="Où: France..."
                                                className="cursor-pointer border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500 serarch-input focus:ring-transparent"
                                                noOptionsMessage={() => " Saisir..."}
                                            />
                                            {/* <input
                                                type="text"
                                                value={locationName}
                                                onChange={(e) => setLocationName(e.target.value)}
                                                placeholder="Où: France, Ile-de-France, Paris..."
                                                className="border-0 border-b-2 text-black border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2"
                                            /> */}
                                            <button
                                                onClick={() => { handleProfileSearch() }}
                                                className="text-black font-bold border_black p-3 w-full sm:w-64 lg:w-full mb-5 lg:mb-3 search-btn"
                                            >
                                                Rechercher
                                            </button>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className={`${scrollPositionY >= 800 ? "absolute" : "fixed"} banner-background`}>
                <Image src={BannerBackground} alt="banner" />
            </div>

        </>
    )
}

export default Banner;