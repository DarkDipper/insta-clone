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
  {
    path: "https://i.imgur.com/ALNi1oZ.png",
    width: 250,
    height: 541,
    blurHash:
      "|JP%O|^|_2R:t7t8k9t7obI8E2%NxtxtxuWXoeRkEJIVt8oyoet7RkoejZNZVsxtofoLt6azWCayt0M~t7ofM|j?WBbHa#%gxYM{f+oeRjayj[oe=yx]IVafRjRPoeWCR+D]~UM_IVR*Myt6a{s:~mD+D+ova_jYRQWVWC",
  },
  {
    path: "https://i.imgur.com/dzcyg4Y.jpg",
    width: 467,
    height: 440,
    blurHash:
      "|3Jt|{m:20?aD$,n?bFXtR^Qq^R6tKRNTKRYIvs91~t9}7IqRPT{K+rot9T4wKN1Iq%NburXTKIpEMZ$H?o|-hv{NZIB$m-=tQQ-Vtt,ROKP_3#6GZw_o%JB$%wvR$KQ.0^OM|%NVtDQr[%#I;x[-;ouXT-qBYMvvLENTa",
  },
  {
    path: "https://i.imgur.com/UyRZeyc.png",
    width: 1920,
    height: 1080,
    blurHash:
      "|7N[aNHt00tm54^$0=xpGI4TD+HD58Ob%HDixuh}~qxZMLxWDO-T?]o}-nsmx]V@rrK%J7DPNx?a-5jJ-Pi_OtNID+o|ivNLxDTHx[H@Iq-oIVTKjGw[Mz%fRQNH%eR6VsoeWBD+%Lx[V@xYNbWC%1Rlt5i_g3R+RQodae",
  },
  {
    path: "https://i.imgur.com/29SXewB.png",
    width: 2560,
    height: 1440,
    blurHash:
      "|~L;me~qWBIUofxuf6Rjfkj[j[fkjtf6a|jtjtfkWBj[ofWBWBofj[WBf6kCj[ayayj[jta|a|jZofayWBkCofWBayoffQjZj[j[f6ayfkfQf6fkWBfkoff6ayfkj[f6fkj[fkayj[j[ayjtj[aykCf6aej[j[f6fQbHay",
  },
  {
    path: "https://i.imgur.com/pnXjVgd.jpg",
    width: 600,
    height: 640,
    blurHash:
      "|bQJWQV@~qtSxuRiM{xuxunhMxRkx[ozjvxtofRk-;RQIUtQt7t7ayRjRkM|t7xuWCWBWARQWBt6-;ozRjWARPWBWBaef7%Mt7RjRjoKWBRjaxoft7tRRjRPayayt7WBWBt7j[jsRjWBt7ofj@aykCWBaeofayj@WBj]t7",
  },
];
const dummy_desc =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Architecto ad at numquam unde tempora amet veniam voluptate,praesentium cum quam ut delectus laudantium nesciunt nihil totam,dignissimos quos illo quibusdam eveniet soluta similique. Nesciuntiusto perspiciatis nam eum corporis natus?";
export default function Home({ cookie }: Props) {
  const { data, status, isFetching }: UseQueryResult<postFetch, Error> =
    useQuery({
      queryKey: "posts",
      queryFn: async () => await getPosts(cookie),
    });
  const listPost =
    data &&
    data["Posts"].map((p) => {
      // console.log(`Post number ${index}`);
      return (
        <Post
          key={p["_id"]}
          listImage={p["list_image"]}
          desc={p["description"]}
        />
      );
    });
  useEffect(() => {
    console.log(data);
    console.log("Im in Home");
  }, []);
  if (status === "loading") {
    return <Loading />;
  }
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
                    key={p["_id"]}
                    listImage={p["list_image"]}
                    desc={p["description"]}
                  />
                ))}
              {/* {listPost} */}
              {/* <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} />
              <Post listImage={SlideImage} desc={dummy_desc} /> */}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listCookie = cookie.parse(context.req.headers.cookie as string);
  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery("posts", () => getPosts(listCookie["6gR265$m_t0k3n"]))
    .catch(() => {
      console.log("Can't get list post");
      throw new Error();
    });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      cookie: listCookie["6gR265$m_t0k3n"],
    },
  };
};
