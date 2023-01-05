import Avatar from "../Avatar";
import Link from "next/link";
import SideBarItem from "./SideBarItem";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearch, IoPaperPlane } from "react-icons/io5";
import { ImCompass2 } from "react-icons/im";
import {
  BsCollectionPlay,
  BsBellFill,
  BsPlusSquare,
  BsInstagram,
} from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
const sideData = [
  {
    Icon: <AiOutlineHome />,
    title: "Home",
    redDot: false,
  },
  {
    Icon: <IoSearch />,
    title: "Search",
    redDot: false,
  },
  {
    Icon: <ImCompass2 />,
    title: "Explore",
    redDot: true,
  },
  {
    Icon: <BsCollectionPlay />,
    title: "Reels",
    redDot: false,
  },
  {
    Icon: <IoPaperPlane />,
    title: "Message",
    redDot: true,
  },
  {
    Icon: <BsBellFill />,
    title: "Notification",
    redDot: true,
  },
  {
    Icon: <BsPlusSquare />,
    title: "Create",
    redDot: false,
  },
  {
    Icon: (
      <Avatar
        src="https://i.ibb.co/G3yfYFN/Monokuma.png"
        height={24}
        width={24}
      />
    ),
    title: "Profile",
    redDot: false,
  },
];

export default function SideBar() {
  const [hide, setHide] = useState(false);
  return (
    <div className={`side-bar ${hide ? "hide" : ""}`}>
      <div className="side-bar__top">
        <Link href="#" className="side-bar__top__title">
          <p className="side-bar__top__title--text">Instagram</p>
          <BsInstagram className="side-bar__top__title--icon" />
        </Link>
        <div className="side-bar__top__menu">
          {sideData.map((item, index) => {
            return (
              <SideBarItem
                key={index}
                Icon={item.Icon}
                title={item.title}
                setHide={setHide}
                hide={hide}
                redDot={item.redDot}
              />
            );
          })}
        </div>
      </div>
      <div className="side-bar__bottom">
        <SideBarItem
          Icon={<FaBars />}
          title="More"
          setHide={setHide}
          hide={hide}
        />
      </div>
    </div>
  );
}
