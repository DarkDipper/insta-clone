import ImageSlider from "../components/ImageSlider";
const SlideImage = [
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
];
export default function Test() {
  return (
    <main style={{ height: "100vh", width: "100vw", background: "black" }}>
      <div
        className="test"
        style={{
          height: "470px",
          width: "470px",
          overflow: "hidden",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <ImageSlider listImages={SlideImage} />
      </div>
    </main>
  );
}
