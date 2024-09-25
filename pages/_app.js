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
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
