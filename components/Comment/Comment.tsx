import Avatar from "../Avatar";

type Props = {
  content: string;
  avatar: string;
  userName: string;
};
function Comment({ content, avatar, userName }: Props) {
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
        <div className="comment-container__footer__time">1h</div>
      </div>
    </div>
  );
}

export default Comment;
