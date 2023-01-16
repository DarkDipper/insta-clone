import { useState } from "react";
import EmojiPicker, {
  Theme,
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";
import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function Test() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
  }
  return (
    <main style={{ height: "100vh", width: "100vw", background: "gray" }}>
      <Picker
        onEmojiClick={onClick}
        emojiStyle={EmojiStyle.FACEBOOK}
        theme={Theme.DARK}
      />
      <h1>
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </h1>
      {/* <EmojiPicker
        onEmojiClick={onClick}
        emojiStyle={EmojiStyle.FACEBOOK}
        theme={Theme.DARK}
      /> */}
    </main>
  );
}
