import NavBar from "../navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      <NavBar>
        <main>{props.children}</main>
      </NavBar>
    </>
  );
};
export default Layout;
