import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { getErrorMessage } from "../utils";
import { injected } from "../utils/connectors";

export const Demo = function () {
  const { error, active, library, account, connector } = useWeb3React<Web3Provider>();
  const connected = (connection: typeof injected) => connection === connector;

  return (
    <div className="flex justify-center mt-4">
      <div>{!!error && <h4>{getErrorMessage(error)}</h4>}</div>
      {(active || error) && connected(injected) && (
        <>
          {!!(library && account) && (
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => {
                library
                  .getSigner(account)
                  .signMessage("👋")
                  .then((signature: any) => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch((err: Error) => {
                    window.alert(`Failure!${err && err.message ? `\n\n${err.message}` : ""}`);
                  });
              }}
            >
              SAY HI 👋
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Demo;
