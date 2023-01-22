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
import { useState, MouseEvent, useEffect } from "react";
import useComponentVisible from "../../hooks/useComponentVisible";
import SearchBar from "../SearchBar";
import { Dancing_Script } from "@next/font/google";
const dancingScript = Dancing_Script({
  style: ["normal"],
  subsets: ["latin"],
  preload: false,
});
export default function SideBar() {
  const [hide, setHide] = useState(false);
  const {
    externalComponentRef: buttonSearchRef,
    ref: searchBarRef,
    isComponentVisible: searchBarVisible,
    setIsComponentVisible: setSearchBarVisible,
  } = useComponentVisible(false);
  useEffect(() => {
    if (!searchBarVisible) {
      console.log("UseEffect active");
      setHide(false);
    }
  }, [searchBarVisible, setHide]);
  const sideData = [
    {
      Icon: <AiOutlineHome size={24} />,
      title: "Home",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
    {
      Icon: <IoSearch size={24} />,
      title: "Search",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
        setHide((preState: boolean) => !preState);
        setSearchBarVisible((prev) => {
          // console.log(!prev);
          return !prev;
        });
      },
      ref: buttonSearchRef,
    },
    {
      Icon: <ImCompass2 size={24} />,
      title: "Explore",
      redDot: true,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
    {
      Icon: <BsCollectionPlay size={24} />,
      title: "Reels",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
    {
      Icon: <IoPaperPlane size={24} />,
      title: "Message",
      redDot: true,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
    {
      Icon: <BsBellFill size={24} />,
      title: "Notification",
      redDot: true,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
    {
      Icon: <BsPlusSquare size={24} />,
      title: "Create",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
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
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
      },
    },
  ];
  return (
    <>
      <div className={`side-bar ${hide ? "hide" : ""}`}>
        <div className="side-bar__top">
          <Link href="#" className="side-bar__top__title">
            <p
              style={dancingScript.style}
              className="side-bar__top__title--text"
            >
              Instagram
            </p>
            <BsInstagram className="side-bar__top__title--icon" />
          </Link>
          <div className="side-bar__top__menu">
            {sideData.map((item, index) => {
              return (
                <SideBarItem
                  key={index}
                  Icon={item.Icon}
                  title={item.title}
                  hide={hide}
                  redDot={item.redDot}
                  handleItem={item.handleItem}
                  ref={item.ref}
                />
              );
            })}
          </div>
        </div>
        <div className="side-bar__bottom">
          <SideBarItem
            Icon={<FaBars size={24} />}
            title="More"
            hide={hide}
            handleItem={() => {}}
          />
        </div>
      </div>
      <SearchBar
        searchBarVisible={searchBarVisible}
        searchBarRef={searchBarRef}
      />
    </>
  );
}
