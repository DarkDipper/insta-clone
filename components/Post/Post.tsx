import Image from "next/image";
import StoryAvatar from "../StoryAvatar";
import { FiMoreHorizontal } from "react-icons/fi";
export default function Post() {
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
      <div className="post__content">
        <Image
          src="https://i.ibb.co/c1YQvN6/defaultpost.jpg"
          alt="content"
          fill
        />
      </div>
    </div>
  );
}
