`use client`;

// export async function getStaticProps() {
//     return {
//         props: {
//             someData: 'static data',
//         },
//     };
// }

import Layout from "@/Components/Admin/Layout";
import Profile from "@/Components/Admin/Profile/Profile";

export default function profile() {
    return (
        <>
            <Layout>
                <Profile />
            </Layout>
        </>
    )
}