import Link from "next/link";
import { useState, MouseEvent, FormEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { useRouter } from "next/router";
import useAuth from "@yourapp/hooks/useAuth";
import axios from "@yourapp/utils/axios";
import { Dancing_Script } from "@next/font/google";
import useTheme from "@yourapp/hooks/useTheme";
type Props = {
  setShowRegister: (value: boolean) => void;
};
const dancingScript = Dancing_Script({
  style: ["normal"],
  subsets: ["latin"],
  preload: false,
});
export default function LoginForm({ setShowRegister }: Props): JSX.Element {
  const { dispatch, auth } = useAuth();
  const [status, setStatus] = useState(true);
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mode, toggleMode } = useTheme();
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
    dispatch && dispatch({ type: "LOGIN_START" });
    const respone = await axios
      .post(
        "/user/login",
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
      .catch((error) => {
        // console.log(error);
        dispatch &&
          dispatch({
            type: "LOGIN_FAILURE",
            payload: error.response?.data.message,
          });
        setStatus(false);
      });
    if (respone === undefined) {
      setStatus(false);
    } else {
      // setCookie("6gR265$m_t0k3n", respone.data.userToken, {
      //   sameSite: "none",
      //   secure: true,
      // });
      setStatus(true);
      setTimeout(() => {
        dispatch &&
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              token: respone.data.userToken,
              userName: respone.data.user_name,
              avatar: respone.data.avatar,
            },
          });
      }, 5000);
      await auth.signIn(respone);
      router.push("/");
    }
  };
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
          <button
            type="submit"
            className="login-btn"
            // disabled={Fetching ? true : false}
          >
            Log in
          </button>
          {!status && (
            <p className="login-error">Username or password not correct</p>
          )}
          {/* <Link href="#">Forgot password ?</Link> */}
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
