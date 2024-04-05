import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/Navbar";

export const Pet = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
  // console.log("Initial token in Pet component:", token);
  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
  };

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews token={token} setToken={setToken} />
    </>
  );
};
