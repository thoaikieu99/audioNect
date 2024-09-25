import { useEffect, useState } from "react";

import ListTopAudio from "./ListTopAudi";
import { Col, Container, Row } from "react-bootstrap";

const NarTopList = (props) => {
  const { children, topDay, topM, topY } = props;
  const [actionTop, setActionTop] = useState("topNgay");
  const [list, setList] = useState();

  const hangeonclick = (ev) => {
    setActionTop(ev.target.getAttribute("name"));
  };

  useEffect(() => {
    switch (actionTop) {
      case "topNgay":
        setList(topDay);
        break;
      case "topThang":
        setList(topM);
        break;
      case "topNam":
        setList(topY);
        break;
      default:
        setList(topDay);
    }
  }, [actionTop]);
  return (
    <Container>
      <Row>
        <Col md={7} lg={8} xl={9}>
          {children}
        </Col>

        <Col md={5} lg={4} xl={3} className="bo">
          <Row
            className="rowc"
            onClick={hangeonclick}
            style={{ cursor: "pointer" }}
          >
            <Col
              name="topNgay"
              className={actionTop === "topNgay" ? "activer" : ""}
            >
              Top ngày
            </Col>
            <Col
              name="topThang"
              className={actionTop === "topThang" ? "activer" : ""}
            >
              Top tháng
            </Col>
            <Col
              name="topNam"
              className={actionTop === "topNam" ? "activer" : ""}
            >
              Top năm
            </Col>
          </Row>

          <Row>{list ? <ListTopAudio listTop={list} /> : null}</Row>
        </Col>
      </Row>
    </Container>
  );
};
export default NarTopList;
