import Link from "next/link";
import { useState, MouseEvent, useContext, FormEvent, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { ThemeContext } from "../../theme";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import axios from "axios";
import { Dancing_Script } from "@next/font/google";
type Props = {
  setShowRegister: (value: boolean) => void;
};
const dancingScript = Dancing_Script({
  style: ["normal"],
  subsets: ["latin"],
  preload: false,
});
export default function LoginForm({ setShowRegister }: Props): JSX.Element {
  const { auth, initializing, getRedirect, clearRedirect, user, error } =
    useAuth();
  const [status, setStatus] = useState(true);
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mode, toggleMode } = useContext(ThemeContext);
  const router = useRouter();
  const handleShowPassWord = (e: MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowRegister = (e: MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const respone = await axios
      .post(
        "http://localhost:5000/api/v1/user/login",
        {
          username: userName,
          password: passWord,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((respone) => {
        console.log(respone);
        setStatus(false);
      });
    const submitStatus = await auth.signIn(respone);
    setStatus(submitStatus);
  };
  useEffect(() => {
    if (!initializing && user) {
      const redirect = getRedirect();
      if (redirect) {
        clearRedirect();
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  });
  return (
    <div className={"login-container"}>
      <div className="login-container__top">
        <h1 className="name-app" style={dancingScript.style}>
          Instagram
        </h1>
        <IconButton className="btn-toggle-mode" onClick={toggleMode}>
          {mode === "light" ? (
            <FaRegMoon style={{ height: "100%", width: "100%" }} />
          ) : (
            <FaSun style={{ height: "100%", width: "100%" }} />
          )}
        </IconButton>
        <form action="post" className="login-form" onSubmit={handleSubmit}>
          <div className="username-input">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={passWord}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onClick={handleShowPassWord} type="button">
              {showPassword ? (
                <AiFillEyeInvisible style={{ height: "100%", width: "100%" }} />
              ) : (
                <AiFillEye style={{ height: "100%", width: "100%" }} />
              )}
            </button>
          </div>
          <button type="submit" className="login-btn">
            Log in
          </button>
          {!status && (
            <p className="login-error">Username or password not correct</p>
          )}
          <Link href="#">Forgot password ?</Link>
        </form>
      </div>
      <div className="login-container__botom">
        <p>
          Don&lsquo;t have an account ?
          <Link onClick={handleShowRegister} href="#">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
