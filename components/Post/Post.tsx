import { MouseEvent, FormEvent, useState, useEffect } from "react";
import StoryAvatar from "../StoryAvatar";
import ImageSlider from "../ImageSlider";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { SlEmotsmile } from "react-icons/sl";
import useComponentVisible from "../../hooks/useComponentVisible";
import ModalPost from "../ModalPost";
import Modal from "../Modal";
import EmojiPicker, { EmojiObject } from "../EmojiPicker";
import Link from "next/link";
import axios from "axios";
import useAuth from "@yourapp/hooks/useAuth";
import { format } from "timeago.js";
type Props = {
  post: {
    list_image: {
      path: string;
      width: number;
      height: number;
      blurHash?: string;
    }[];
    user: {
      user_name: string;
      profile_picture: string;
    };
    _id: string;
    description: string;
    likes: string[];
    comment: string[];
    createdAt: string;
  };
};

export default function Post({ post }: Props) {
  const { user } = useAuth();
  const [More, setMore] = useState<boolean>(false);
  const [Liked, setLiked] = useState<boolean>(() => {
    return post["likes"].includes(user?._id || "");
  });
  const [numLike, setNumLike] = useState<number>(post["likes"].length);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const {
    ref: modalPostRef,
    isComponentVisible: modalPostVisible,
    setIsComponentVisible: setModalPostVisible,
  } = useComponentVisible(false);
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios
      .post(
        `https://insta-clone-backend-dipper.onrender.com/api/v1/comment/`,
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
  const handleMore = (e: MouseEvent) => {
    e.preventDefault();
    setMore(true);
  };
  const handleModalPost = (e: MouseEvent) => {
    e.preventDefault();
    setModalPostVisible(true);
  };
  const handleLiked = async (e: MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    if (Liked) {
      setNumLike((prev) => prev - 1);
    } else {
      setNumLike((prev) => prev + 1);
    }
    await axios.get(
      `https://insta-clone-backend-dipper.onrender.com/api/v1/post/${post._id}/like`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.token,
        },
      }
    );
  };
  const handleInsertEmoji = ({ native }: EmojiObject) => {
    setNewComment((prev) => prev + native);
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
            post={post}
            Liked={{ numLike: numLike, check: Liked, handleLiked: handleLiked }}
            NewComment={{
              textComment: newComment,
              setNewComment: setNewComment,
              handleComment: handleCommentSubmit,
            }}
          />
        </Modal>
      )}
      <div className="post">
        <header className="post__header">
          <Link
            href={`/${post.user.user_name}`}
            className="post__header__wrapper"
          >
            <div className="post__header__avatar">
              <StoryAvatar
                src={post.user.profile_picture}
                haveSeenBefore={true}
              />
            </div>
            <div className="post__header__text">
              <p className="post__header__text__user-name">
                {post.user.user_name}
              </p>
              {/* <p className="post__header__text__sub-title">Sub title</p> */}
            </div>
          </Link>
          {/* <button className="post__header__more-btn">
            <FiMoreHorizontal
              width={40}
              height={40}
              className="post__header__more-btn__svg"
            />
          </button> */}
        </header>
        <main className="post__content">
          <ImageSlider
            handleModal={handleModalPost}
            listImages={post.list_image}
            size={470}
          />
        </main>
        <footer className="post__footer">
          <div className="post__footer__btns">
            <button
              className={`post__footer__btns__like-btn ${Liked && "liked"}`}
              onClick={handleLiked}
            >
              {!Liked ? <FiHeart size={24} /> : <FaHeart size={24} />}
            </button>
            <button
              className="post__footer__btns__comment-btn"
              onClick={handleModalPost}
            >
              <FaRegComment size={24} />
            </button>
            {/* <button className="post__footer__btns__share-btn">
              <IoPaperPlane size={24} />
            </button>
            <button className="post__footer__btns__save-btn">
              <BiBookmark size={24} />
            </button> */}
          </div>
          <div className="post__footer__likes">{numLike} likes</div>
          <div className="post__footer__paragraph">
            {/* <span className="post__footer__paragraph__user-name">
              {post.user.user_name}
            </span> */}
            <span
              // style={{ whiteSpace: "pre-line" }}
              className={`post__footer__paragraph__content${
                More || post.description.length < 30 ? "--show" : ""
              }`}
            >
              {post.description}
            </span>
          </div>
          {!More && post.description.length > 30 && (
            <div onClick={handleMore} className="post__footer__view-more">
              more
            </div>
          )}
          {post.comment.length !== 0 && (
            <div
              className="post__footer__view-comments"
              onClick={handleModalPost}
            >
              View all {post.comment.length} comments
            </div>
          )}
          <div className="post__footer__time">{format(post.createdAt)}</div>
          <div className="post__footer__comment">
            {showPicker && (
              <div className="post__footer__comment__emoji-picker">
                <EmojiPicker
                  onEmojiSelectd={handleInsertEmoji}
                  handleClose={setShowPicker}
                />
              </div>
            )}
            <button
              className="post__footer__comment__emoji-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowPicker(true);
              }}
            >
              <SlEmotsmile size={24} />
            </button>
            <form
              onSubmit={handleCommentSubmit}
              className="post__footer__comment__form"
            >
              <input
                name="comment"
                value={newComment}
                onChange={(e) => {
                  e.preventDefault();
                  setNewComment(e.target.value);
                }}
                placeholder="Add a comment..."
                className="post__footer__comment__form__input-comment"
                autoComplete="off"
              />
              {newComment.length !== 0 && (
                <button
                  type="submit"
                  className="post__footer__comment__form__post-comment-btn"
                  disabled={false}
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </footer>
      </div>
    </>
  );
}
