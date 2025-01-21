'use client';

import Layout from "@/Components/Admin/Layout";
import EtablissementList from "@/Components/Admin/Etablissement/EtablissementList";

const Admin = () => {
    return (
        <>
            <Layout>
                <EtablissementList />
            </Layout>
        </>
    )
}

export default Admin;