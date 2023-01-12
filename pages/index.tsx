import { useEffect } from "react";
import SideBar from "../components/SideBar";
import Story from "../components/Story";
import Post from "../components/Post";
import Widget from "../components/Widget";
import SearchBar from "../components/SearchBar";
export default function Home() {
  useEffect(() => {
    console.log("Im in Home");
  }, []);

  return (
    <div className="main-page">
      {/* Sidebar */}
      <SideBar />
      <div className="main-page__center">
        <div className="main-page__center__wrapper">
          <div className="main-page__center__wrapper__left">
            <Story />
            <div className="list-post">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className="main-page__center__wrapper__right">
            <Widget />
          </div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      // requireAuth: true,
    },
  };
}
