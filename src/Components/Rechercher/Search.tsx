`use client`;

import { useRouter } from "next/router";
import { useParams } from 'next/navigation';

import { useState, useEffect, useRef } from "react";

import { FaSearch } from "react-icons/fa";

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

import Spinner from "@/Components/Common/Loading";

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

const Search = () => {
    const router = useRouter();
    // const { companyName, categoryName, locationName, phoneNumber } = router.query;

    // const params = useParams();
    // const companyName = params?.companyName;
    // const categoryName = params?.categoryName;
    // const locationName = params?.locationName;
    // const phoneNumber = params?.phoneNumber;

    // console.log(router.query);
    // console.log("Company Name:", companyName);
    // console.log("Category Name:", categoryName);
    // console.log("Location Name:", locationName);
    // console.log("Phone Number:", phoneNumber);

    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, CustomerCategoryList, CustomerCityList } = useSelector((state: RootState) => state.lindicateur);

    const [token, setToken] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState<any | null>(null);
    const [categoryName, setCategoryName] = useState<any | null>(null);
    const [locationName, setLocationName] = useState<any | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<any | null>(null);

    const [show, setShow] = useState<boolean | null>(false);
    const [select, setSelect] = useState<any | null>([]);
    const [latitude, setlatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [sphoneNumber, setSphoneNumber] = useState<any | null>(null);
    const [categoryType, setCategoryType] = useState<any | null>([]);
    const [cityType, setCityType] = useState<any | null>([]);

    const [scategoryName, setScategoryName] = useState<any | null>(null);
    const [scompanyName, setScompanyName] = useState<any | null>(null);
    const [slocationName, setSlocationName] = useState<any | null>(null);
    const [serrorMessage, setSerrorMessage] = useState<any | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = localStorage.getItem('admin-auth-token');
            const companyNameString = localStorage.getItem('companyName');
            const categoryNameString = localStorage.getItem('categoryName');
            const locationNameString = localStorage.getItem('locationName');
            const phoneNumberString = localStorage.getItem('phoneNumber');

            setToken(tokenString);
            setCompanyName(companyNameString);
            setCategoryName(categoryNameString);
            setLocationName(locationNameString);
            setPhoneNumber(phoneNumberString);
        }
    }, []);

    useEffect(() => {
        if (companyName && categoryName && locationName) {
            dispatch(GetAllEstablishmentProfileSearch({ search: companyName, categoryName: categoryName, city: locationName }));
            dispatch(GetAllPublicitesList({ categoryName: categoryName, city: locationName }))
        }
        else if (categoryName && locationName) {
            dispatch(GetAllEstablishmentProfileSearch({ categoryName: categoryName, city: locationName }));
            dispatch(GetAllPublicitesList({ categoryName: categoryName, city: locationName }))
        }
        else if (phoneNumber) {
            dispatch(GetAllEstablishmentPhoneNumberSearch({ phoneNumber }))
        }
    }, [companyName, categoryName, locationName, phoneNumber]);

    useEffect(() => {
        dispatch(GetAllCategoryList({ type: "website" }));
        // dispatch(GetAllCity({ type: "website" }));
    }, [dispatch])

    const handleInputChange = (inputValue: any, { action }: any) => {
        if (action === "input-change") {
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
        dispatch(GetAllEstablishmentPhoneNumberSearch({ phoneNumber: sphoneNumber }))
    }

    const handleProfileSearch = () => {
        localStorage.removeItem('companyName');
        localStorage.removeItem('categoryName');
        localStorage.removeItem('locationName');
        localStorage.removeItem('phoneNumber');

        if (!scategoryName?.value || !slocationName?.value) {
            setSerrorMessage("La catégorie et la ville sont obligatoires.");
        }
        else {
            setSerrorMessage("")
            dispatch(GetAllEstablishmentProfileSearch({ search: scompanyName, categoryName: scategoryName?.value, city: slocationName?.value }));
            dispatch(GetAllPublicitesList({ categoryName: scategoryName?.value, city: slocationName?.value }))
        }
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
                                            value={sphoneNumber}
                                            onChange={(value) => { setSphoneNumber(value) }}
                                        />
                                        <button onClick={() => handlePhoneSearch()} className="cursor-pointer border-2 px-4 border-gray-400 hover:border-3 hover:border-gray-800"><FaSearch className="text-black" /></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="lg:bg-white xl:h-32">
                                <div className="px-2 sm:px-10 pt-4">
                                    <p className="text-red-500 ">{serrorMessage}</p>
                                    {/* <label htmlFor="">À qui appartient ce numéro ?</label> */}
                                </div>
                                <div className="px-2 sm:px-10 pt-8 sm:flex sm:flex-col sm:item-center xl:grid xl:grid-cols-4 xl:gap-4 xl:px-2 xl:pb-8">
                                    {/* <MultiSelect

                                        hasSelectAll={false}
                                        options={categoryType}
                                        value={select}
                                        onChange={setSelect}
                                        labelledBy="Quoi: Un restaurant, un dentiste..."
                                        overrideStrings={{ "selectSomeItems": "Quoi: Un restaurant, un dentiste..." }}
                                        className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500"
                                    /> */}
                                    <Select
                                        options={categoryType}
                                        value={scategoryName}
                                        onChange={(value) => { setScategoryName(value) }}
                                        placeholder="Quoi:Un restaurant..."
                                        className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 serarch-input focus:ring-transparent"
                                    />
                                    {/* <input type="text" placeholder="Quoi: Un restaurant, un dentiste..." className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500" /> */}
                                    <input
                                        type="text"
                                        value={scompanyName}
                                        onChange={(e) => setScompanyName(e.target.value)}
                                        placeholder="Qui: Monsieur Jean, SARL..."
                                        className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 focus:ring-transparent focus:inset-ring-2"
                                    />
                                    <Select
                                        options={cityType}
                                        value={slocationName}
                                        isSearchable
                                        onInputChange={handleInputChange}
                                        onChange={(value) => { setSlocationName(value) }}
                                        placeholder="Où: France..."
                                        className="border-0 border-b-2 border-gray-500 w-full mb-3 placeholder:text-gray-400 outline-2 outline:border-gray-500 serarch-input focus:ring-transparent"
                                    />
                                    {/* <input
                                        type="text"
                                        value={slocationName}
                                        onChange={(e) => setScategoryName(e.target.value)}
                                        placeholder="Où: France, Ile-de-France, Paris..."
                                        className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2 focus:ring-transparent"
                                    /> */}

                                    {/* <div className="border-0 border-b-2 border-gray-500 w-full mb-5 lg:mb-3 placeholder:text-gray-400 outline-2">
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
                                    </div> */}

                                    <button onClick={() => { handleProfileSearch() }} className="text-black font-bold border_black p-3 w-full sm:w-64 lg:w-full mb-5 lg:mb-3 search-btn">
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Rechercher"
                                        }
                                    </button>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Search;