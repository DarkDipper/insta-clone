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
function Profile({ userInfo, listPosts }: Props) {
  const { user } = useAuth();
  const [Posts, setPosts] = useState(0);
  const [Follower, setFollower] = useState(0);
  const [Following, setFollowing] = useState(0);
  const [Followed, setFollowed] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleFollow = async (e: MouseEvent) => {
    e.preventDefault();
    console.log(userInfo.user_name);
    try {
      if (Followed) {
        await axios
          .put(
            `https://insta-clone-backend-dipper.onrender.com/api/v1/user/${userInfo.user_name}/unfollow`,
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
            `https://insta-clone-backend-dipper.onrender.com/api/v1/user/${userInfo.user_name}/follow`,
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
    // console.log(userInfo.following);
    setFollowed(userInfo.followers.includes(user?._id));
    setFollower(userInfo.followers.length);
    setFollowing(userInfo.following.length);
    setPosts(listPosts.length);
  }, [userInfo.following, userInfo._id]);
  useEffect(() => {
    if (editModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [editModal]);
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
  const userName = query["profile"];
  const { status: userStatus, user } = await fetch(
    `https://insta-clone-backend-dipper.onrender.com/api/v1/user/u/${userName}`,
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
    const { posts } = await fetch(
      `https://insta-clone-backend-dipper.onrender.com/api/v1/post/u/${userName}`,
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
    return {
      props: {
        requireAuth: true,
        userInfo: user,
        listPosts: posts,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
type Props = {
  userInfo: {
    _id: string;
    email: string;
    user_name: string;
    role: string;
    profile_picture: string;
    followers: any[];
    following: any[];
    gender: string;
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
    description: string;
    createdAt: string;
  }[];
};
