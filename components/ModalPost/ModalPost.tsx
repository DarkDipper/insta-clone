import { FormEvent, RefObject, useState, MouseEvent } from "react";
import Avatar from "../Avatar";
import ImageSlider from "../ImageSlider";
import Comment from "../Comment";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { SlEmotsmile } from "react-icons/sl";
import EmojiPicker, { EmojiObject } from "../EmojiPicker";
type Props = {
  SlideImage: {
    path: string;
    width: number;
    height: number;
    blurHash?: string;
  }[];
  modalPostRef: RefObject<HTMLDivElement>;
  desc: string;
  avatar: string;
  userName: string;
};
const dummy_text =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eius officiis iure voluptas deserunt deleniti! Provident distinctio nostrum quae magnam?";
function ModalPost({
  SlideImage,
  modalPostRef,
  desc,
  avatar,
  userName,
}: Props) {
  const [Liked, setLiked] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.currentTarget.elements.namedItem(
      "comment"
    ) as HTMLInputElement;
    console.log(inputElement.value);
    inputElement.value = "";
    console.log("You post a comment");
  };
  const handleLiked = (e: MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
  };
  const handleInsertEmoji = ({ native }: EmojiObject) => {
    setNewComment((prev) => prev + native);
  };
  return (
    <div className="modal-post" ref={modalPostRef}>
      <div className="modal-post__left">
        <ImageSlider listImages={SlideImage} size={636} />
      </div>
      <div className="modal-post__right">
        <header className="modal-post__right__header">
          <div className="modal-post__right__header__avatar">
            <Avatar src={avatar} />
          </div>
          <p className="modal-post__right__header__user-name">{userName}</p>
        </header>
        <main className="modal-post__right__main">
          <Comment userName={userName} avatar={avatar} content={desc} />
          <Comment
            userName="vietnammoi"
            avatar="https://i.imgur.com/uITbeDy.png"
            content={dummy_text}
          />
          <Comment
            userName="vietnammoi"
            avatar="https://i.imgur.com/uITbeDy.png"
            content={dummy_text}
          />
          <Comment
            userName="vietnammoi"
            avatar="https://i.imgur.com/uITbeDy.png"
            content={dummy_text}
          />
          <Comment
            userName="vietnammoi"
            avatar="https://i.imgur.com/uITbeDy.png"
            content={dummy_text}
          />
        </main>
        <footer className="modal-post__right__footer">
          <div className="modal-post__right__footer__btns">
            <button
              className={`modal-post__right__footer__btns__like-btn ${
                Liked && "liked"
              }`}
              onClick={handleLiked}
            >
              {!Liked ? <FiHeart size={24} /> : <FaHeart size={24} />}
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
          <div className="modal-post__right__footer__likes">1,270 likes</div>
          <div className="modal-post__right__footer__time">7 hours ago</div>
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
                value={newComment}
                className="modal-post__right__footer__comment__form__input-comment"
                autoComplete="off"
                onChange={(e) => {
                  e.preventDefault();
                  setNewComment(e.target.value);
                }}
              />
              <button
                type="submit"
                className="modal-post__right__footer__comment__form__post-comment-btn"
                disabled={false}
              >
                Post
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ModalPost;
