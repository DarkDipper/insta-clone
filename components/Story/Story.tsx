import Avatar from "../Avatar";

export default function Story() {
  const temp_list = [];
  for (let i = 0; i <= 10; i++) {
    temp_list.push(
      <div
        key={i}
        style={{
          position: "absolute",
          transform: `translateX(${16 + 78 * i}px)`,
        }}
      >
        <Avatar
          src="https://i.ibb.co/YXL10VM/animelody.png"
          height={56}
          width={56}
        />
      </div>
    );
  }
  return <div className="story">{temp_list}</div>;
}
