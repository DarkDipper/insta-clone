import {
  FormEvent,
  RefObject,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import Avatar from "../Avatar";
import ImageSlider from "../ImageSlider";
import Comment from "../Comment";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { SlEmotsmile } from "react-icons/sl";
import EmojiPicker, { EmojiObject } from "../EmojiPicker";
import useFetchComments from "@yourapp/hooks/useFetchComments";
import { format } from "timeago.js";
import useAuth from "@yourapp/hooks/useAuth";
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
  modalPostRef: RefObject<HTMLDivElement>;
  Liked: {
    numLike: number;
    check: boolean;
    handleLiked: (e: MouseEvent) => void;
  };
  NewComment: {
    textComment: string;
    setNewComment: Dispatch<SetStateAction<string>>;
    handleComment: (e: FormEvent<HTMLFormElement>) => void;
  };
};
const dummy_text =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eius officiis iure voluptas deserunt deleniti! Provident distinctio nostrum quae magnam?";
function ModalPost({ modalPostRef, post, Liked, NewComment }: Props) {
  const { user } = useAuth();
  const listComment = useFetchComments(post._id);
  const [listTempComment, setListTempComment] = useState<
    {
      userName: string;
      avatar: string;
      content: string;
      createdAt: string;
    }[]
  >([]);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const viewRef = useRef<HTMLDivElement>(null);
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await NewComment.handleComment(e);
    setListTempComment((prev) => {
      const tempComment = {
        userName: user?.userName!,
        avatar: user?.avatar!,
        content: NewComment.textComment!,
        createdAt: "",
      };
      return [...prev, tempComment];
    });
  };
  const handleInsertEmoji = ({ native }: EmojiObject) => {
    NewComment.setNewComment((prev) => prev + native);
  };
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [listTempComment]);
  return (
    <div className="modal-post" ref={modalPostRef}>
      <div className="modal-post__left">
        <ImageSlider listImages={post.list_image} size={636} />
      </div>
      <div className="modal-post__right">
        <header className="modal-post__right__header">
          <div className="modal-post__right__header__avatar">
            <Avatar src={post.user.profile_picture} />
          </div>
          <p className="modal-post__right__header__user-name">
            {post.user.user_name}
          </p>
        </header>
        <main className="modal-post__right__main">
          {post.description.length !== 0 && (
            <Comment
              userName={post.user.user_name}
              avatar={post.user.profile_picture}
              content={post.description}
              createdAt={post.createdAt}
            />
          )}
          {/* <Comment
            userName="vietnammoi"
            avatar="https://i.imgur.com/uITbeDy.png"
            content={dummy_text}
            createdAt="2023-02-04T14:45:25.019+00:00"
          /> */}
          {listComment.map((c) => {
            return (
              <Comment
                key={c["_id"]}
                userName={c["user"]["user_name"]}
                avatar={c["user"]["profile_picture"]}
                content={c["description"]}
                createdAt={c["createdAt"]}
              />
            );
          })}
          {listTempComment.map((c) => {
            return (
              <Comment
                userName={c.userName}
                avatar={c.avatar}
                content={c.content}
                createdAt={c.createdAt}
              />
            );
          })}
          <div ref={viewRef} />
        </main>
        <footer className="modal-post__right__footer">
          <div className="modal-post__right__footer__btns">
            <button
              className={`modal-post__right__footer__btns__like-btn ${
                Liked.check && "liked"
              }`}
              onClick={Liked.handleLiked}
            >
              {!Liked.check ? <FiHeart size={24} /> : <FaHeart size={24} />}
            </button>
            <button className="modal-post__right__footer__btns__comment-btn">
              <FaRegComment size={24} />
            </button>
            <button className="modal-post__right__footer__btns__share-btn">
              <IoPaperPlane size={24} />
            </button>
            <button className="modal-post__right__footer__btns__save-btn">
              <BiBookmark size={24} />
            </button>
          </div>
          <div className="modal-post__right__footer__likes">
            {Liked.numLike} likes
          </div>
          <div className="modal-post__right__footer__time">
            {format(post.createdAt)}
          </div>
          <div className="modal-post__right__footer__comment">
            {showPicker && (
              <div className="modal-post__right__footer__comment__emoji-picker">
                <EmojiPicker
                  onEmojiSelectd={handleInsertEmoji}
                  handleClose={setShowPicker}
                />
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPicker(true);
              }}
              className="modal-post__right__footer__comment__emoji-btn"
            >
              <SlEmotsmile size={24} />
            </button>
            <form
              onSubmit={handleCommentSubmit}
              className="modal-post__right__footer__comment__form"
            >
              <input
                name="comment"
                type="text"
                value={NewComment.textComment}
                placeholder="Add a comment..."
                className="modal-post__right__footer__comment__form__input-comment"
                autoComplete="off"
                onChange={(e) => {
                  e.preventDefault();
                  NewComment.setNewComment(e.target.value);
                }}
              />
              {NewComment.textComment.length !== 0 && (
                <button
                  type="submit"
                  className="modal-post__right__footer__comment__form__post-comment-btn"
                  disabled={false}
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ModalPost;
