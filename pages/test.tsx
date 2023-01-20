import { useState } from "react";
import EmojiPicker, {
  Theme,
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";
import CustomImage from "../components/CustomImage";
export default function Test() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "470px",
          height: "470px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomImage src="https://i.ibb.co/nkYrxTW/loginpage3.png" />
      </div>
    </main>
  );
}
