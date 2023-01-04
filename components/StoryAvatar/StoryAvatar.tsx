import Avatar from "../Avatar";

type Props = {
  src: string;
  haveSeenBefore: boolean;
  width?: number;
  height?: number;
};

export default function StoryAvatar({
  src,
  haveSeenBefore,
  width = 56,
  height = 56,
}: Props) {
  return (
    <div className="story-avatar">
      <div
        className={`story-avatar${
          !haveSeenBefore ? "--gradient-border" : "--gray-border"
        }`}
      >
        <div className="story-avatar--white-border">
          <Avatar src={src} height={height} width={width} />
        </div>
      </div>
    </div>
  );
}
