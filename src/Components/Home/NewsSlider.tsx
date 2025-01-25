`use client`;

import Image from "next/image";

import TestImg from '@/Images/Home/Logo.png';

import { FaChevronRight, FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";


import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseString } from "xml2js";

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
    const [jsonData, setJsonData] = useState<any>(null);

    // useEffect(() => {
    //     const fetchXML = async () => {
    //         try {
    //             const response = await axios.get("/api/get-xml");

    //             parseString(response.data, { explicitArray: false }, (err, result) => {
    //                 if (err) {
    //                     console.error("Error parsing XML:", err);
    //                 } else {
    //                     setJsonData(result);
    //                 }
    //             });
    //         } catch (error) {
    //             console.error("Error fetching XML:", error);
    //         }
    //     };

    //     fetchXML();
    // }, []);


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
                                            <div className="bg-gray-100 h-40 text-center flex justify-center content-center items-center">
                                                <Image src={TestImg} alt="img" className="w-full h-16" />
                                            </div>
                                            <div className="pt-3 p-4">
                                                <p className="font-medium mb-2 txt_light_green line-clamp-2">{item?.title}</p>
                                                <p className="pb-2">{item?.time}</p>
                                                <p className="mb-2 line-clamp-2">{item?.description}</p>
                                                <a href={item?.link}><p className="text-right font-medium underline flex">En savoir plus <FaChevronRight className="mt-1" /></p></a>
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