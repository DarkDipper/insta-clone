import Link from "next/link";
import { MouseEvent } from "react";
type Props = {
  Icon: React.ReactNode;
  title: string;
  setHide: (value: any) => void;
  hide: boolean;
  redDot?: boolean;
};

export default function SideBarItem({
  Icon,
  title,
  setHide,
  hide,
  redDot = false,
}: Props) {
  const handleLink = (e: MouseEvent) => {
    e.preventDefault();
    setHide((preState: boolean) => !preState);
  };
  return (
    <Link
      href="#"
      className={`side-bar__item ${hide ? "hide" : ""}`}
      onClick={handleLink}
    >
      <div className="side-bar__item__wrapper">
        <div
          className={`side-bar__item__wrapper--icon ${redDot ? "red-dot" : ""}`}
        >
          {Icon}
        </div>
        <p className={`side-bar__item__wrapper--text`}>{title}</p>
      </div>
    </Link>
  );
}
