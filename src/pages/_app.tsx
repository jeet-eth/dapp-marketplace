import type { AppProps } from "next/app";
import Head from "next/head";

import "../index.css";

const MyApp = function ({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Colexion Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
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
    </>
  );
};

export default MyApp;
