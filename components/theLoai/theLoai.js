import { Col, Container, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Link from "next/link";

const TheLoai = () => {
  const theLoaiJson = [
    {
      id: 3,
      name: "Tiên Hiệp",
      slug: "tien-hiep",
      show: 1,
    },
    {
      id: 4,
      name: "Huyền Huyễn",
      slug: "huyen-huyen",
      show: 1,
    },
    {
      id: 8,
      name: "Dị Giới",
      slug: "di-gioi",
      show: 1,
    },
    {
      id: 9,
      name: "Đô Thị",
      slug: "do-thi",
      show: 1,
    },
    {
      id: 11,
      name: "Khoa Huyễn",
      slug: "khoa-huyen",
      show: 1,
    },
    {
      id: 14,
      name: "Kiếm Hiệp",
      slug: "kiem-hiep",
      show: 1,
    },
    {
      id: 16,
      name: "Xuyên Không",
      slug: "xuyen-khong",
      show: 1,
    },
    {
      id: 21,
      name: "Hài Hước",
      slug: "hai-huoc",
      show: 1,
    },
    {
      id: 39,
      name: "Dị Năng",
      slug: "di-nang",
      show: 1,
    },
    {
      id: 40,
      name: "Mạt Thế",
      slug: "mat-the",
      show: 1,
    },
    {
      id: 44,
      name: "Hệ Thống",
      slug: "he-thong",
      show: 1,
    },
    {
      id: 1293,
      name: "Hồng Hoang",
      slug: "hong-hoang",
      show: 1,
    },
    {
      id: 1551,
      name: "Vô sỉ",
      slug: "vo-si",
      show: 1,
    },
    {
      id: 1559,
      name: "Vô địch",
      slug: "vo-dich",
      show: 1,
    },
    {
      id: 6344,
      name: "Chuyển Sinh",
      slug: "chuyen-sinh",
      show: 1,
    },
    {
      id: 6712,
      name: "Trùng Sinh",
      slug: "trung-sinh",
      show: 1,
    },
  ];

  const ListAudio = theLoaiJson?.map((value) => {
    return (
      <Col md={6} lg={3} className="nomagrin" key={"theloai-" + value.id}>
        <Link
          href={`/the-loai/${value.slug}`}
          className="fill"
          title={value.name}
        >
          {value.name}
        </Link>
      </Col>
    );
  });

  return (
    <li className="nav-item dropdown ">
      <Link
        className="nav-link dropdown-toggle "
        href="/"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Thể Loại
      </Link>
      <ul className="dropdown-menu theLoai sha cloc">
        <PerfectScrollbar>
          <Container>
            <Row className="tb">{ListAudio}</Row>
          </Container>
        </PerfectScrollbar>
      </ul>
    </li>
  );
};

export default TheLoai;
