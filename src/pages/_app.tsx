import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import "../index.css";
import { store } from "../store";
import { getLibrary } from "../utils";

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Colexion Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>

      <footer className="p-10 footer bg-base-200 text-base-content">
        <div className="flex gap-12 flex-wrap">
          <span className="footer-title">Docs</span>
          <a
            href="https://nextjs.org/docs/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Nextjs Docs
          </a>
          <a href="https://hardhat.org/" target="_blank" rel="noopener noreferrer" className="link link-hover">
            Hardhat
          </a>
          <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer" className="link link-hover">
            daisyUI
          </a>
          <a
            href="https://github.com/NoahZinsmeister/web3-react"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Web3 React
          </a>
        </div>
      </footer>
    </Provider>
  );
};

export default MyApp;
