import { singUP } from "@/components/services/apiServices";

import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSide } from "@/components/context/store";
const SignUp = () => {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [confir, setConfir] = useState();
  const STARTTIME = "too";
  const MAXAGE = 7 * 24 * 3600;
  const [cookies, setCookie] = useCookies();
  const { login } = useSide();
  const changName = (e) => {
    setUsername(e.target.value);
  };
  const changPass = (e) => {
    setPass(e.target.value);
  };
  const changEmai = (e) => {
    setEmail(e.target.value);
  };
  const changConf = (e) => {
    setConfir(e.target.value);
  };
  const aaa = async () => {
    const obj = {
      username: username,
      password_hash: pass,
      email: email,
      confirmedPassword: confir,
    };
    return await singUP(obj);
  };
  const router = useRouter();
  if (cookies[STARTTIME]) {
    router.push(`/`);
    return;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const aa = await aaa();
    if (aa.status == "success") {
      setCookie(STARTTIME, aa.token, { maxAge: MAXAGE });
      login(aa.data.user.username);

      router.push(`/`);
    } else if (aa.status == "fail") {
      alert(aa.message);
    }
  };
  return (
    <div className="formm">
      <div className="ksk">
        <div className="aa">
          <div>Sign In</div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control input-area s1ddd"
            type="text"
            name="userName"
            value={username}
            onChange={changName}
            placeholder="Ten tai khoan"
          />
          <input
            className="form-control input-area s1ddd"
            type="text"
            name="email"
            value={email}
            onChange={changEmai}
            placeholder="Email"
          />
          <input
            className="form-control input-area s1ddd"
            type="password"
            name="pass"
            value={pass}
            onChange={changPass}
            placeholder="Mat khau"
          />
          <input
            className="form-control input-area s1ddd"
            type="password"
            name="pass"
            value={confir}
            onChange={changConf}
            placeholder="Nhap lai mat khau"
          />

          <div className="asd">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
