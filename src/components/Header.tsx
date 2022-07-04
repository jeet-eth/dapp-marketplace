/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { Account } from "./Account";
import { Balance } from "./Balance";
import { ChainId } from "./ChainId";

export const Header = function () {
  const { active, error } = useWeb3React();
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      document.documentElement.setAttribute("data-theme", prevTheme === "dark" ? "light" : "dark");
      return prevTheme === "dark" ? "light" : "dark";
    });
  };

  return (
    <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">{active ? "🟢" : error ? "🔴" : "🟠"}</span>
      </div>
      <div className="flex-none hidden px-2 mx-2 lg:flex">
        <div className="flex items-center">
          <ChainId />
          <Account />
          <Balance />
          <button type="button" onClick={toggleTheme} className="btn ">
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
