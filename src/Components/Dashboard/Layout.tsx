`use client`;

import { useState, useEffect } from "react";

import NavHeader from "@/Components/Dashboard/Nav/NavHeader";
import SideBar from "@/Components/Dashboard/Nav/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [showSidebar, setShowSidebar] = useState<boolean | null>(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 1024) {
                setShowSidebar(false);
            }
        }
    }, []);

    const handleChangeSidebarShow = () => {
        setShowSidebar(!showSidebar);
    }
    return (
        <>
            <div className="bg-gray-200 h-screen">
                <NavHeader showsidebar={showSidebar} changesidebar={handleChangeSidebarShow} />
                <div className="">
                    <div className="">
                        <SideBar showsidebar={showSidebar} />
                    </div>
                    <div className="fixed h-screen overflow-y-auto w-full lg:w-auto top-16 lg:top-24 lg:left-80 ml-4 rounded-tl-lg right-0 bg-gray-50  p-4">
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Layout;