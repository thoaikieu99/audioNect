import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const STARTTIME = "too";
  const router = useRouter();
  useEffect(() => {
    removeCookie(STARTTIME);
    router.push(`/`);
  }, [removeCookie]);
};
export default Logout;
