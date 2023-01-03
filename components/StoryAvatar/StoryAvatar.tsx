import Avatar from "../Avatar";

type Props = {
  src: string;
  userName: string;
  haveSeenBefore: boolean;
  width?: number;
  height?: number;
};

export default function StoryAvatar({
  src,
  userName,
  haveSeenBefore,
  width = 56,
  height = 56,
}: Props) {
  return (
    <div className="story-avatar">
      <div className="story-avatar__wrapper">
        <div className="story-avatar__avatar">
          <div
            className={`story-avatar__avatar${
              !haveSeenBefore ? "--gradient-border" : "--gray-border"
            }`}
          >
            <div className="story-avatar__avatar--white-border">
              <Avatar src={src} height={height} width={width} />
            </div>
          </div>
        </div>
        <p className="story-avatar--user-name">{userName}</p>
      </div>
    </div>
  );
}
