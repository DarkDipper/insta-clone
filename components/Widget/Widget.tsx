import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Avatar from "../Avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import SuggestItem from "./SuggestItem";
import { UseQueryResult, useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
function Widget() {
  const { data, status }: UseQueryResult<[], Error> = useQuery(
    "userSuggest",
    async () => {
      const res = await axios.get(
        "https://insta-clone-backend-dipper.onrender.com/api/v1/user/suggestUser",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("6gR265$m_t0k3n"),
          },
        }
      );
      return res.data["userSuggest"];
    }
  );
  const skeletonList = [];
  for (let i = 0; i < 5; i++) {
    skeletonList.push(
      <div
        key={i}
        style={{
          display: "flex",
          gap: "0.75rem",
          height: "100%",
          paddingBlock: "0.5rem",
        }}
      >
        <Skeleton baseColor="darkgray" circle={true} height={40} width={40} />
        <Skeleton baseColor="darkgray" height={40} width={200} />
      </div>
    );
  }
  return (
    <div className="widget">
      {/* <div className="main-account">
        <div className="main-account__avatar">
          <Avatar src="https://i.ibb.co/YXL10VM/animelody.png" />
        </div>
        <div className="main-account__name">
          <p className="main-account__name__user-name">phong_huynh_2022</p>
          <p className="main-account__name__real-name">Phong Huỳnh</p>
        </div>
        <button className="main-account__switch-account">Switch</button>
      </div> */}
      <div className="suggestion-board">
        <header className="suggestion-board__header">
          <p className="suggestion-board__header__text">Suggestion For You</p>
          {/* <button className="suggestion-board__header__see-all">See All</button> */}
        </header>
        <main className="suggestion-board__main">
          {status === "loading"
            ? skeletonList
            : data &&
              data.map((u) => {
                return <SuggestItem key={u["_id"]} user={u} />;
              })}
        </main>
      </div>
      <div className="copy-right">
        <div className="copy-right__socials-icon">
          <Link href={"https://github.com/DarkDipper"}>
            <BsGithub size={20} color="white" />
          </Link>
          {/* <BsLinkedin size={20} />
          <BsFacebook size={20} /> */}
        </div>
        <p className="copy-right__text">&#169; 2023 Insta clone from Dipper</p>
      </div>
    </div>
  );
}

export default Widget;
