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
  },
  {
    Icon: <IoSearch />,
    title: "Search",
  },
  {
    Icon: <ImCompass2 />,
    title: "Explore",
  },
  {
    Icon: <BsCollectionPlay />,
    title: "Reels",
  },
  {
    Icon: <IoPaperPlane />,
    title: "Message",
  },
  {
    Icon: <BsBellFill />,
    title: "Notification",
  },
  {
    Icon: <BsPlusSquare />,
    title: "Create",
  },
  {
    Icon: <Avatar src="https://i.ibb.co/G3yfYFN/Monokuma.png" height={30} width={30} />,
    title: "Profile",
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
              />
            );
          })}
        </div>
      </div>
      <div className="side-bar__bottom">
        <SideBarItem Icon={<FaBars />} title="More" setHide={setHide} hide={hide} />
      </div>
    </div>
  );
}
