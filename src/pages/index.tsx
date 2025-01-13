import Image from "next/image";

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
      <div className="">
        <Banner />
        <Service />
        <Visitors />
        <Strengths />
        <NewsSlider />
      </div>
    </>
  );
}
