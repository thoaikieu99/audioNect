import Layout from "@/components/layout/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/Audio.scss";
import "@/styles/globals.css";
import "@/styles/ListAudio.scss";
import "@/styles/AudioPlay.scss";
import "@/styles/Navbar.scss";
import "@/styles/ListTopAudi.scss";
import "@/styles/theLoai.scss";
import "@/styles/TopAudio.scss";
import "@/styles/signUp.scss";
import "@/styles/Iot.scss";
import { useEffect } from "react";
import Head from "next/head";

import { SidebarProvider } from "@/components/context/store";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap");
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <SidebarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SidebarProvider>
    </>
  );
}
