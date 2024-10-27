import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ListAudio from "@/components/audio/ListAudio";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getApiTuTuyen } from "@/components/services/apiServices";
import { useCookies } from "react-cookie";
import LoadingModel from "@/components/ui/loadingModel";
const START = "too";
const TuTruyen = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [listAudio, setListAudio] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [isLogin, setIsLogin] = useCookies(false);
  const getdata = async (page = 0) => {
    const data = await getApiTuTuyen(page, cookies[START]);
    if (data.status == "fail") {
      alert(data.message);
      return 1;
    }
    console.log(data);
    setListAudio(data);
    return data.data.count;
  };

  useEffect(() => {
    const ad = async () => {
      let cou = await getdata();
      setPageCount(Math.ceil(cou / 42));
    };
    ad();
  }, []);
  const handlePageClick = (event) => {
    getdata(event.selected);
    const collection = document.getElementsByClassName("page-item");
    collection[0].scrollIntoView(true);
  };
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
    <div style={{ maxWidth: "800px" }} className="container">
      <div className="relative">
        <h3 className="page-title">{listAudio?.nameTheLoai}</h3>
      </div>
      <ListAudio onList={listAudio?.data?.rows} mdsize={3} />
      <Row className="justify-content-md-center">
        <Col md="auto abc">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
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
  );
};
export default TuTruyen;
