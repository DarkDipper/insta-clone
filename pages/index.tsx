import { useEffect, useContext } from "react";
import Router from "next/router";
import { ThemeContext } from "../theme";
import SideBar from "../components/SideBar";
export default function Home() {
  useEffect(() => {
    console.log("Im in Home")
  })

  return (
    <div className="main-page">
      {/* Sidebar */}
      <SideBar />
      <div className="main-page__center">
        {/* Story */}
        {/* Post */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex cupiditate,
        dolor nam laborum maxime explicabo quo eum, magni est, reprehenderit
        soluta quam corrupti inventore adipisci veniam. Magnam unde earum
        tempore labore debitis hic nihil possimus quibusdam et eos adipisci
        officia numquam laborum totam iusto dolore enim vitae a ducimus dolorum
        fugit cupiditate, est sint qui. Commodi debitis ipsa quam. Laborum
        voluptatibus ducimus, autem officia dolor impedit libero natus a ipsum
        tempore odio, architecto in quisquam amet placeat inventore eveniet!
        Esse fugiat amet deserunt maxime repellat harum aut dicta quis id hic
        ipsa molestias nobis placeat, suscipit dignissimos. Expedita, esse
        deleniti?
      </div>
      {/* Widget */}
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      requireAuth: true,
    },
  };
}
