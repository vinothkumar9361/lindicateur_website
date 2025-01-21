'use client';

import Layout from "@/Components/Admin/Layout";
import EtablissementList from "@/Components/Admin/Etablissement/EtablissementList";

const ListAll = () => {
    return (
        <>
            <Layout>
                <EtablissementList />
            </Layout>
        </>
    )
}

export default ListAll;