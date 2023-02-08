import { MouseEvent } from "react";
import Avatar from "@yourapp/components/Avatar";
import SideBar from "@yourapp/components/SideBar";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { IoMdSad } from "react-icons/io";
import MiniPost from "@yourapp/components/MiniPost";
import useAuth from "@yourapp/hooks/useAuth";
import axios from "axios";
import Modal from "@yourapp/components/Modal";
import EditProfileModal from "@yourapp/components/EditProfileModal";
import Error from "next/error";
import { UseQueryResult, useQuery } from "react-query";
import { useRouter } from "next/router";
function Profile() {
  const router = useRouter();
  const userName = router.query["profile"];
  const { user } = useAuth();
  const {
    data: userInfo,
    isLoading: checkUser,
  }: UseQueryResult<userInfo, Error> = useQuery(
    ["user-info", userName],
    async () => {
      const res = await axios
        .get(
          `https://insta-clone-backend-dipper.onrender.com/api/v1/user/u/${userName}`
        )
        .then((res) => {
          return res.data["user"];
        })
        .catch(() => undefined);
      return res;
    }
  );
  const { data: listPosts, refetch }: UseQueryResult<listPosts, Error> =
    useQuery(["mini-posts", userName], async () => {
      const res = await axios
        .get(
          `https://insta-clone-backend-dipper.onrender.com/api/v1/post/u/${userName}`
        )
        .then((res) => {
          return res.data["posts"];
        });
      return res;
    });

  const [Posts, setPosts] = useState(0);
  const [Follower, setFollower] = useState(0);
  const [Following, setFollowing] = useState(0);
  const [Followed, setFollowed] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleFollow = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (Followed) {
        await axios
          .put(
            `https://insta-clone-backend-dipper.onrender.com/api/v1/user/${
              userInfo && userInfo.user_name
            }/unfollow`,
            {},
            {
              headers: { Authorization: "Bearer " + user?.token },
            }
          )
          .then(() => {
            setFollower((prev) => prev - 1);
            setFollowed(false);
          });
      } else {
        await axios
          .put(
            `https://insta-clone-backend-dipper.onrender.com/api/v1/user/${
              userInfo && userInfo.user_name
            }/follow`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user?.token,
              },
            }
          )
          .then(() => {
            setFollower((prev) => prev + 1);
            setFollowed(true);
          });
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (userInfo && listPosts) {
      setFollowed(userInfo.followers.includes(user?._id));
      setFollower(userInfo.followers.length);
      setFollowing(userInfo.following.length);
      setPosts(listPosts.length);
    }
  }, [userInfo, listPosts, user?._id, refetch]);
  useEffect(() => {
    if (editModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [editModal]);

  if (!userInfo && !checkUser) {
    return <Error statusCode={404} />;
  } else if (checkUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      {editModal && (
        <Modal handleClose={setEditModal}>
          <EditProfileModal userInfo={userInfo} showModal={setEditModal} />
        </Modal>
      )}
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
                {userInfo.user_name === user?.userName ? (
                  <button
                    type="button"
                    className="user-info__edit-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditModal(true);
                    }}
                  >
                    Edit profile
                  </button>
                ) : (
                  <button
                    type="button"
                    className="user-info__follow-btn"
                    onClick={handleFollow}
                  >
                    {Followed ? "Followed" : "Follow"}
                  </button>
                )}
              </div>
              <div className="status-info">
                <span className="info-posts">{Posts} Posts</span>
                <span className="info-follower">{Follower} Followers</span>
                <span className="info-following">{Following} Following</span>
              </div>
            </div>
          </header>
          <main className="profile-page__main">
            {Posts === 0 ? (
              <div className="profile-page__main--no-posts">
                <IoMdSad size={100} />
                {userInfo.user_name === user?.userName ? (
                  <>
                    <h3>You have no posts</h3>
                    <h5>
                      Share your first post, it will appear on your profile.
                    </h5>
                  </>
                ) : (
                  <>
                    <h3>{userInfo.user_name} have no posts</h3>
                    <h5>
                      Tell {userInfo.user_name} to share first post, so you can
                      see it here.
                    </h5>
                  </>
                )}
              </div>
            ) : (
              <div className="profile-page__main--list-posts">
                {listPosts &&
                  listPosts.map((p, index) => {
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      requireAuth: true,
    },
  };
};

type listPosts = {
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
  description: string;
  createdAt: string;
}[];
type userInfo = {
  _id: string;
  email: string;
  user_name: string;
  role: string;
  profile_picture: string;
  followers: any[];
  following: any[];
  gender: string;
};
