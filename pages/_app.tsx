import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "components/Header";
import "styles/global.css";
import NProgress from "nprogress";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const nprogressStart = () => NProgress.start();
    const nprogressDone = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", nprogressStart);
    router.events.on("routeChangeComplete", nprogressDone);
    router.events.on("routeChangeError", nprogressDone);

    return () => {
      router.events.off("routeChangeStart", nprogressStart);
      router.events.off("routeChangeComplete", nprogressDone);
      router.events.off("routeChangeError", nprogressDone);
    };
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
