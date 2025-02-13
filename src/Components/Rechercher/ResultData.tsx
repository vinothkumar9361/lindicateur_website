"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/Logo.png';
import AdImg from '@/Images/Home/Ad_img.png';
import BannerBackground from '@/Images/Home/banner_background.jpg';
import Logo from '@/Images/Home/Logo.png'

import { useState, useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@/store/store';

const data: any = [
    {
        image: TestImg,
        name: "Test",
        category: "acoustique (etudes, projets, mesures)",
        location: "53 Rue Carnot - Boulogne-Billancourt 92100",
        phoneNumber: "01 08 75 85 34",
    },
    {
        image: TestImg,
        name: "Test 2",
        category: "acoustique (etudes, projets, mesures)",
        location: "53 Rue Carnot - Boulogne-Billancourt 92100",
        phoneNumber: "01 08 75 85 34",
    }
]

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="ad-custom-prev-arrow" />
    )
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="ad-custom-next-arrow" />
    )
}

const ResultData = ({ handlePlace }: any) => {
    const { Loading, success, errors, CustomerResearchData, CustomerPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    console.log(CustomerPublicitesList);

    const [fullEcranData, setFullEcranData] = useState<any | null>(null);
    const [halfEcranData, setHalfEcranData] = useState<any | null>(null);
    const [quarterEcranData, setQuarterEcranData] = useState<any | null>(null);


    const handleSelectPlace = (value: any) => {
        handlePlace(value);
    }

    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    var settingstwo = {
        dots: false,
        arrows: true,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    var settingsthree = {
        dots: false,
        arrows: true,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    useEffect(() => {

        let firstData = CustomerPublicitesList?.data?.data?.filter((item: any) => item?.imageSize.includes("1 Écran"));
        setFullEcranData(firstData);

        let secondData = CustomerPublicitesList?.data?.data?.filter((item: any) => item?.imageSize.includes("1/2 Écran"));
        setHalfEcranData(secondData);

        let thirdData = CustomerPublicitesList?.data?.data?.filter((item: any) => item?.imageSize.includes("1/4 Écran"));
        setQuarterEcranData(thirdData);
    }, [CustomerPublicitesList])
    return (
        <>
            <div className="result-data bg-white flex flex-col justify-center gap-5 p-4 mt-6">
                {/* <p className="w-full"><b>{CustomerResearchData?.data?.data?.length} résultats</b> trouvés "{CustomerResearchData?.data?.data[0]?.categoryName ? CustomerResearchData?.data?.data[0]?.categoryName : ""}"</p> */}

                {
                    CustomerPublicitesList?.data?.data?.length > 0 || CustomerResearchData?.data?.data?.length > 0 ?
                        <>
                            {
                                fullEcranData?.length <= 1 ?
                                    <>
                                        {
                                            fullEcranData?.map((item: any, i: number) => {
                                                console.log(item?.photos);

                                                return (
                                                    <>
                                                        {
                                                            item?.adBgType == "poster" ?
                                                                <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search cursor-pointer">
                                                                    <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                        <img src={item?.photos} alt="img" className="" />
                                                                    </a>
                                                                </div>
                                                                :
                                                                <div onClick={() => { handleSelectPlace(item?.address) }} className="cursor-pointer ad-banner cursor-pointer">
                                                                    <div className="ad-text">
                                                                        <div className="ad-left-box ml-14 py-10 px-4 pt-20 ">
                                                                            <div className="pb-4">
                                                                                <img src={item?.logo ? item?.logo : Logo} alt="" />
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <h3 className="pb-3">{item?.companyName}</h3>
                                                                                <h6 className="text-lg pb-3">{item?.categoryName}</h6>
                                                                                <p className="text-sm">{item?.description}</p>
                                                                            </div>

                                                                        </div>
                                                                        <div className="ad-address p-2 px-6 text-xs">
                                                                            <p className="mb-2">{item?.email}</p>
                                                                            <p className="mb-2">{item?.phoneNumber}</p>
                                                                            <p className="mb-2">{item?.city}</p>
                                                                            <p className="mb-2">{item?.city}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={`ad-background`}>
                                                                        <Image src={item?.photos ? item?.photos : BannerBackground} alt="banner" width={900} height={580} />
                                                                    </div>
                                                                </div>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <>
                                        <Slider {...settings} className="">
                                            {
                                                fullEcranData?.map((item: any, i: number) => {
                                                    console.log(item?.photos);

                                                    return (
                                                        <>
                                                            {
                                                                item?.adBgType == "poster" ?
                                                                    <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search cursor-pointer">
                                                                        <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                            <img src={item?.photos} alt="img" className="" />
                                                                        </a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </Slider>
                                    </>
                            }

                            {
                                halfEcranData?.length <= 1 ?
                                    <>
                                        {
                                            halfEcranData?.map((item: any, i: number) => {
                                                console.log(item?.photos);

                                                return (
                                                    <>
                                                        {
                                                            item?.adBgType == "poster" ?
                                                                <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search ad-card-search-2 w-4/5 flex justify-center cursor-pointer mt-6">
                                                                    <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                        <img src={item?.photos} alt="img" className="" />
                                                                    </a>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <>
                                        <Slider {...settingstwo} className="">
                                            {
                                                halfEcranData?.map((item: any, i: number) => {
                                                    console.log(item?.photos);

                                                    return (
                                                        <>
                                                            {
                                                                item?.adBgType == "poster" ?
                                                                    <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search ad-card-search-2 cursor-pointer md:mt-6">
                                                                        <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                            <img src={item?.photos} alt="img" className="" />
                                                                        </a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </Slider>
                                    </>
                            }

                            {
                                quarterEcranData?.length <= 1 ?
                                    <>
                                        <div className="">
                                            {
                                                quarterEcranData?.map((item: any, i: number) => {
                                                    console.log(item?.photos);

                                                    return (
                                                        <>
                                                            {
                                                                item?.adBgType == "poster" ?
                                                                    <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search ad-card-search-3 flex justify-center cursor-pointer mt-6">
                                                                        <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                            <img src={item?.photos} alt="img" className="" />
                                                                        </a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Slider {...settingsthree} className="md:mt-6">
                                            {
                                                quarterEcranData?.map((item: any, i: number) => {
                                                    console.log(item?.photos);

                                                    return (
                                                        <>
                                                            {
                                                                item?.adBgType == "poster" ?
                                                                    <div onClick={() => { handleSelectPlace(item?.address) }} className="ad-card-search ad-card-search-3 cursor-pointer">
                                                                        <a href={item?.websiteURL} rel="noopener noreferrer" className="" target="_blank">
                                                                            <img src={item?.photos} alt="img" className="" />
                                                                        </a>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </Slider>
                                    </>
                            }

                            <div className="flex flex-wrap lg:justify-center xl:justify-between gap-3 p-4 mt-6">
                                {
                                    CustomerResearchData?.data?.data?.map((item: any, i: number) => {
                                        return (
                                            <>
                                                <div onClick={() => { handleSelectPlace(item?.address) }} className="cursor-pointer w-full sm:w-64 md:w-80 lg:w-64 2xl:w-64 box_shadow_light">
                                                    <div className="bg-gray-100 h-26 pt-4 text-center flex justify-center content-center items-center">
                                                        <a href={item?.websiteURL} rel="noopener noreferrer" target="_blank" className="w-full h-20">
                                                            {/* <img src={item?.photos ? item?.photos : TestImg } alt="img" className="w-full h-20" /> */}
                                                            <Image src={TestImg} alt="img" className="w-full h-14" />
                                                        </a>
                                                    </div>
                                                   
                                                    <div className="text-center px-4 py-4">
                                                        <h5 className="font-bold py-2">{item?.companyName}</h5>
                                                        <p className="bg_green py-1 ">{item?.categoryName}</p>
                                                        <p className="pt-2 pb-1">{item?.address}</p>
                                                        <p className="pt-1 pb-2">{item?.city}</p>
                                                        <p className="py-1"><b>Tel :</b>{item?.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className="py-20 text-center">
                            <h3 className="text-gray-500 font bold">Aucune donnée trouvée</h3>
                        </div>
                }


            </div>
        </>
    )
}

export default ResultData;