'use client';

import Layout from "@/Components/Admin/Layout";
import BannieresList from "@/Components/Admin/Bannieres/BannieresList";

const ListAll = () => {
    return (
        <>
            <Layout>
                <BannieresList />
            </Layout>
        </>
    )
}

export default ListAll;