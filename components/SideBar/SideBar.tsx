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
import Modal from "../Modal";
import Share from "../Share";
import { Dancing_Script } from "@next/font/google";
import { useRouter } from "next/router";
import useAuth from "@yourapp/hooks/useAuth";
const dancingScript = Dancing_Script({
  style: ["normal"],
  subsets: ["latin"],
  preload: false,
});
export default function SideBar() {
  const { user } = useAuth();
  const [hide, setHide] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const route = useRouter();
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
        console.log("You navigate to HOme");
        route.push("/");
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
    // {
    //   Icon: <ImCompass2 size={24} />,
    //   title: "Explore",
    //   redDot: true,
    //   handleItem: (e: MouseEvent) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   Icon: <BsCollectionPlay size={24} />,
    //   title: "Reels",
    //   redDot: false,
    //   handleItem: (e: MouseEvent) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   Icon: <IoPaperPlane size={24} />,
    //   title: "Message",
    //   redDot: true,
    //   handleItem: (e: MouseEvent) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   Icon: <BsBellFill size={24} />,
    //   title: "Notification",
    //   redDot: true,
    //   handleItem: (e: MouseEvent) => {
    //     e.preventDefault();
    //   },
    // },
    {
      Icon: <BsPlusSquare size={24} />,
      title: "Create",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
        setShowShare(true);
      },
    },
    {
      Icon: <Avatar src={user?.avatar} />,
      title: "Profile",
      redDot: false,
      handleItem: (e: MouseEvent) => {
        e.preventDefault();
        route.push(`/${user?.userName}`);
      },
    },
  ];
  return (
    <>
      <div className={`side-bar ${hide ? "hide" : ""}`}>
        <div className="side-bar__top">
          <Link href="/" className="side-bar__top__title">
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
      {showShare && (
        <Modal handleClose={setShowShare}>
          <Share
            handleClose={setShowShare}
            userName={user?.userName}
            avatar={user?.avatar}
          />
        </Modal>
      )}
    </>
  );
}
