import { Web3ReactProvider } from "@web3-react/core";

import Demo from "../components/Demo";
import Header from "../components/Header";
import { getLibrary } from "../utils";

const App = function () {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="container min-h-screen mx-auto pt-2">
          <Header />
          <Demo />
        </div>
      </Web3ReactProvider>
    </>
  );
};

export default App;
