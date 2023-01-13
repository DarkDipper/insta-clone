import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
        <Image
          src="https://i.ibb.co/JCVy7Nb/login-Page.png"
          width={465}
          height={635}
          alt=""
          className="image-login-background"
        />
        <div className="image-login">
          <Image
            className={imgTransition === 0 ? "show" : "hide"}
            src="https://i.ibb.co/Wp5TC5s/loginpage1.png"
            width={250}
            height={541}
            alt=""
          />
          <Image
            className={imgTransition === 1 ? "show" : "hide"}
            src="https://i.ibb.co/g9Phymv/loginpage2.png"
            width={250}
            height={541}
            alt=""
          />
          <Image
            className={imgTransition === 2 ? "show" : "hide"}
            src="https://i.ibb.co/nkYrxTW/loginpage3.png"
            width={250}
            height={541}
            alt=""
          />
          <Image
            className={imgTransition === 3 ? "show" : "hide"}
            src="https://i.ibb.co/8BzLG09/loginpage4.png"
            width={250}
            height={541}
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
