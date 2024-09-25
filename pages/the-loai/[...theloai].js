import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ListAudio from "@/components/audio/ListAudio";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getApiListTL } from "@/components/services/apiServices";

const TheLoai = () => {
  const router = useRouter();
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
  const handlePageClick = (event) => {
    getdata(event.selected);
    const collection = document.getElementsByClassName("page-item");
    collection[0].scrollIntoView(true);
  };
  return (
    <div style={{ maxWidth: "800px" }} className="container px-2">
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
