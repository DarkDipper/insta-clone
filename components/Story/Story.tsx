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
  return (
    <>
      <div className="story" ref={elementScroll}>
        <button onClick={() => handleScroll(-400)} className="btn-scroll-left">
          <AiFillLeftCircle />
        </button>
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <StoryAvatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          userName="Hero Shield fwqfwqfwqffwqfqwfw"
        />
        <button onClick={() => handleScroll(400)} className="btn-scroll-right">
          <AiFillRightCircle />
        </button>
      </div>
    </>
  );
}
