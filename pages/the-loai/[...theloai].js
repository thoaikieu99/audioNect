import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ListAudio from "@/components/audio/ListAudio";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getApiListTL } from "@/components/services/apiServices";
import LoadingModel from "@/components/ui/loadingModel";

const TheLoai = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(true);

  const { theloai } = router.query;
  const [listAudio, setListAudio] = useState();
  const [pageCount, setPageCount] = useState(0);

  const getdata = async (page = 0) => {
    if (theloai) {
      const data = await getApiListTL(theloai, page);
      setListAudio(data);
      return data.data.theLoai.count;
    }
  };

  useEffect(() => {
    const ad = async () => {
      let cou = await getdata();
      setPageCount(Math.ceil(cou / 42));
    };
    ad();
  }, [theloai]);
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
  const handlePageClick = (event) => {
    getdata(event.selected);
    const collection = document.getElementsByClassName("page-item");
    collection[0].scrollIntoView(true);
  };
  return (
    <div style={{ maxWidth: "800px" }} className="container">
      <div className="relative">
        <h3 className="page-title">{listAudio?.nameTheLoai}</h3>
      </div>
      <ListAudio onList={listAudio?.data?.theLoai?.rows} mdsize={3} />
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
export default TheLoai;
