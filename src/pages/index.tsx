import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  return {
      props: {
          someData: 'static data',
      },
  };
}

import Banner from "@/Components/Home/Banner";
import Service from "@/Components/Home/service";
import Visitors from "@/Components/Home/Visitors";
import Strengths from "@/Components/Home/Strengths";
import NewsSlider from "@/Components/Home/NewsSlider";

export default function Home() {
  return (
    <>
      <div className="pt-16 lg:pt-20">
        <Banner />
        <Service />
        <Visitors />
        <Strengths />
        <NewsSlider />
      </div>
    </>
  );
}
