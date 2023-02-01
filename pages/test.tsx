import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiPicker, { EmojiObject } from "@yourapp/components/EmojiPicker";
import { SlEmotsmile } from "react-icons/sl";
export default function Test() {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  // const handleEmojiSelected = () => {};
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      {/* {showPicker && <EmojiPicker />}
      <button
        className="post__footer__comment__emoji-btn"
        onClick={(e) => setShowPicker((prev) => !prev)}
      >
        <SlEmotsmile size={24} />
      </button> */}
    </main>
  );
}
