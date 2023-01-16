import Avatar from "../Avatar";

function Comment() {
  return (
    <div className="comment-container">
      <div className="comment-container__user">
        <Avatar height={32} width={32} />
        <p className="comment-container__user__name">vietnamoi</p>
      </div>
      <div className="comment-container__content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eius
        officiis iure voluptas deserunt deleniti! Provident distinctio nostrum
        quae magnam?
      </div>
      <div className="comment-container__footer">
        <div className="comment-container__footer__time">1h</div>
      </div>
    </div>
  );
}

export default Comment;
