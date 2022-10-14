import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import Head from "next/head";
import AuthClient from "../src/services/AuthClient";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "tui-image-editor/dist/tui-image-editor.css";
import "../public/styles/global.css";
import "../public/styles/imageEditor.css";
import "../public/styles/responsive.css";
import { store } from "../src/store/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <Provider store={store}>
      <ApolloProvider client={AuthClient.client}>
        <SessionProvider session={session}>
          <Head>
            <title>EnochApp</title>
          </Head>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
      <ToastContainer theme="colored" draggable={false} />
      <NextNProgress
        color="#F62A67"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
        options={{ showSpinner: true, easing: "ease", speed: 500 }}
      />
    </Provider>
  );
}

export default MyApp;
