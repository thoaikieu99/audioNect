import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useSide } from "@/components/context/store";

const Acc = () => {
  const { isLogin, userName } = useSide();
  const aa = (
    <li className="nav-item dropdown ">
      <Link
        className="nav-link dropdown-toggle"
        href="/"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {userName}
      </Link>
      <ul className="dropdown-menu acac">
        <Container>
          <Row>
            <Link href={`/ChangePass`}>Change password</Link>
            <Link href={`/api/logout`}>Logout</Link>
          </Row>
        </Container>
      </ul>
    </li>
  );
  const aasad = isLogin ? (
    aa
  ) : (
    <>
      <Link href="/signUp" className="nav-link">
        <p>sign up</p>
      </Link>

      <Link href="/signIn" className="nav-link">
        <p>sign in</p>
      </Link>
    </>
  );
  return aasad;
};
export default Acc;
