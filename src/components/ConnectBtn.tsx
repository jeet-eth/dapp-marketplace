import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

import { useEagerConnect, useInactiveListener } from "../hooks/dapp/hooks";
import { getErrorMessage } from "../utils";
import { injected } from "../utils/connectors";

function ConnectBtn() {
  const { connector, library, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [connector, active, account, error]);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = (connection: typeof injected) => connection === activatingConnector;
  const connected = (connection: typeof injected) => connection === connector;

  return (
    <>
      {active && account && connected(injected) ? (
        <button
          type="button"
          className="btn btn-sm btn-secondary normal-case"
          onClick={() => {
            deactivate();
          }}
        >
          Disconnect
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-sm btn-primary gap-2 normal-case disabled:btn-warning"
          disabled={activating(injected)}
          onClick={() => {
            setActivatingConnector(injected);
            activate(injected);
          }}
        >
          {activating(injected) ? <p className="loading">loading...</p> : <p>Connect</p>}
          <figure>
            <img
              className="h-4"
              src="https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg"
              alt="metamask"
            />
          </figure>
        </button>
      )}
    </>
  );
}

export default ConnectBtn;
