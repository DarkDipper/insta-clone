import EditProfileModal from "@yourapp/components/EditProfileModal";
import { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
export default function Test() {
  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
  );
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<Cropper>();
  const imageRef = useRef<HTMLImageElement>(null);
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      // console.log(cropper.getCroppedCanvas().toDataURL());
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
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
        position: "relative",
      }}
    >
      <div style={{ zIndex: "9999", position: "absolute", bottom: 0 }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Cropper
          style={{ width: "520px", height: "520px" }}
          initialAspectRatio={0}
          // preview=".img-preview"
          src={image}
          ref={imageRef}
          viewMode={1}
          dragMode={"move"}
          guides={false}
          toggleDragModeOnDblclick={false}
          movable={true}
          cropBoxResizable={false}
          cropBoxMovable={false}
          // minCropBoxHeight={10}
          aspectRatio={1}
          // minCropBoxWidth={10}
          autoCropArea={1}
          background={false}
          responsive={true}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      {/* <div>
          <div className="box" style={{ width: "50%", float: "right" }}>
            <h1>Preview</h1>
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div>
          <div
            className="box"
            style={{ width: "50%", float: "right", height: "300px" }}
          >
            <h1>
              <span>Crop</span>
              <button style={{ float: "right" }} onClick={getCropData}>
                Crop Image
              </button>
            </h1>
            <img
              style={{ width: "100%", borderRadius: "50%" }}
              src={cropData}
              alt="cropped"
            />
          </div>
        </div> */}
      <br style={{ clear: "both" }} />
    </main>
  );
}
