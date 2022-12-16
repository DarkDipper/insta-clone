import Link from "next/link";
import { useState, MouseEvent,useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { ThemeContext } from "../../theme";
type Props = {
  setShowRegister: (value: boolean) => void;
};

export default function LoginForm({ setShowRegister }: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const {mode,toggleMode} = useContext(ThemeContext);
  const handleShowRegister = (e: MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  };
  return (
    <div className={"login-container"}>
      <div className="login-container__top">
        <h1 className="name-app">Instagram</h1>
        <IconButton className="btn-toggle-mode" onClick={toggleMode}>
          {mode === "light" ? (
            <FaRegMoon style={{ height: "100%", width: "100%" }} />
          ) : (
            <FaSun style={{ height: "100%", width: "100%" }} />
          )}
        </IconButton>
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
                <AiFillEyeInvisible style={{ height: "100%", width: "100%" }} />
              ) : (
                <AiFillEye style={{ height: "100%", width: "100%" }} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Log in
          </button>
          <Link href="#">Forgot password ?</Link>
        </form>
      </div>
      <div className="login-container__botom">
        <p>
          Don&lsquo;t have an account ?
          <Link onClick={handleShowRegister} href="#">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
