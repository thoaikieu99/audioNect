import { getApiNewAudio, getApiTop } from "@/components/services/apiServices";
import NarTopList from "@/components/topAudio/NarTopList";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ListAudio from "@/components/audio/ListAudio";
import LoadingModel from "@/components/ui/loadingModel";
export default function Home(props) {
  const [pageCount, setPageCount] = useState(0);
  const gpae = Math.ceil(props.dataa.data.count / 42);
  const router = useRouter();

  const handlePageClick = (event) => {
    const numb = +event.selected;

    if (numb != props.pa - 1) {
      router.push(`?page=${event.selected + 1}`);
    }
  };

  useEffect(() => {
    setPageCount(+props.pa - 1);
  }, []);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(true);
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoad) {
    return <LoadingModel />;
  }
  return (
    <>
      <NarTopList topDay={props.topDay} topM={props.topM} topY={props.topY}>
        <div style={{ maxWidth: "800px" }} className="container ">
          <div className="relative">
            <h3 className="page-title">Truyện mới cập nhật</h3>
          </div>
          <ListAudio onList={props.dataa.data?.rows} />
          <Row className="justify-content-md-center">
            <Col md="auto abc">
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={gpae}
                previousLabel="<"
                initialPage={pageCount}
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
}

export async function getServerSideProps(ctx) {
  const topDay = await getApiTop("day");

  const topM = await getApiTop("month");

  const topY = await getApiTop("year");

  var paa = +ctx.query.page;
  const pasd = paa && paa > 0 ? paa - 1 : 0;
  const dataa = await getApiNewAudio(pasd ? pasd : 0);
  const pa = pasd + 1;

  return { props: { dataa, pa, topDay, topM, topY } };
}
