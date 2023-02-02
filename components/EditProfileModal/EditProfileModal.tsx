import { useRef, useState } from "react";
import Avatar from "../Avatar";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
function EditProfileModal() {
  const [image, setImage] = useState("https://i.imgur.com/IJLis5s.jpg");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<Cropper>();
  const imageRef = useRef<HTMLImageElement>(null);
  const upLoadFile = (e: any) => {
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
  return (
    <div className="edit-profile-modal">
      <h1 className="edit-profile-modal__header">Edit profile</h1>
      <div className="edit-profile-modal__main">
        <div className="edit-profile-modal__main__left">
          <Cropper
            style={{ width: "100%", height: "100%" }}
            initialAspectRatio={1}
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
            autoCropArea={1}
            // minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </div>
        <div className="edit-profile-modal__main__right">
          {/* 
            Avatar
            username
            gender
            email
            password
            pawssword again
          */}
          <label htmlFor="user-name">User Name</label>
          <input id="user-name" type="text" />
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="cars">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknow">Unknow</option>
          </select>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
          <label htmlFor="pass-word-1">New password</label>
          <input id="pass-word-1" type="password" />
          <label htmlFor="pass-word-2">New password (one more time)</label>
          <input id="pass-word-2" type="password" />
          <input type="file" onChange={upLoadFile} />
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
