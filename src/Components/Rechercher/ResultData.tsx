"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/Logo.png';
import AdImg from '@/Images/Home/Ad_img.png';
import BannerBackground from '@/Images/Home/banner_background.jpg';
import Logo from '@/Images/Home/Logo.png'

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
        <div onClick={onClick} className="custom-prev-arrow" />
    )
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="custom-next-arrow" />
    )
}

const ResultData = ({ handlePlace }: any) => {
    const { Loading, success, errors, CustomerResearchData, CustomerPublicitesList } = useSelector((state: RootState) => state.lindicateur);

    console.log(CustomerPublicitesList);

    const handleSelectPlace = (value: any) => {
        console.log("testing");

        handlePlace(value);
    }

    var settings = {
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

    return (
        <>
            <div className="result-data bg-white flex flex-col justify-center gap-5 p-4 mt-6">
                {/* <p className="w-full"><b>{CustomerResearchData?.data?.data?.length} résultats</b> trouvés "{CustomerResearchData?.data?.data[0]?.categoryName ? CustomerResearchData?.data?.data[0]?.categoryName : ""}"</p> */}

                {
                    CustomerPublicitesList?.data?.data?.length > 0 || CustomerResearchData?.data?.data?.length > 0 ?
                        <>
                            {
                                CustomerPublicitesList?.data?.data?.length === 1 ?
                                    <>
                                        {
                                            CustomerPublicitesList?.data?.data?.map((item: any, i: number) => {
                                                console.log(item?.photos);

                                                return (
                                                    <>
                                                        {
                                                            item?.adBgType == "poster" ?
                                                                <div onClick={() => { handleSelectPlace(item?.city) }} className="ad-card cursor-pointer">
                                                                    <a href={item?.websiteURL} className="w-full h-full" target="_blank">
                                                                        <img src={item?.photos} alt="img" className="w-full h-full" />
                                                                    </a>
                                                                    {/* <Image src={item?.photos} alt="img" className="w-full h-full" width={900} height={580} /> */}
                                                                </div>
                                                                :
                                                                <div onClick={() => { handleSelectPlace(item?.city) }} className="cursor-pointer ad-banner cursor-pointer">
                                                                    <div className="ad-text">
                                                                        <div className="ad-left-box ml-14 py-10 px-4 pt-20 ">
                                                                            <div className="pb-4">
                                                                                <img src={item?.logo ? item?.logo : Logo} alt="" />
                                                                                {/* <Image src={Logo} alt="logo" /> */}
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
                                            CustomerPublicitesList?.data?.data?.map((item: any, i: number) => {
                                                console.log(item?.photos);

                                                return (
                                                    <>
                                                        {
                                                            item?.adBgType == "poster" ?
                                                                <div onClick={() => { handleSelectPlace(item?.city) }} className="ad-card cursor-pointer">
                                                                    <a href={item?.websiteURL} className="" target="_blank">
                                                                        <img src={item?.photos} alt="img" className="" />
                                                                    </a>
                                                                    {/* <Image src={item?.photos} alt="img" className="w-full h-full" width={900} height={580} /> */}
                                                                </div>
                                                                :
                                                                <div onClick={() => { handleSelectPlace(item?.city) }} className="cursor-pointer ad-banner cursor-pointer">
                                                                    <div className="ad-text">
                                                                        <div className="ad-left-box ml-14 py-10 px-4 pt-20 ">
                                                                            <div className="pb-4">
                                                                                <img src={item?.logo ? item?.logo : Logo} alt="" />
                                                                                {/* <Image src={Logo} alt="logo" /> */}
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
                                        </Slider>
                                    </>
                            }



                            <div className="flex flex-wrap lg:justify-center xl:justify-between gap-3 p-4 mt-6">
                                {
                                    CustomerResearchData?.data?.data?.map((item: any, i: number) => {
                                        return (
                                            <>
                                                <div onClick={() => { handleSelectPlace(item?.city) }} className="cursor-pointer w-full sm:w-64 md:w-80 lg:w-64 2xl:w-64 box_shadow_light">
                                                    <div className="bg-gray-100 h-32 text-center flex justify-center content-center items-center">
                                                        <Image src={TestImg} alt="img" className="w-full h-20" />
                                                    </div>
                                                    {/* <div >
                                            <Image src={item?.photos ? item?.photos : item?.logo ? item?.logo : TestImg} alt="img" className="w-full" />
                                        </div> */}
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