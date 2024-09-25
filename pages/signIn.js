import { singIn } from "@/components/services/apiServices";
import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const STARTTIME = "too";
  const [cookies, setCookie] = useCookies();

  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const aaa = async () => {
    const obj = {
      username: username,
      password_hash: pass,
    };
    return await singIn(obj);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const aa = await aaa();

    console.log(aa);
    // setCookie(STARTTIME, time, { maxAge: MAXAGE });
    alert(`The name you entered was: ${aa}`);
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
          <div class="sign-txt s1ddd">
            <a href="#">Forgot password?</a>
          </div>
          <div className="asd">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div class="sign-txt">
          Not a member? <a href="#">Signup now</a>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
