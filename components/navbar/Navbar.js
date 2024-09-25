import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import TheLoai from "../theLoai/theLoai";
import { getfindsp } from "../services/apiServices";
import SearchSp from "./searchSp";
import Link from "next/link";
const NavBar = (props) => {
  const [value, setValue] = useState("");
  const [svl, setSvl] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const send = async () => {
    if (value.trim() != "") {
      const dataf = await getfindsp(value);
      setSvl(dataf);
    } else {
      setSvl();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      send();
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="Nabar">
      <Navbar collapseOnSelect expand="lg" className=" bg-secondary fixed-top">
        <Container>
          <Link href="/" className="navbar-brand me-auto">
            <Image
              src="/logo192.png"
              width={35}
              height={35}
              alt="Kianai"
            ></Image>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ paddingRight: "100px" }}>
              <Link href="/nghe-nhieu" className="nav-link">
                Nghe nhiều
              </Link>
              <TheLoai />
              <Link href="/tu-truyen" className="nav-link">
                Tu truyen
              </Link>
              <Nav
                style={{
                  position: "relative",
                  height: "18px",
                  width: "200px",
                }}
              >
                <Form
                  className="d-flex"
                  style={{
                    position: "absolute",
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search-i"
                    aria-label="Search"
                    value={value}
                    onChange={handleChange}
                  />
                  <Button style={{ display: "none" }} variant="outline-success">
                    Search
                  </Button>
                  {svl ? <SearchSp list={svl} /> : null}
                </Form>
              </Nav>
            </Nav>
            <Nav>
              <Nav.Link></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">sign up</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="hei"
        style={{
          paddingTop: "5rem",
        }}
      >
        {props.children}
      </div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="footer">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="footer_menu"></div>
              <div className="footer_copyright">
                <p>Made with by Kianai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;