"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/news-slider-img.avif';

import { FaChevronRight, FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import { useState } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data: any = [
    {
        image: TestImg,
        title: "Discours de politique générale : Bayrou ignore le climat",
        description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
        time: "10/01/2025 à 07:35"
    },
    {
        image: TestImg,
        title: "Discours de politique générale : Bayrou ignore le climat",
        description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
        time: "10/01/2025 à 07:35"
    },
    {
        image: TestImg,
        title: "Discours de politique générale : Bayrou ignore le climat",
        description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
        time: "10/01/2025 à 07:35"
    },
    {
        image: TestImg,
        title: "Discours de politique générale : Bayrou ignore le climat",
        description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
        time: "10/01/2025 à 07:35"
    },
    {
        image: TestImg,
        title: "Discours de politique générale : Bayrou ignore le climat",
        description: "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
        time: "10/01/2025 à 07:35"
    },
]

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FaChevronCircleRight className="arrows" style={{ color: "white" }} />
        </div>
    )
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`} >
            <FaChevronCircleRight className="arrows" style={{ color: "white" }} />
        </div>
    )
}

const NewsSlider = () => {
    const [show, setShow] = useState<boolean | null>(true);

    var settings = {
        // dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,

                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,

                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className="mt-14 news-slider">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h5 className="txt_green font-medium">Actualités</h5>
                        <h2 className="text-black font-normal">A la une !</h2>
                    </div>
                    <Slider {...settings} className="px-10 mt-4 mb-14">
                        {
                            data?.map((item: any, i: number) => {
                                return (
                                    <>
                                        <div className="box_shadow_light">
                                            <div className="bg-gray-100 text-center justify-items-center">
                                                <Image src={item?.image} alt="img" className="w-full h-48" />
                                            </div>
                                            <div className="pt-3 p-4">
                                                <p className="font-medium pb-2 txt_light_green">{item?.title}</p>
                                                <p className="pb-2">{item?.time}</p>
                                                <p className="pb-2">{item?.description}</p>
                                                <a href=""><p className="text-right font-medium underline flex">En savoir plus <FaChevronRight className="mt-1" /></p></a>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>

        </>
    )
}

export default NewsSlider;