import { singUP } from "@/components/services/apiServices";
import Image from "next/image";
import { useState } from "react";

const SignUp = () => {
  const aaa = async () => {
    await singUP();
  };
  aaa();
  const [email, setEmail] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${email}`);
  };
  const changEmail = (e) => {
    setEmail(e.target.value);
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
            value={email}
            onChange={changEmail}
            placeholder="Email"
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
