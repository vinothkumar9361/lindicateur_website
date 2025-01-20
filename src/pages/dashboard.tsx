
import NavHeader from "@/Components/Dashboard/Nav/NavHeader";
import SideBar from "@/Components/Dashboard/Nav/SideBar";
import EstablishmentList from "@/Components/Dashboard/Establishment/EstablishmentList";

export default function Dashboard() {
    return (
        <>
            <div className="bg-gray-200 h-screen">
                <NavHeader />
                <div className="">
                    <div className="">
                        <SideBar />
                    </div>
                    <div className="fixed h-screen top-16 lg:top-24 lg:left-80 ml-4 rounded-tl-lg right-0 bg-gray-50  p-4">
                        <EstablishmentList />
                    </div>
                </div>
            </div>
        </>
    )
}