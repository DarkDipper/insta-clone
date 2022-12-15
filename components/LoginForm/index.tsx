import Link from "next/link";
import { useState,MouseEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {
  setShowRegister: (value: boolean) => void;
}

export default function LoginForm({setShowRegister}:Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowRegister = (e:MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  }
  return (
    <div className={"login-container"}>
      <div className="login-container__top">
        <h1 className="name-app">Instagram</h1>
        <form action="post" className="login-form">
          <div className="username-input">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <AiFillEye style={{ height: "100%", width: "100%" }} />
              ) : (
                <AiFillEyeInvisible style={{ height: "100%", width: "100%" }} />
              )}
            </button>
          </div>
          <button type="submit" className="login-btn">
            Log in
          </button>
          <Link href="#">Forgot password ?</Link>
        </form>
      </div>
      <div className="login-container__botom">
        <p>
          Don&lsquo;t have an account ?<Link onClick={handleShowRegister} href="#" > Sign up</Link>
        </p>
      </div>
    </div>
  );
}
