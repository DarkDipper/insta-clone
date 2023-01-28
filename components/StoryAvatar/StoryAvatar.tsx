import Avatar from "../Avatar";

type Props = {
  src: string;
  haveSeenBefore: boolean;
};

export default function StoryAvatar({ src, haveSeenBefore }: Props) {
  return (
    <div className="story-avatar">
      <div
        className={`story-avatar${
          !haveSeenBefore ? "--gradient-border" : "--gray-border"
        }`}
      >
        <div className="story-avatar--white-border">
          <Avatar src={src} />
        </div>
      </div>
    </div>
  );
}
