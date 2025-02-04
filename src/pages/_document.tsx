import { Html, Head, Main, NextScript } from "next/document";

import { ThemeModeScript } from "flowbite-react";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            <link rel="icon" href="https://lindicateurcontainer.s3.rbx.io.cloud.ovh.net/lindicateurcontainer/1737878876729-favicon.png" type="image/x-icon" />
            <ThemeModeScript />
            </Head>
            <body className="antialiased">
              <Main />
              <NextScript />
            </body>
          </Html>
          );
}
