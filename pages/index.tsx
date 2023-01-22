import { useEffect } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import SideBar from "@yourapp/components/SideBar";
import Story from "@yourapp/components/Story";
import Post from "@yourapp/components/Post";
import Widget from "@yourapp/components/Widget";
import axios from "axios";
import cookie from "cookie";
type Props = {
  postData?: {};
  requireAuth: boolean;
  stateFetching: boolean;
};
export default function Home({ postData, stateFetching }: Props) {
  useEffect(() => {
    console.log(postData);
    console.log(stateFetching);
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverProps: { [k: string]: any } = {
    requireAuth: true,
    stateFetching: true,
  };
  if (typeof context.req.headers.cookie === "string") {
    const listCookie = cookie.parse(context.req.headers.cookie);
    // const authCookie: string = context.req.headers.cookie;
    const respone = await axios
      .get("http://localhost:5000/api/v1/post/timeline?page=1&limit=1", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + listCookie["6gR265$m_t0k3n"],
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        serverProps["stateFetching"] = false;
      });
    serverProps["postData"] = respone;
  } else {
    serverProps["stateFetching"] = false;
  }
  return {
    props: serverProps,
  };
};
