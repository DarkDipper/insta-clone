import { DragEvent } from "react";
import ImageSlider from "../ImageSlider";
import Avatar from "../Avatar";
import {
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useMutation, useQueryClient } from "react-query";
import { MdPhotoCamera } from "react-icons/md";
import { IoIosAddCircle, IoIosTrash } from "react-icons/io";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loading from "../Loading";
type Props = {
  userName?: string;
  avatar?: string;
  handleClose: Dispatch<SetStateAction<boolean>>;
};
function Share({ handleClose, userName, avatar }: Props) {
  const [listImage, setListImage] = useState<{ path: string }[]>([
    // "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
    // "https://i.ibb.co/nkYrxTW/loginpage3.png",
    // "https://i.ibb.co/YXL10VM/animelody.png",
    // "https://i.ibb.co/G3yfYFN/Monokuma.png",
    // "https://i.ibb.co/Ctx4kbM/avatar.jpg",
  ]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [shareIndex, setShareIndex] = useState<number>(0);
  const [Desc, setDesc] = useState("");
  const [upLoading, setUpLoading] = useState(false);
  const queryClient = useQueryClient();
  const shareRequest = useMutation(
    (formRquest: FormData) => {
      return axios.post(
        "https://insta-clone-backend-dipper.onrender.com/api/v1/post/create",
        formRquest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("6gR265$m_t0k3n"),
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    // console.log(listImage.length);
    for (const file of e.dataTransfer?.files) {
      if (file.type.includes("image")) {
        setSelectedFile((prev) => [...prev, file]);
      }
    }
  };
  const handleShare = async (e: MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of selectedFile) {
      formData.append("listImage", file);
    }
    formData.append("desc", Desc);
    setUpLoading(true);
    await shareRequest.mutateAsync(formData);
    handleClose(false);
  };
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    setListImage([]);
    for (const file of selectedFile) {
      const objectUrl = URL.createObjectURL(file);
      setListImage((prev) => [...prev, { path: objectUrl }]);
    }
    // free memory when ever this component is unmounted
    return () => {
      for (const imgUrl of listImage) {
        URL.revokeObjectURL(imgUrl.path);
      }
    };
  }, [selectedFile]);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "scroll";
    };
  }, []);
  return (
    <div className="share-post">
      {!upLoading ? (
        <>
          <h1 className="share-post__header">Create new post</h1>
          <div className="share-post__main">
            <div
              className="share-post__main__left"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {listImage.length !== 0 && (
                <div>
                  <div className="setting-btns">
                    <button
                      className="setting-btns__delete-image-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setListImage((prev) => {
                          let temp = [...prev];
                          temp.splice(shareIndex, 1);
                          return temp;
                        });
                        setSelectedFile((prev) => {
                          let temp = [...prev];
                          temp.splice(shareIndex, 1);
                          return temp;
                        });
                        if (shareIndex === 0) {
                          setShareIndex(0);
                        } else if (shareIndex >= listImage.length - 1) {
                          setShareIndex(shareIndex - 1);
                        }
                      }}
                    >
                      <IoIosTrash size={30} />
                    </button>
                    <label
                      className="setting-btns__order-images"
                      htmlFor="photo-upload"
                    >
                      <IoIosAddCircle size={30} />
                    </label>
                  </div>
                  <ImageSlider
                    listImages={listImage}
                    size={520}
                    setShareIndex={setShareIndex}
                  />
                </div>
              )}
              <div className="upload-image">
                <MdPhotoCamera size={96} />
                <h3>Drag photos in here</h3>
                <label htmlFor="photo-upload">Select from computer</label>
                <input
                  type="file"
                  id="photo-upload"
                  multiple
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => {
                    e.preventDefault();
                    if (!e.target.files || e.target.files.length === 0) {
                      setSelectedFile([]);
                      return;
                    }
                    for (const file of e.target.files) {
                      if (file.type.includes("image")) {
                        setSelectedFile((prev) => [...prev, file]);
                      }
                    }
                    // setSelectedFile([...e.target.files]);
                  }}
                />
              </div>
            </div>
            <div className="share-post__main__right">
              <div className="user">
                <div className="user__avatar">
                  <Avatar src={avatar} />
                </div>
                <p className="user__name">{userName}</p>
              </div>
              <textarea
                className="description"
                placeholder="Share your thought ?"
                value={Desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>

              <div className="state" onClick={handleShare}>
                <button className="state__post-btn" disabled={false}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <h1>Uploading...</h1>
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

export default Share;
