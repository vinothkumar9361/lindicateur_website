import dynamic from 'next/dynamic';

import axios from 'axios';
import { jsPDF } from "jspdf";
import sharp from 'sharp';
import Logo from '@/Images/Home/Logo.png';

// import PDFDocument from "pdfkit";
// const PDFKit = dynamic(() => import('pdfkit').then((mod) => mod), { ssr: false });
// import blobStream from "blob-stream";


const DownloadEtablissementDetails = () => {
    const handleDownload = () => {
       
    };
    return (
        <>
            <div className="flex flex-col items-center">
                <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Download PDF
                </button>
            </div>
        </>
    )
}

export default DownloadEtablissementDetails;