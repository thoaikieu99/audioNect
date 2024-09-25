import { singUP } from "@/components/services/apiServices";
import Image from "next/image";
import { useState } from "react";

const SignUp = () => {
  const aaa = async () => {
    await singUP();
  };
  aaa();
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [confir, setConfir] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  };
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
