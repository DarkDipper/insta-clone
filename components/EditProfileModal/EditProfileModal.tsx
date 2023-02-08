import {
  useRef,
  useState,
  MouseEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { RxAvatar } from "react-icons/rx";
import { IoIosTrash } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import Router from "next/router";
import Loading from "../Loading";
import useAuth from "@yourapp/hooks/useAuth";
type Props = {
  userInfo: {
    _id: string;
    email: string;
    user_name: string;
    role: string;
    profile_picture: string;
    followers: any[];
    following: any[];
    gender: string;
  };
  showModal: Dispatch<SetStateAction<boolean>>;
};
function EditProfileModal({ userInfo, showModal }: Props) {
  const { auth, user } = useAuth();
  const [stateLoading, setStateLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(undefined);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  // const [passWord, setPassword] = useState<string>("");
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
    setStateLoading(true);
    await axios
      .put(
        `https://insta-clone-backend-dipper.onrender.com/api/v1/user/${userInfo._id}`,
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
      )
      .then((res) => {
        Router.replace(`/${userName}`);
        auth.user = {
          _id: res.data["user"]._id,
          token: res.data["user"].token,
          userName: res.data["user"].userName,
          avatar: res.data["user"].avatar,
          theme: user?.theme!,
        };
        auth.onUserChange();
        showModal(false);
      })
      .catch((error) => {
        // console.log(error.response?.data);
        if (error.response?.data) {
          setError(error.response?.data.message);
        }
        setStateLoading(false);
      });
  };
  useEffect(() => {
    setUserName(userInfo.user_name);
    setEmail(userInfo.email);
    // console.log(userInfo.gender);
    if (userInfo.gender) {
      setGender(userInfo.gender);
    } else {
      setGender("male");
    }
  }, [userInfo.email, userInfo.gender, userInfo.user_name]);
  return (
    <div className="edit-profile-modal">
      {!stateLoading ? (
        <>
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
                    checkOrientation={false}
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
                    defaultValue={userInfo.gender}
                    onChange={(e) => {
                      e.preventDefault();
                      // console.log(e.target.value);
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
              <div className="error-msg">{error}</div>
              <button
                type="submit"
                className="save-profile-btn"
                onClick={handleUpdate}
              >
                Save change
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: "50%",
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}

export default EditProfileModal;
