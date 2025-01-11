import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "@/Components/Common/Header";
import Footer from "@/Components/Common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  ) 
}