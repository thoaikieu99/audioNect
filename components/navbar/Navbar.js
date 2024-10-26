import Image from "next/image";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import TheLoai from "../theLoai/theLoai";
import { getfindsp } from "../services/apiServices";
import SearchSp from "./searchSp";

import Link from "next/link";
import { useRouter } from "next/router";
import Acc from "./acc";
const NavBar = (props) => {
  const [value, setValue] = useState("");
  const [svl, setSvl] = useState();
  const inputRef = React.useRef(null);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const send = async () => {
    if (value.trim() != "") {
      const dataf = await getfindsp(value, "yes");
      setSvl(dataf);
    } else {
      setSvl();
    }
  };
  useEffect(() => {
    if (props.isClick != "nu") {
    }
    document.querySelectorAll(".cloc").forEach((el) =>
      el.addEventListener("click", function () {
        if (inputRef.current.className == "navbar-toggler") {
          inputRef.current.click();
        }
      })
    );
  }, [props.isClick]);

  useEffect(() => {
    const timer = setTimeout(() => {
      send();
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);
  const router = useRouter();
  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };
  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: "/search",
      query: { name: value },
    });
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  var aasad = "";
  if (isClient) {
    aasad = <Acc />;
  } else {
    aasad = "";
  }
  const hid = () => {
    setSvl();
  };

  return (
    <div className="Nabar" onClick={hid}>
      <Navbar collapseOnSelect expand="lg" className=" bg-secondary fixed-top">
        <Container>
          <Link href="/" className="navbar-brand me-auto cloc">
            <Image
              src="/logo192.png"
              width={35}
              height={35}
              alt="Kianai"
            ></Image>
          </Link>
          <Navbar.Toggle ref={inputRef} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ paddingRight: "100px" }}>
              <Link href="/nghe-nhieu" className="nav-link cloc">
                Nghe nhiều
              </Link>
              <TheLoai />
              <Link href="/tu-truyen" className="nav-link cloc">
                Tu truyen
              </Link>
              <Nav
                style={{
                  position: "relative",
                  height: "40px",
                  width: "200px",
                }}
              >
                <Form
                  className="d-flex"
                  style={{
                    position: "absolute",
                  }}
                  onSubmit={handleSubmit}
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
            <Nav>{aasad}</Nav>
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
