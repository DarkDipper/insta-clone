import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState, Dispatch, SetStateAction } from "react";
export type EmojiObject = {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
};
type Props = {
  onEmojiSelectd: (arg0: EmojiObject) => void;
  handleClose: Dispatch<SetStateAction<boolean>>;
};
function EmojiPicker({ onEmojiSelectd, handleClose }: Props) {
  const [firstAppeard, setFirstAppeard] = useState<boolean>(true);
  return (
    <Picker
      data={data}
      onEmojiSelect={onEmojiSelectd}
      onClickOutside={() => {
        console.log("You click out side");
        if (!firstAppeard) {
          handleClose(false);
        } else {
          setFirstAppeard(false);
        }
      }}
      theme="dark"
      navPosition="bottom"
      previewPosition="none"
      skinTonePosition="none"
    />
  );
}

export default EmojiPicker;
