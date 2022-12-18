import SideBarItem from "./SideBarItem";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearch, IoPaperPlane } from "react-icons/io5";
import { ImCompass2 } from "react-icons/im";
import { BsCollectionPlay, BsBellFill, BsPlusSquare } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
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
    Icon: <FaBars />,
    title: "Menu",
  }
];
export default function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__top">
        <Link href="#" className="side-bar__top__title">
          Instagram
        </Link>
        <div className="side-bar__top__menu">
          {sideData.map((item, index) => {
            return (
              <SideBarItem key={index} Icon={item.Icon} title={item.title} />
            );
          })}
        </div>
      </div>
      <div className="side-bar__bottom">
        <SideBarItem Icon={<FaBars />} title="Menu" />
      </div>
    </div>
  );
}
