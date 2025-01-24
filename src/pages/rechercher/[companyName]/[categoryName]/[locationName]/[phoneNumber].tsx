`use client`;

import Search from "@/Components/Rechercher/Search";
import ResultData from "@/Components/Rechercher/ResultData";
import SearchMaps from "@/Components/Rechercher/Map";

export default function Rechercher() {
    return (
        <>
            <div className="flex flex-col bg-white pt-16 xl:pt-20 lg:flex-row">
                <div className="search-box bg-gray-100 p-4 pt-8 h-1/2 lg:h-full lg:w-4xl xl:w-2/3">
                    <Search />
                    <ResultData />
                </div>
                <div className="h-1/2 lg:h-screen lg:pt-2 lg:w-1/4 xl:w-1/3">
                     <SearchMaps />
                </div>
            </div>
        </>
    );
}
