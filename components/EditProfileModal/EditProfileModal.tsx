import { useRef, useState, MouseEvent, useEffect } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { RxAvatar } from "react-icons/rx";
import { IoIosTrash } from "react-icons/io";
import axios from "axios";
import { getCookie } from "cookies-next";
type Props = {
  userInfo?: {
    _id: string;
    email: string;
    user_name: string;
    role: string;
    profile_picture: string;
    followers: any[];
    following: any[];
    gender: string;
  };
};
function EditProfileModal({ userInfo }: Props) {
  const [avatar, setAvatar] = useState(undefined);
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<string>();
  // const [passWord, setPassword] = useState<string>("");
  // const [cropData, setCropData] = useState("#");
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
      setAvatar(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    // console.log("OK");
  };
  const handleUpdate = async (e: MouseEvent) => {
    e.preventDefault();
    let avatarBase64: string = "";
    if (cropper) {
      avatarBase64 = cropper.getCroppedCanvas().toDataURL().split(",")[1];
      // console.log(avatarBase64);
    }
    await axios.put(
      `http://localhost:5000/api/v1/user/${userInfo && userInfo._id}`,
      {
        avatar: avatarBase64,
        user_name: userName,
        gender: gender,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("6gR265$m_t0k3n"),
        },
      }
    );
  };
  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.user_name);
      setEmail(userInfo.email);
      setGender(userInfo.gender ? userInfo.gender : "male");
    }
  });
  return (
    <div className="edit-profile-modal">
      <h1 className="edit-profile-modal__header">Edit profile</h1>
      <div className="edit-profile-modal__main">
        <div className="edit-profile-modal__main__left">
          {!avatar ? (
            <div
              className="edit-profile-modal__main__left__upload-image"
              onDrop={upLoadFile}
              onDragOver={(e) => e.preventDefault()}
            >
              <RxAvatar size={200} />
              <h3>Drag photos to change avatar</h3>
            </div>
          ) : (
            <>
              <Cropper
                style={{ width: "100%", height: "100%" }}
                initialAspectRatio={1}
                src={avatar}
                ref={imageRef}
                viewMode={1}
                dragMode={"move"}
                guides={false}
                toggleDragModeOnDblclick={false}
                movable={true}
                cropBoxResizable={false}
                cropBoxMovable={false}
                aspectRatio={1}
                autoCropArea={1}
                background={false}
                responsive={true}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              <button
                className="edit-profile-modal__main__left__delete-avatar-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAvatar(undefined);
                }}
              >
                <IoIosTrash size={30} />
              </button>
            </>
          )}
        </div>
        <div className="edit-profile-modal__main__right">
          <div className="edit-profile-modal__main__right__user-name">
            <label htmlFor="user-name">User Name</label>
            <input
              value={userName}
              onChange={(e) => {
                e.preventDefault();
                setUserName(e.target.value);
              }}
              id="user-name"
              type="text"
            />
          </div>
          <div className="edit-profile-modal__main__right__email">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
            />
          </div>
          {/* <div className="edit-profile-modal__main__right__pass-word">
            <label htmlFor="pass-word">New password</label>
            <input
              value={passWord}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              id="pass-word"
              type="password"
            />
          </div> */}
          <div className="edit-profile-modal__main__right__gender-avatar">
            <div className="edit-profile-modal__main__right__gender">
              <label htmlFor="gender">Gender</label>
              <select
                defaultValue={gender}
                onChange={(e) => {
                  e.preventDefault();
                  console.log(e.target.value);
                  setGender(e.target.value);
                }}
                name="gender"
                id="gender"
              >
                {/* <option value="unknow">Unknow</option> */}
                <option value="male">Male 👦</option>
                <option value="female">Female 👧</option>
              </select>
            </div>
            <div className="edit-profile-modal__main__right__avatar">
              <label htmlFor="image-avatar">Choose Avatar</label>
              <input id="image-avatar" type="file" onChange={upLoadFile} />
            </div>
          </div>
          <button type="submit" className="save-profile" onClick={handleUpdate}>
            Save change
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
