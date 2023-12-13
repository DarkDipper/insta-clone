import { FormEvent, MouseEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import ModalPost from "../ModalPost";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import useComponentVisible from "@yourapp/hooks/useComponentVisible";
import Image from "next/image";
import { Blurhash } from "react-blurhash";
import useAuth from "@yourapp/hooks/useAuth";
import axios from "@yourapp/utils/axios";
function MiniPost({ post }: Props) {
  const { user } = useAuth();
  const [Loaded, setLoaded] = useState(false);
  const [Hover, setHover] = useState(false);
  const {
    ref: modalPostRef,
    isComponentVisible: modalPostVisible,
    setIsComponentVisible: setModalPostVisible,
  } = useComponentVisible(false);
  const handleModalPost = (e: MouseEvent) => {
    e.preventDefault();
    setModalPostVisible(true);
  };
  const [Liked, setLiked] = useState<boolean>(() => {
    return post["likes"].includes(user?._id || "");
  });
  const [numLike, setNumLike] = useState<number>(post["likes"].length);
  const [newComment, setNewComment] = useState<string>("");
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios
      .post(
        `/comment/`,
        {
          postId: post._id,
          description: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user?.token,
          },
        }
      )
      .then((res) => res.data);
    setNewComment("");
    post.comment.push(res["commentId"]);
    console.log("You post a comment");
  };
  const handleLiked = async (e: MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    if (Liked) {
      setNumLike((prev) => prev - 1);
    } else {
      setNumLike((prev) => prev + 1);
    }
    await axios.get(`/post/${post._id}/like`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.token,
      },
    });
  };
  useEffect(() => {
    if (modalPostVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [modalPostVisible]);
  return (
    <>
      {modalPostVisible && (
        <Modal handleClose={setModalPostVisible}>
          <ModalPost
            modalPostRef={modalPostRef}
            post={{
              list_image: post.list_image,
              user: {
                user_name: post.user.user_name,
                profile_picture: post.user.profile_picture,
              },
              _id: post._id,
              likes: post.likes,
              description: post.description,
              comment: post.comment,
              createdAt: post.createdAt,
            }}
            Liked={{
              numLike: numLike,
              check: Liked,
              handleLiked: handleLiked,
            }}
            NewComment={{
              textComment: newComment,
              setNewComment: setNewComment,
              handleComment: handleCommentSubmit,
            }}
          />
        </Modal>
      )}
      <div
        className="mini-post"
        onClick={handleModalPost}
        onMouseEnter={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setHover(false);
        }}
      >
        {
          <Blurhash
            hash={post.list_image[0].blurHash}
            style={{
              transition: "opacity ease-in-out 0.3s",
              opacity: !Loaded ? 1 : 0,
              zIndex: "1",
            }}
            width={"100%"}
            height={"100%"}
          />
        }
        <div
          className="hover"
          style={{
            opacity: Hover ? 0.6 : 0,
          }}
        >
          <div className="liked">
            <span>{numLike}</span> <AiFillHeart />
          </div>
          <div className="comments">
            <span>{post.comment.length}</span> <TbMessageCircle2 />
          </div>
        </div>
        <Image
          src={post.list_image[0].path}
          sizes="100%"
          fill
          draggable={false}
          alt=""
          onLoadingComplete={() => {
            post.list_image[0].blurHash && setLoaded(true);
          }}
        />
      </div>
    </>
  );
}

export default MiniPost;
type Props = {
  post: {
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
  };
};
