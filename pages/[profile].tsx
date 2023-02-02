import Avatar from "@yourapp/components/Avatar";
import SideBar from "@yourapp/components/SideBar";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { IoMdSad } from "react-icons/io";
import MiniPost from "@yourapp/components/MiniPost";
type Props = {
  userInfo: {
    email: string;
    user_name: string;
    role: string;
    profile_picture: string;
    followers: any[];
    following: any[];
    gender?: string;
    jwtToken?: string;
  };
  listPosts: {
    _id: string;
    comment: string[];
    list_image: {
      _id: string;
      path: string;
      width: number;
      height: number;
      blurHash: string;
    }[];
    likes: string[];
    user: {
      _id: string;
      user_name: string;
      profile_picture: string;
    };
    description?: string;
  }[];
};
function Profile({ userInfo, listPosts }: Props) {
  const [Posts, setPosts] = useState(listPosts.length);
  return (
    <div className="profile-page">
      <SideBar />
      <div className="profile-page__center">
        <div className="profile-page__center__wrapper">
          <header className="profile-page__header">
            <div className="profile-page__header__wrapper-avatar">
              <div className="avatar">
                <Avatar src={userInfo.profile_picture} />
              </div>
            </div>
            <div className="profile-page__header__wrapper-info">
              <div className="user-info">
                <h2 className="user-info__name">{userInfo.user_name}</h2>
                <button type="button" className="user-info__edit-btn">
                  Edit profile
                </button>
              </div>
              <div className="status-info">
                <span className="info-posts">{Posts} Posts</span>
                <span className="info-follower">
                  {userInfo.followers.length} Followers
                </span>
                <span className="info-following">
                  {userInfo.following.length} Following
                </span>
              </div>
            </div>
          </header>
          <main className="profile-page__main">
            {Posts === 0 ? (
              <div className="profile-page__main--no-posts">
                <IoMdSad size={100} />
                <h3>You have no posts</h3>
                <h5>Share your first post, it will appear on your profile.</h5>
              </div>
            ) : (
              <div className="profile-page__main--list-posts">
                {listPosts.map((p, index) => {
                  return <MiniPost post={p} key={p._id} />;
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
export default Profile;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const tokenCookie = getCookie("6gR265$m_t0k3n", {
    req,
    res,
  });
  const userName = query["profile"];
  const { status: userStatus, user } = await fetch(
    `http://localhost:5000/api/v1/user/u/${userName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then(async (res) => {
    if (!res.ok) {
      const { message } = await res.json();
      console.log(`From profile: ${message}`);
      return { stauts: false };
    }
    return res.json();
  });
  const { posts } = await fetch(
    `http://localhost:5000/api/v1/post/u/${userName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then(async (res) => {
    if (!res.ok) {
      const { message } = await res.json();
      console.log(`From profile: ${message}`);
      return { stauts: false };
    }
    return res.json();
  });
  if (userStatus) {
    return {
      props: {
        requireAuth: true,
        userInfo: user._doc,
        listPosts: posts,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
