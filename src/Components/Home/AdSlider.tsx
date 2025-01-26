`use client`;

import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlideImg1 from '@/Images/Home/slider-img-1.avif';
import SlideImg2 from '@/Images/Home/slider-img-2.avif';
import SlideImg3 from '@/Images/Home/slider-img-3.avif';

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllBannerList } from '@/store/slices/customerAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const data: any = [
    {
        image: SlideImg1,
        title: ""
    },
    {
        image: SlideImg2,
        title: "Quick & Easy"
    },
    {
        image: SlideImg3,
        title: "Popular Recipes"
    },
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

const AdSlider = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors, CustomerBannerList } = useSelector((state: RootState) => state.lindicateur);

    console.log(CustomerBannerList);

    useEffect(() => {
        dispatch(GetAllBannerList(data));
    }, [dispatch])

    var settings = {
        dots: true,
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
    return (
        <>
            {
                CustomerBannerList?.data?.data?.length > 0 ?
                    CustomerBannerList?.data?.data?.length == 1 ?
                        <div className="bg-white pt-14 pb-14 ad-slider">
                            <div className="container mx-auto">
                                {
                                    CustomerBannerList?.data?.data?.map((item: any, i: number) => {
                                        return (
                                            <>
                                                <div className="">
                                                    <div onClick={() => { router.push(item?.websiteURL) }} className="relative bg-gray-100 text-center justify-items-center">
                                                        <img src={item?.photos} alt="img" className="w-full h-40 sm:h-52 md:h-60 lg:h-full" />
                                                        <div className="overlay-content flex flex-col pt-4 lg:justify-center lg:items-start lg:content-start lg:pl-10">
                                                            <img src={item?.logo} alt="logo" className="w-40 h-10 lg:w-60 lg:h-14" />
                                                            <h3 className="text-white text-left font-bold text-sm sm:text-xl lg:text-4xl w-52 sm:w-80 lg:w-2/3">{item?.companyName}</h3>
                                                            <p className="text-white text-left text-xs sm:text-sm w-52 sm:w-80 lg:w-2/3 pt-2">{item?.description}</p>
                                                        </div>
                                                        <div className="address-content text-white p-2">
                                                            {
                                                                item?.email ?
                                                                    <p >{item?.email}</p>
                                                                    : null
                                                            }
                                                            {
                                                                item?.phoneNumber ?
                                                                    <p>{item?.phoneNumber}</p>
                                                                    : null
                                                            }
                                                            {
                                                                item?.city ?
                                                                    <p>{item?.city}</p>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="bg-white pt-14 pb-14 ad-slider">
                            <div className="container mx-auto">

                                <Slider {...settings} className="">
                                    {
                                        CustomerBannerList?.data?.data?.map((item: any, i: number) => {
                                            return (
                                                <>
                                                    <div className="">
                                                        <div onClick={() => { item?.websiteURL ? router.push(`${item?.websiteURL}`) : null }}  className="cursor-pointer relative bg-gray-100 text-center justify-items-center ad-card">
                                                            <img src={item?.photos} alt="img" className="w-full h-full" />
                                                            <div className="overlay-content flex flex-col pt-4 content-center items-center md:justify-center md:items-start md:content-start sm:pl-10 md:pl-20 lg:pl-16">
                                                                <img src={item?.logo} alt="logo" className="w-40 h-10 lg:w-60 lg:h-14" />
                                                                <h3 className="text-white text-left font-bold text-sm sm:text-xl lg:text-4xl w-52 sm:w-80 lg:w-2/3">{item?.companyName}</h3>
                                                                <p className="text-white text-left text-xs sm:text-sm w-52 sm:w-80 lg:w-2/3 pt-2">{item?.description}</p>
                                                            </div>
                                                            <div className="hidden md:inline address-content text-white md:mr-10  p-2">
                                                                {
                                                                    item?.email ?
                                                                        <p >{item?.email}</p>
                                                                        : null
                                                                }
                                                                {
                                                                    item?.phoneNumber ?
                                                                        <p>{item?.phoneNumber}</p>
                                                                        : null
                                                                }
                                                                {
                                                                    item?.city ?
                                                                        <p>{item?.city}</p>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    : null
            }
        </>
    )
}

export default AdSlider;