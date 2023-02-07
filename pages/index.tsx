import { GetServerSideProps, GetStaticProps } from "next";
import SideBar from "@yourapp/components/SideBar";
import Story from "@yourapp/components/Story";
import Post from "@yourapp/components/Post";
import Widget from "@yourapp/components/Widget";
import axios from "axios";
import { getCookie, CookieValueTypes } from "cookies-next";
import { QueryClient, UseQueryResult, dehydrate, useQuery } from "react-query";
import Loading from "@yourapp/components/Loading";
import { useEffect } from "react";
type postFetch = {
  status: boolean;
  Posts: [];
};

export default function Home() {
  const { data, status }: UseQueryResult<postFetch, Error> = useQuery({
    queryKey: "posts",
    queryFn: async () => await getPosts(getCookie("6gR265$m_t0k3n")),
  });
  useEffect(() => {
    console.log(status);
    console.log(data);
  }, [data, status]);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="main-page">
      <SideBar />
      <div className="main-page__center">
        <div className="main-page__center__wrapper">
          <div className="main-page__center__wrapper__left">
            <Story />
            <div className="list-post">
              {data &&
                data["Posts"].map((p, i) => <Post key={p["_id"]} post={p} />)}
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

const getPosts = async (cookie: CookieValueTypes) => {
  let stateFetched = true;
  const res = await axios
    .get("http://localhost:5000/api/v1/post/timeline?page=1&limit=1", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
    })
    .then((res) => res.data)
    .catch(() => {
      stateFetched = false;
    });
  if (!stateFetched) {
    throw new Error("Token invalid");
  }
  return res;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const tokenCookie = getCookie("6gR265$m_t0k3n", { req, res });
  const queryClient = new QueryClient();
  // console.log("Render in server");
  // await queryClient.prefetchQuery("posts", () => getPosts(tokenCookie));
  return {
    props: {
      requireAuth: true,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
