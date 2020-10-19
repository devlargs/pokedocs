import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "components/Header";
import NProgress from "nprogress";
import { Provider as ReduxProvider } from "react-redux";
import store from "store";
import "styles/global.css";

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
    <ReduxProvider store={store}>
      <Header />
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default App;
