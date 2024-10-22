import { singIn } from "@/components/services/apiServices";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { useSide } from "@/components/context/store";

const SignIn = () => {
  const { login } = useSide();
  const STARTTIME = "too";
  const MAXAGE = 7 * 24 * 3600;
  const [cookies, setCookie] = useCookies();

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const aaa = async () => {
    const obj = {
      username: username,
      password_hash: pass,
    };
    return await singIn(obj);
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
  const changName = (e) => {
    setUsername(e.target.value);
  };
  const changPass = (e) => {
    setPass(e.target.value);
  };
  return (
    <div className="formm">
      <div className="ksk">
        <div className="aa">
          <div>
            <Image
              src={"/pngegg.png"}
              alt="Login"
              width={100}
              height={100}
              priority
              style={{
                width: "30%",
                height: "auto",
              }}
            ></Image>
          </div>
          <div>Login</div>
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
            className="form-control input-area"
            type="password"
            name="pass"
            value={pass}
            onChange={changPass}
            placeholder="Mat khau"
          />
          <div className="sign-txt s1ddd">
            <Link href="/forgot">Forgot password?</Link>
          </div>
          <div className="asd">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="sign-txt">
          Not a member? <Link href="/signUp">Signup now</Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
