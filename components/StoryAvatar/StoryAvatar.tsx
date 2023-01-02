import Avatar from "../Avatar";

export default function StoryAvatar() {
  return (
    <div className="story-avatar">
      <div className="story-avatar__wrapper">
        <div className="story-avatar__avatar">
          <div className="story-avatar__avatar__gradient-border">
            <div className="story-avatar__avatar__white-border">
              <Avatar
                src="https://i.ibb.co/YXL10VM/animelody.png"
                height={56}
                width={56}
              />
            </div>
          </div>
        </div>
        <p className="story-avatar--user-name">
          Hero Shield fwqfwqfwqffwqfqwfw
        </p>
      </div>
    </div>
  );
}
