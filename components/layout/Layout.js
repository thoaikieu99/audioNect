import { useState } from "react";
import NavBar from "../navbar/Navbar";

const Layout = (props) => {
  const [isClick, setIsClick] = useState("nu");
  const cik = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <NavBar isClick={isClick}>
        <main onClick={cik}>{props.children}</main>
      </NavBar>
    </>
  );
};
export default Layout;
