`use client`;

import Layout from "@/Components/Admin/Layout";
import ViewOrEditPublicites from "@/Components/Admin/Publicites/ViewOrEditPublicites";

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