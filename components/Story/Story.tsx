import { useRef } from "react";
import StoryAvatar from "../StoryAvatar";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
export default function Story() {
  const elementScroll = useRef<HTMLInputElement>(null);
  const handleScroll = (scrollOffset: number) => {
    if (elementScroll.current !== null) {
      elementScroll.current.scrollLeft += scrollOffset;
    }
  };
  let list_temp = [];
  for (let i = 0; i <= 10; i++) {
    list_temp.push(
      <StoryAvatar
        key={i}
        src="https://i.ibb.co/YXL10VM/animelody.png"
        userName="Hero Shield fwqfwqfwqffwqfqwfw"
        haveSeenBefore={false}
      />
    );
  }
  return (
    <>
      <div className="story" ref={elementScroll}>
        <button onClick={() => handleScroll(-400)} className="btn-scroll-left">
          <AiFillLeftCircle />
        </button>
        {list_temp}
        <button onClick={() => handleScroll(400)} className="btn-scroll-right">
          <AiFillRightCircle />
        </button>
      </div>
    </>
  );
}
