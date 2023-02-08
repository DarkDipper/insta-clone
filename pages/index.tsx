import { GetServerSideProps } from "next";
import SideBar from "@yourapp/components/SideBar";
import Story from "@yourapp/components/Story";
import Post from "@yourapp/components/Post";
import Widget from "@yourapp/components/Widget";
import axios from "axios";
import { getCookie, CookieValueTypes } from "cookies-next";
import { UseQueryResult, useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
type postFetch = {
  status: boolean;
  Posts: [];
};

export default function Home() {
  const { data, isLoading }: UseQueryResult<postFetch, Error> = useQuery({
    queryKey: "posts",
    queryFn: async () => await getPosts(getCookie("6gR265$m_t0k3n")),
  });
  // useEffect(() => {
  //   console.log(status);
  //   console.log(data);
  // }, [data, status]);
  return (
    <div className="main-page">
      <SideBar />
      <div className="main-page__center">
        <div className="main-page__center__wrapper">
          <div className="main-page__center__wrapper__left">
            <Story />
            <div className="list-post">
              {isLoading ? (
                <div className="list-post__skeleton">
                  <h1>Loading...</h1>
                </div>
              ) : (
                data &&
                data["Posts"].map((p) => <Post key={p["_id"]} post={p} />)
              )}
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
    .get(
      "https://insta-clone-backend-dipper.onrender.com/api/v1/post/timeline?page=1&limit=1",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie,
        },
      }
    )
    .then((res) => res.data)
    .catch(() => {
      stateFetched = false;
    });
  if (!stateFetched) {
    throw new Error("Token invalid");
  }
  return res;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      requireAuth: true,
    },
  };
};
