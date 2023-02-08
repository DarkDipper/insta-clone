import Image from "next/image";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
export default function Checkin() {
  // const { initializing, dispatch } = useAuth();
  const [imgTransition, setImgTransition] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imgTransition < 3) {
        setImgTransition(imgTransition + 1);
      } else {
        setImgTransition(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [imgTransition]);
  return (
    <div className="login-page">
      <div className="login-page__left">
        <Image
          src="https://i.imgur.com/mRdB9za.png"
          width={465}
          height={635}
          alt=""
          loading={"eager"}
          className="image-login-background"
        />
        <div className="image-login">
          <Image
            className={imgTransition === 0 ? "show" : "hide"}
            src="https://i.imgur.com/K7a0QOr.png"
            width={250}
            height={541}
            alt=""
            loading={"eager"}
          />
          <Image
            className={imgTransition === 1 ? "show" : "hide"}
            src="https://i.imgur.com/Bf2Eau4.png"
            width={250}
            height={541}
            alt=""
            loading={"eager"}
          />
          <Image
            className={imgTransition === 2 ? "show" : "hide"}
            src="https://i.imgur.com/Ovb0G0m.png"
            width={250}
            height={541}
            alt=""
            loading={"eager"}
          />
          <Image
            className={imgTransition === 3 ? "show" : "hide"}
            src="https://i.imgur.com/BRqXvbR.png"
            width={250}
            height={541}
            alt=""
            loading={"eager"}
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
