
import Image from "next/image";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

import AdImg from '@/Images/Home/Ad_img.png';


const Details = () => {
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    return (
        <>
            <div className="py-10">
                <div className="container mx-auto px-4 lg:px-10">
                    <div className="flex gap-3 cursor-pointer">
                        <FaArrowLeftLong className="w-6 h-6 txt_light_green" />
                        <p className="txt_light_green">retour a la recherche</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 mt-4">
                        <div className="w-full lg:w-1/3">
                            <div className="bg-gray-300 py-2 px-4">
                                <p className="text-xl font-semibold ">Coordonnées</p>
                            </div>
                            <div className="mt-4">
                                <p className="pb-4"><span className="font-semibold text-lg">Nom : </span> Octopus ERA</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Adresse :</span> Appt 805, 132 Boulevard de Stalingrad, Ivry-sur-Seine</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Code Postal :</span> 330333</p>
                                <p className="pb-4"><span className="font-semibold text-lg">Ville : </span> Ivry-sur-Seine</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="w-1/2 bg_green flex justify-center items-center gap-3 rounded-2xl py-2">
                                    <IoCall />
                                    <p>Appel</p>
                                </button>
                                <button className="w-1/2 bg_green flex justify-center items-center gap-3 rounded-2xl">
                                    <MdEmail />
                                    <p>Email</p>
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3">
                            <Image src={AdImg} alt="image" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Présentation</p>
                        </div>
                        <div className="pt-4 px-2">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Activités</p>
                        </div>
                        <div className="pt-4 px-2">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Partenaires</p>
                        </div>
                        <div className="pt-4 px-2">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Références</p>
                        </div>
                        <div className="pt-4 px-2">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="bg-gray-300 py-2 px-4">
                            <p className="text-xl font-semibold ">Photos </p>
                        </div>
                        <div className="mt-4 lg:px-20">
                            <ImageGallery items={images} />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Details;