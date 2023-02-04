import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Avatar from "../Avatar";

function Widget() {
  const SuggestItem = () => (
    <div className="suggestion-board__main__suggest-item">
      <div className="suggestion-board__main__suggest-item__avatar">
        <Avatar src="https://i.ibb.co/YXL10VM/animelody.png" />
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
  for (let i = 0; i <= 4; i++) {
    listSuggest.push(<SuggestItem key={i} />);
  }
  return (
    <div className="widget">
      {/* <div className="main-account">
        <div className="main-account__avatar">
          <Avatar src="https://i.ibb.co/YXL10VM/animelody.png" />
        </div>
        <div className="main-account__name">
          <p className="main-account__name__user-name">phong_huynh_2022</p>
          <p className="main-account__name__real-name">Phong Huỳnh</p>
        </div>
        <button className="main-account__switch-account">Switch</button>
      </div> */}
      <div className="suggestion-board">
        <header className="suggestion-board__header">
          <p className="suggestion-board__header__text">Suggestion For You</p>
          {/* <button className="suggestion-board__header__see-all">See All</button> */}
        </header>
        <main className="suggestion-board__main">{listSuggest}</main>
      </div>
      <div className="copy-right">
        <div className="copy-right__socials-icon">
          <BsGithub size={20} />
          <BsLinkedin size={20} />
          <BsFacebook size={20} />
        </div>
        <p className="copy-right__text">&#169; 2023 Insta clone from Dipper</p>
      </div>
    </div>
  );
}

export default Widget;
