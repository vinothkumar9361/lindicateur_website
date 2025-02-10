`use client`;

import { useEffect } from "react";
import { useRouter } from 'next/router';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlideImg1 from '@/Images/Home/slider-img-1.avif';
import SlideImg2 from '@/Images/Home/slider-img-2.avif';
import SlideImg3 from '@/Images/Home/slider-img-3.avif';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllBannerList } from '@/store/slices/customerAction';
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
                                                    <div onClick={() => { item?.websiteURL ? router.push(`${item?.websiteURL}`) : null }} className="cursor-pointer relative bg-gray-100 text-center justify-items-center ad-card">
                                                        <img src={item?.photos} alt="img" className="w-full h-full" />
                                                        <div className="overlay-content flex flex-col pt-4 content-center items-center text-center place-items-center sm:justify-center sm:items-start sm:content-start sm:pl-20 md:pl-20 lg:pl-16">
                                                            <div className="pb-2">
                                                                <img src={item?.logo} alt="logo" className="h-10 lg:h-14" />
                                                            </div>
                                                            <h3 className="text-white text-center sm:text-left font-bold text-sm sm:text-xl lg:text-4xl w-52 sm:w-80 lg:w-2/3">{item?.companyName}</h3>
                                                            <p className="text-white text-center sm:text-left text-xs sm:text-sm w-52 sm:w-80 lg:w-2/3 pt-2">{item?.description}</p>
                                                        </div>
                                                        <div className="hidden sm:inline address-content text-white md:mr-10  p-2">
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
                        <div className="bg-white pt-14 pb-14 sm:px-10 ad-slider">
                            <div className="container mx-auto">

                                <Slider {...settings} className="">
                                    {
                                        CustomerBannerList?.data?.data?.map((item: any, i: number) => {
                                            return (
                                                <>
                                                    <div className="">
                                                        <div onClick={() => { item?.websiteURL ? router.push(`${item?.websiteURL}`) : null }} className="cursor-pointer relative bg-gray-100 text-center justify-items-center ad-card">
                                                            <img src={item?.photos} alt="img" className="w-full h-full" />
                                                            <div className="overlay-content flex flex-col pt-4 content-center items-center text-center place-items-center sm:justify-center sm:items-start sm:content-start sm:pl-20 md:pl-20 lg:pl-16">
                                                                <div className="pb-2">
                                                                    <img src={item?.logo} alt="logo" className="h-10 lg:h-14" />
                                                                </div>
                                                                <h3 className="text-white text-center sm:text-left font-bold text-sm sm:text-xl lg:text-4xl w-52 sm:w-80 lg:w-2/3">{item?.companyName}</h3>
                                                                <p className="text-white text-center sm:text-left text-xs sm:text-sm w-52 sm:w-80 lg:w-2/3 pt-2">{item?.description}</p>
                                                            </div>
                                                            <div className="hidden sm:inline address-content text-white md:mr-10  p-2">
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