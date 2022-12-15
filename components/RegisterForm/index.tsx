import Link from "next/link";
import { useState, MouseEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {
  setShowRegister: (value: boolean) => void;
};

export default function RegisterForm({ setShowRegister }: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowRegister = (e: MouseEvent) => {
    e.preventDefault();
    setShowRegister(false);
  };
  return (
    <div className={"register-container"}>
      <div className="register-container__top">
        <h1 className="name-app">Instagram</h1>
        <form action="post" className="register-form">
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
