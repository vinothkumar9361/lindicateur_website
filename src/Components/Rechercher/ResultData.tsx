"use client";

import Image from "next/image";

import TestImg from '@/Images/Home/news-slider-img.avif';

const data: any = [
    {
        image: TestImg,
        name: "Test",
        category: "acoustique (etudes, projets, mesures)",
        location: "53 Rue Carnot - Boulogne-Billancourt 92100",
        phoneNumber : "01 08 75 85 34",
    },
    {
        image: TestImg,
        name: "Test 2",
        category: "acoustique (etudes, projets, mesures)",
        location: "53 Rue Carnot - Boulogne-Billancourt 92100",
        phoneNumber : "01 08 75 85 34",
    }
]

const ResultData = () => {
    return (
        <>
            <div className="result-data bg-white flex flex-wrap justify-center gap-5 p-4 mt-6">
                <p><b>2 résultats</b> trouvés "àcoustique(etudes, projects, mesures) (Vitry Sur Seine (94))"</p>
                {
                    data?.map((item:any, i:number) => {
                        return(
                            <>
                              <div className="w-full sm:w-64 md:w-80 lg:w-64 2xl:w-80 box_shadow_light">
                                  <div >
                                     <Image src={item?.image} alt="img" className="w-full" />
                                  </div>
                                  <div className="text-center px-4 py-4">
                                      <h5 className="font-bold py-2">{item?.name}</h5>
                                      <p className="bg_green py-1 ">{item?.category}</p>
                                      <p className="py-2">{item?.location}</p>
                                      <p className="py-1"><b>Tel :</b>{item?.phoneNumber}</p>
                                  </div>
                              </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ResultData;