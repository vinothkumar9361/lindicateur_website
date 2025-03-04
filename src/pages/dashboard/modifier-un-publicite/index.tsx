`use client`;

import Layout from "@/Components/Dashboard/Layout";
import ViewOrEditPublicites from "@/Components/Dashboard/Publicites/ViewOrEditPublicites";

const View = () => {

    return (
        <>
            <Layout>
                <ViewOrEditPublicites />
            </Layout>
        </>
    )
}

export default View;