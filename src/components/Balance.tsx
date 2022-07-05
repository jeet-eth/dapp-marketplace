/* eslint-disable no-nested-ternary */
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import logger from "../logger";

function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = useState<number | null>();

  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((accountBalance: any) => {
          if (!stale) {
            setBalance(accountBalance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
    return () => {
      logger.warn("Balance component not initialized");
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="btn btn-ghost btn-sm rounded-btn normal-case">
      <span>Balance : &nbsp;</span>
      <span>{balance === null ? "Error" : balance ? `Ξ ${Number(formatEther(balance)).toPrecision(2)}` : ""}</span>
    </div>
  );
}

export default Balance;
