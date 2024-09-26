import NavBar from "../navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      <NavBar coo={props.coo}>
        <main>{props.children}</main>
      </NavBar>
    </>
  );
};
export default Layout;
