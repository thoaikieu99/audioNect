import ListAudio from "@/components/audio/ListAudio";
import {
  getApiTop,
  getfind,
  getfindsp,
} from "@/components/services/apiServices";
import NarTopList from "@/components/topAudio/NarTopList";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const SearchTruyen = (props) => {
  const gpae = Math.ceil(props.dataA.data.count / 42);
  const router = useRouter();

  const handlePageClick = (event) => {
    const numb = +event.selected;

    if (numb != props.page - 1) {
      router.push(`?page=${event.selected + 1}&name=${props.name}`);
    }
  };
  return (
    <>
      <NarTopList topDay={props.topDay} topM={props.topM} topY={props.topY}>
        <div style={{ maxWidth: "800px" }} className="container ">
          <div className="relative">
            <h3 className="page-title">Tìm kiếm: {props.name}</h3>
          </div>
          <ListAudio onList={props.dataA.data?.rows} />
          <Row className="justify-content-md-center">
            <Col md="auto abc">
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={gpae}
                previousLabel="<"
                initialPage={props.page - 1}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </Col>
          </Row>
        </div>
      </NarTopList>
    </>
  );
};
export default SearchTruyen;
export async function getServerSideProps(ctx) {
  const topDay = await getApiTop("day");

  const topM = await getApiTop("month");

  const topY = await getApiTop("year");

  var page = ctx.query.page ? +ctx.query.page : 1;
  var name = ctx.query.name;
  const dataA = await getfindsp(name, "no", page);
  return { props: { dataA, page, name, topDay, topM, topY } };
}
