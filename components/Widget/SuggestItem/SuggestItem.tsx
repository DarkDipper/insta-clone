import Avatar from "@yourapp/components/Avatar";
import useAuth from "@yourapp/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useState, MouseEvent } from "react";
type Props = {
  user: {
    _id: string;
    user_name: string;
    profile_picture: string;
  };
};
function SuggestItem({ user }: Props) {
  const { user: userAuth } = useAuth();
  const [Followed, setFollowed] = useState(false);
  const handleFollow = async (e: MouseEvent) => {
    e.preventDefault();
    // console.log(user.user_name);
    try {
      if (Followed) {
        await axios
          .put(
            `https://insta-clone-backend-rust.vercel.app/api/v1/user/${user.user_name}/unfollow`,
            {},
            {
              headers: { Authorization: "Bearer " + userAuth?.token },
            }
          )
          .then(() => {
            setFollowed(false);
          });
      } else {
        await axios
          .put(
            `https://insta-clone-backend-rust.vercel.app/api/v1/user/${user.user_name}/follow`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userAuth?.token,
              },
            }
          )
          .then(() => {
            setFollowed(true);
          });
      }
    } catch (e) {}
  };
  return (
    <Link
      href={`/${user.user_name}`}
      className="suggestion-board__main__suggest-item"
    >
      <div className="suggestion-board__main__suggest-item__avatar">
        <Avatar src={user.profile_picture} />
      </div>
      <div className="suggestion-board__main__suggest-item__description">
        <p className="suggestion-board__main__suggest-item__description__user-name">
          {user.user_name}
        </p>
      </div>
      <button
        className="suggestion-board__main__suggest-item__follow"
        onClick={handleFollow}
      >
        {Followed ? "Followed" : "Follow"}
      </button>
    </Link>
  );
}

export default SuggestItem;
