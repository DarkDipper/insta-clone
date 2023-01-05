import Image from "next/image";
import { MouseEvent } from "react";
import StoryAvatar from "../StoryAvatar";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { BiBookmark } from "react-icons/bi";
import { SlEmotsmile } from "react-icons/sl";
export default function Post() {
  const handleCommentSubmit = (e: MouseEvent) => {
    e.preventDefault();
    console.log("YOu post a comment");
  };
  return (
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
        <Image
          src="https://i.ibb.co/c1YQvN6/defaultpost.jpg"
          alt="content"
          fill
        />
      </main>
      <footer className="post__footer">
        <div className="post__footer__btns">
          <button className="post__footer__btns__like-btn">
            <FaHeart size={24} />
          </button>
          <button className="post__footer__btns__comment-btn">
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
          <span className="post__footer__paragraph__user-name">userName </span>{" "}
          <span className="post__footer__paragraph__content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            ad at numquam unde tempora amet veniam voluptate, praesentium cum
            quam ut delectus laudantium nesciunt nihil totam, dignissimos quos
            illo quibusdam eveniet soluta similique. Nesciunt iusto perspiciatis
            nam eum corporis natus?
          </span>
        </div>
        <div className="post__footer__view-comments">View all 14 comments</div>
        <div className="post__footer__time">1 DAY AGO</div>
        <div className="post__footer__comment">
          <button className="post__footer__comment__emoji-btn">
            <SlEmotsmile size={24} />
          </button>
          <input type="text" className="post__footer__comment__input-comment" />
          <button
            type="submit"
            onClick={handleCommentSubmit}
            className="post__footer__comment__post-comment-btn"
            disabled={false}
          >
            Post
          </button>
        </div>
      </footer>
    </div>
  );
}
