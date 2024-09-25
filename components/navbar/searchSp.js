import SearchLi from "./searchLi";
import style from "./searchSp.module.scss";
import { Container, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
const SearchSp = (props) => {
  return (
    <div className={style.ahv}>
      <PerfectScrollbar>
        <Container className={style.con}>
          <Row>
            {" "}
            {props.list ? <SearchLi listTop={props.list.data} /> : null}
          </Row>
        </Container>
      </PerfectScrollbar>
    </div>
  );
};
export default SearchSp;
