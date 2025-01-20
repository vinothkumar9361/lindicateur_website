"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useState, useEffect } from "react";

import Header from "@/Components/Common/Header";
import Footer from "@/Components/Common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [currentPathname, setCurrentPathname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      setCurrentPathname(currentUrl.pathname);
    }
  }, []);

  return (
    <>
      {
        currentPathname === '/dashboard/' ?
          null
          : <Header />
      }
      <Component {...pageProps} />
      {
        currentPathname === '/dashboard/' ?
          null
          : <Footer />
      }
    </>
  )
}