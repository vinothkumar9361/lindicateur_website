`use client`;

import Layout from "@/Components/Dashboard/Layout";
import EstablishmentList from "@/Components/Dashboard/Establishment/EstablishmentList";

const Dashboard = () => {
    return (
        <>
            <Layout>
                <EstablishmentList />
            </Layout>
        </>
    )
}

export default Dashboard;