import Avatar from "../Avatar";
import { format } from "timeago.js";
type Props = {
  content: string;
  avatar: string;
  userName: string;
  createdAt: string;
};
function Comment({ content, avatar, userName, createdAt }: Props) {
  return (
    <div className="comment-container">
      <div className="comment-container__user">
        <div className="comment-container__user__avatar">
          <Avatar src={avatar} />
        </div>
        <p className="comment-container__user__name">{userName}</p>
      </div>
      <div className="comment-container__content">{content}</div>
      <div className="comment-container__footer">
        <div className="comment-container__footer__time">
          {format(createdAt)}
        </div>
      </div>
    </div>
  );
}

export default Comment;
