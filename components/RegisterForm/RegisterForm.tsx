import Link from "next/link";
import { useState, MouseEvent, useContext, FormEvent, useReducer } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { ThemeContext } from "../../theme";
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
type userState = {
  username: string;
  email: string;
  password: string;
};
type userAction = {
  type: string;
  payload?: userState;
};

function reducer(state: userState, action: userAction) {
  const { type, payload } = action;
  if (payload !== undefined) {
    switch (type) {
      case "update":
        return { ...payload };
      default:
        throw new Error("Cannot change user state");
    }
  } else if (type === "reset") {
    return {
      username: "",
      email: "",
      password: "",
    };
  } else {
    throw Error("Payload and type not correct");
  }
}

export default function RegisterForm({ setShowRegister }: Props): JSX.Element {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mode, toggleMode } = useContext(ThemeContext);
  const [uState, dispatch] = useReducer(reducer, {
    username: "",
    email: "",
    password: "",
  });
  const handleShowRegister = (e: MouseEvent) => {
    e.preventDefault();
    setShowRegister(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post(
        "https://insta-clone-backend-dipper.onrender.com/api/v1/user/register",
        {
          username: uState.username,
          password: uState.password,
          email: uState.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        dispatch({ type: "reset" });
        setShowRegister(false);
      })
      .catch((error) => {
        console.log(error.response?.data.message);
        setErrorMsg(error.response?.data.message);
      });
  };
  return (
    <div className={"register-container"}>
      <div className="register-container__top">
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
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="username-input">
            <input
              type="text"
              placeholder="Username"
              value={uState.username}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  payload: { ...uState, username: e.target.value },
                });
              }}
            />
          </div>
          <div className="email-input">
            <input
              type="text"
              placeholder="Email"
              value={uState.email}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  payload: { ...uState, email: e.target.value },
                });
              }}
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={uState.password}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  payload: { ...uState, password: e.target.value },
                });
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
          <button type="submit" className="register-btn">
            Sign up
          </button>
          {/* <p>
            People who use our service may have uploaded your contact
            information to Instagram. Learn More
          </p> */}
          <p>{errorMsg}</p>
        </form>
      </div>
      <div className="register-container__botom">
        <p>
          Have an account ?
          <Link onClick={handleShowRegister} href="#">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
