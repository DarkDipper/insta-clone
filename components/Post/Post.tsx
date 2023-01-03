import StoryAvatar from "../StoryAvatar";
import { FiMoreHorizontal } from "react-icons/fi";
export default function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          haveSeenBefore={false}
        />
        <div className="post__header__text">
          <p className="post__header__text__user-name">Username</p>
          <p className="post__header__text__sub-title">Sub title</p>
        </div>
        <div className="post__header__more">
          <FiMoreHorizontal />
        </div>
      </div>
    </div>
  );
}
