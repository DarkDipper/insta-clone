/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState,useContext } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
export default function Checkin() {
  const [imgTransition, setImgTransition] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imgTransition < 3) {
        setImgTransition(imgTransition + 1);
      } else {
        setImgTransition(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [imgTransition]);
  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="image-login">
          <img
            className={imgTransition === 0 ? "show" : "hide"}
            src="https://i.ibb.co/Wp5TC5s/loginpage1.png"
            alt=""
          />
          <img
            className={imgTransition === 1 ? "show" : "hide"}
            src="https://i.ibb.co/g9Phymv/loginpage2.png"
            alt=""
          />
          <img
            className={imgTransition === 2 ? "show" : "hide"}
            src="https://i.ibb.co/nkYrxTW/loginpage3.png"
            alt=""
          />
          <img
            className={imgTransition === 3 ? "show" : "hide"}
            src="https://i.ibb.co/8BzLG09/loginpage4.png"
            alt=""
          />
        </div>
      </div>
      <div className={`login-page__right ${showRegister ? "flip" : ""}`}>
        <LoginForm setShowRegister={setShowRegister} />
        <RegisterForm setShowRegister={setShowRegister} />
      </div>
    </div>
  );
}
