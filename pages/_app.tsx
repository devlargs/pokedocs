import Header from "components/Header";
import "styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
