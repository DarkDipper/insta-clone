import Image from "next/image";
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
type Props = {
  listImage: string[];
  desc: string;
};
export default function Post({ listImage, desc }: Props) {
  const [More, setMore] = useState(false);
  const [Liked, setLiked] = useState(false);
  const {
    ref: modalPostRef,
    isComponentVisible: modalPostVisible,
    setIsComponentVisible: setModalPostVisible,
  } = useComponentVisible(false);
  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.currentTarget.elements.namedItem(
      "comment"
    ) as HTMLInputElement;
    console.log(inputElement.value);
    inputElement.value = "";
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
  const handleLiked = (e: MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
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
          <ModalPost SlideImage={listImage} modalPostRef={modalPostRef} />
        </Modal>
      )}
      <div className="post">
        <header className="post__header">
          <div className="post__header__avatar">
            <StoryAvatar
              src="https://i.ibb.co/YXL10VM/animelody.png"
              haveSeenBefore={true}
              height={32}
              width={32}
            />
          </div>
          <div className="post__header__text">
            <p className="post__header__text__user-name">Username</p>
            <p className="post__header__text__sub-title">Sub title</p>
          </div>
          <button className="post__header__more-btn">
            <FiMoreHorizontal
              width={40}
              height={40}
              className="post__header__more-btn__svg"
            />
          </button>
        </header>
        <main className="post__content">
          <ImageSlider
            handleModal={handleModalPost}
            listImages={listImage}
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
            <button className="post__footer__btns__share-btn">
              <IoPaperPlane size={24} />
            </button>
            <button className="post__footer__btns__save-btn">
              <BiBookmark size={24} />
            </button>
          </div>
          <div className="post__footer__likes">1,270 likes</div>
          <div className="post__footer__paragraph">
            <span className="post__footer__paragraph__user-name">
              userName{" "}
            </span>
            <span
              className={`post__footer__paragraph__content${
                More || desc.length < 100 ? "--show" : ""
              }`}
            >
              {desc}
            </span>
          </div>
          {!More && desc.length > 100 && (
            <div onClick={handleMore} className="post__footer__view-more">
              more
            </div>
          )}
          <div
            className="post__footer__view-comments"
            onClick={handleModalPost}
          >
            View all 14 comments
          </div>
          <div className="post__footer__time">1 DAY AGO</div>
          <div className="post__footer__comment">
            <button className="post__footer__comment__emoji-btn">
              <SlEmotsmile size={24} />
            </button>
            <form
              onSubmit={handleCommentSubmit}
              className="post__footer__comment__form"
            >
              <input
                name="comment"
                type="text"
                className="post__footer__comment__form__input-comment"
                autoComplete="off"
              />
              <button
                type="submit"
                className="post__footer__comment__form__post-comment-btn"
                disabled={false}
              >
                Post
              </button>
            </form>
          </div>
        </footer>
      </div>
    </>
  );
}
