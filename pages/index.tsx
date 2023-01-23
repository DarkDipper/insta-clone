import { useEffect } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import SideBar from "@yourapp/components/SideBar";
import Story from "@yourapp/components/Story";
import Post from "@yourapp/components/Post";
import Widget from "@yourapp/components/Widget";
import axios from "axios";
import cookie from "cookie";
type Props = {
  postData?: { Posts: [] };
  requireAuth: boolean;
  stateFetching: boolean;
};
const SlideImage = [
  "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  "https://i.ibb.co/nkYrxTW/loginpage3.png",
  "https://i.ibb.co/YXL10VM/animelody.png",
  "https://i.ibb.co/G3yfYFN/Monokuma.png",
  "https://i.ibb.co/Ctx4kbM/avatar.jpg",
];
const dummy_desc =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Architecto ad at numquam unde tempora amet veniam voluptate,praesentium cum quam ut delectus laudantium nesciunt nihil totam,dignissimos quos illo quibusdam eveniet soluta similique. Nesciuntiusto perspiciatis nam eum corporis natus?";
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
              {postData &&
                postData["Posts"].map((p, index) => (
                  <Post
                    key={index}
                    listImage={p["imgbburl"]}
                    desc={p["description"]}
                  />
                ))}
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
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
