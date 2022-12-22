import Link from "next/link";
import { useState, MouseEvent, useContext, FormEvent, useReducer } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegMoon, FaSun } from "react-icons/fa";
import IconButton from "../IconButton";
import { ThemeContext } from "../../theme";
type Props = {
  setShowRegister: (value: boolean) => void;
};

type userState = {
  username?: string;
  email?: string;
  password?: string;
};
type userAction = {
  type: string;
  payload: userState;
};

function reducer(state: userState, action: userAction) {
  const { type, payload } = action;
  switch (type) {
    case "username":
      return { ...state, username: payload.username };
    case "password":
      return { ...state, password: payload.password };
    case "email":
      return { ...state, email: payload.email };
    default:
      throw new Error("Cannot change user state");
  }
}

export default function RegisterForm({ setShowRegister }: Props): JSX.Element {
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
    // console.log(JSON.stringify(uState));
    const respone = await fetch("http://localhost:5000/api/v1/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uState),
    });
    const json = await respone.json();
    console.log(json);
  };
  return (
    <div className={"register-container"}>
      <div className="register-container__top">
        <h1 className="name-app">Instagram</h1>
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
              name="username"
              id="username"
              placeholder="Username"
              value={uState.username}
              onChange={(e) => {
                dispatch({
                  type: "username",
                  payload: { username: e.target.value },
                });
              }}
            />
          </div>
          <div className="email-input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={uState.email}
              onChange={(e) => {
                dispatch({
                  type: "email",
                  payload: { email: e.target.value },
                });
              }}
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={uState.password}
              onChange={(e) => {
                dispatch({
                  type: "password",
                  payload: { password: e.target.value },
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
          <p>
            People who use our service may have uploaded your contact
            information to Instagram. Learn More
          </p>
          <p>
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
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
