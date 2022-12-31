import { useEffect, useContext } from "react";
import Router from "next/router";
import { ThemeContext } from "../theme";
import SideBar from "../components/SideBar";
import Story from "../components/Story";
export default function Home() {
  useEffect(() => {
    console.log("Im in Home");
  });

  return (
    <div className="main-page">
      {/* Sidebar */}
      <SideBar />
      <div className="main-page__center">
        <div className="main-page__center__wrapper">
          {/* Story */}
          {/* Post */}
          <div className="main-page__center__wrapper__left">
            <Story />
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod animi
              pariatur est ut dolorum dicta architecto, vitae amet saepe earum
              veritatis alias, repudiandae temporibus sed iure ad, laborum
              cupiditate quia impedit similique molestias sapiente. Voluptatem
              facilis ullam laudantium sit repellendus natus officiis reiciendis
              dignissimos non quaerat dolores nemo aperiam necessitatibus est,
              ratione quidem nulla aliquam vero eos. Nostrum, nobis et. A
              assumenda asperiores non labore vero enim id perferendis minima sint
              totam cumque, nulla est mollitia expedita unde suscipit distinctio
              excepturi iste rerum ex at quidem officiis aspernatur nobis? Iste
              distinctio maxime atque ullam totam vero fugit aliquam non rerum.
            </div>
          </div>
        </div>
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
