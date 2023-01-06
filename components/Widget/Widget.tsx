import Avatar from "../Avatar";

function Widget() {
  const suggestItem = (
    <div className="suggestion-board__main__suggest-item">
      <div className="suggestion-board__main__suggest-item__avatar">
        <Avatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          width={32}
          height={32}
        />
      </div>
      <div className="suggestion-board__main__suggest-item__description">
        <p className="suggestion-board__main__suggest-item__description__user-name">
          theuselessboy
        </p>
      </div>
      <button className="suggestion-board__main__suggest-item__follow">
        Follow
      </button>
    </div>
  );
  const listSuggest = [];
  for (let i = 0; i <= 5; i++) {
    listSuggest.push(suggestItem);
  }
  return (
    <div className="widget">
      <div className="main-account">
        <div className="main-account__avatar">
          <Avatar
            src="https://i.ibb.co/YXL10VM/animelody.png"
            width={56}
            height={56}
          />
        </div>
        <div className="main-account__name">
          <p className="main-account__name__user-name">phong_huynh_2022</p>
          <p className="main-account__name__real-name">Phong Huỳnh</p>
        </div>
        <button className="main-account__switch-account">Switch</button>
      </div>
      <div className="suggestion-board">
        <header className="suggestion-board__header">
          <p className="suggestion-board__header__text">Suggestion For You</p>
          <button className="suggestion-board__header__see-all">See All</button>
        </header>
        <main className="suggestion-board__main">{listSuggest}</main>
      </div>
    </div>
  );
}

export default Widget;
