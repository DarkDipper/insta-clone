import { useEffect } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import SideBar from "@yourapp/components/SideBar";
import Story from "@yourapp/components/Story";
import Post from "@yourapp/components/Post";
import Widget from "@yourapp/components/Widget";
import axios from "axios";
import cookie from "cookie";
import { QueryClient, UseQueryResult, dehydrate, useQuery } from "react-query";
import Loading from "@yourapp/components/Loading";

type postFetch = {
  status: boolean;
  Posts: [];
};

type Props = {
  requireAuth: boolean;
  cookie: string;
};
const SlideImage = [
  "https://i.imgur.com/RRIs928.jpeg",
  "https://i.ibb.co/nkYrxTW/loginpage3.png",
  "https://i.ibb.co/YXL10VM/animelody.png",
  "https://i.ibb.co/G3yfYFN/Monokuma.png",
  "https://i.ibb.co/Ctx4kbM/avatar.jpg",
];
const dummy_desc =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Architecto ad at numquam unde tempora amet veniam voluptate,praesentium cum quam ut delectus laudantium nesciunt nihil totam,dignissimos quos illo quibusdam eveniet soluta similique. Nesciuntiusto perspiciatis nam eum corporis natus?";
export default function Home({ cookie }: Props) {
  const { data, status, isFetching }: UseQueryResult<postFetch, Error> =
    useQuery({
      queryKey: "posts",
      queryFn: async () => await getPosts(cookie),
    });
  useEffect(() => {
    console.log(data);
    console.log("Im in Home");
  }, []);
  // if (isFetching) {
  //   return <Loading />;
  // }
  return (
    <div className="main-page">
      {/* Sidebar */}
      <SideBar />
      <div className="main-page__center">
        <div className="main-page__center__wrapper">
          <div className="main-page__center__wrapper__left">
            <Story />
            <div className="list-post">
              {data &&
                data["Posts"].map((p, index) => (
                  <Post
                    key={index}
                    listImage={p["imgurl"]}
                    desc={p["description"]}
                  />
                ))}
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

const getPosts = async (cookie: string) => {
  const res = await axios
    .get("http://localhost:5000/api/v1/post/timeline?page=1&limit=1", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
    })
    .then((res) => res.data);
  return res;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listCookie = cookie.parse(context.req.headers.cookie as string);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", () =>
    getPosts(listCookie["6gR265$m_t0k3n"])
  );
  return {
    props: {
      requireAuth: true,
      dehydratedState: dehydrate(queryClient),
      cookie: listCookie["6gR265$m_t0k3n"],
    },
  };
};
