"use client";

import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlideImg1 from '@/Images/Home/slider-img-1.avif';
import SlideImg2 from '@/Images/Home/slider-img-2.avif';
import SlideImg3 from '@/Images/Home/slider-img-3.avif';

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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

    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };
    return (
        <>
            <div className="bg-white pt-14 pb-14 ad-slider">
                <div className="container mx-auto">

                    <Slider {...settings} className="">
                        {
                            data?.map((item: any, i: number) => {
                                return (
                                    <>
                                        <div className="">
                                            <div className="bg-gray-100 text-center justify-items-center">
                                                <Image src={item?.image} alt="img" className="w-full h-40 sm:h-52 md:h-60 lg:h-full" />
                                                <div className="overlay-content ml-20 lg:ml-30">
                                                    <h3 className="text-white font-bold text-2xl sm:text-4xl lg:text-7xl lg:w-60">{item?.title}</h3>
                                                    {
                                                        item?.title ?
                                                            <button className="border border-1 text-xs sm:text-lg p-2 sm:px-4 lg:px-6 mt-2 text-white banner-btn">Read More</button>
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
        </>
    )
}

export default AdSlider;