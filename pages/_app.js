import { Fragment, useEffect } from "react";
import ThemeProvider from "../context/ThemeProvider";
import { StateProvider } from "../context/StateProvider";
import reducer, { initialState } from "../utils/reducer";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Component {...pageProps} />
        </StateProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
