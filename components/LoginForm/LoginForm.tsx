import Link from "next/link";
import { useState, MouseEvent, useContext, FormEvent, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { ThemeContext } from "../../theme";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
type Props = {
  setShowRegister: (value: boolean) => void;
};

export default function LoginForm({ setShowRegister }: Props): JSX.Element {
  const { auth, initializing, getRedirect, clearRedirect, user, error } =
    useAuth();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mode, toggleMode } = useContext(ThemeContext);
  const router = useRouter();
  const handleShowRegister = (e: MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signIn(userName, passWord);
  };
  useEffect(() => {
    if (!initializing && user) {
      const redirect = getRedirect();
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  });
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
            onClick={handleSubmit}
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
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
