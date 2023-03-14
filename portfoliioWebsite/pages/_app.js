import "@/styles/globals.css";
import GoToTop from "components/bottom-to-top/GoToTop";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import LoadingBar from "react-top-loading-bar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const RouteChangeStart = () => {
      setProgress(40);
    };
    const RouteChangeComplete = () => {
      setProgress(100);
    };

    router.events.on("routeChangeStart", RouteChangeStart);
    router.events.on("routeChangeComplete", RouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", RouteChangeStart);
      router.events.off("routeChangeComplete", RouteChangeComplete);
    };
    
  }, []);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />

      <Component {...pageProps} />
      <GoToTop />

      <Footer />
    </>
  );
}
