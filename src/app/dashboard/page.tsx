'use client';

import dynamic from 'next/dynamic';


const Dashboard = ({ params }: any) => {
    const { slug } = params;
    console.log(slug);

    return (
        <>
            <div className="w-full h-screen lg:w-auto">

            </div>
        </>
    )
}

export default Dashboard;