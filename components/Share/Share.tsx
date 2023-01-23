import { DragEvent } from "react";
import ImageSlider from "../ImageSlider";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { IoIosPhotos } from "react-icons/io";
import CustomImage from "../CustomImage";
function Share() {
  const [listImage, setListImage] = useState<string[]>([
    // "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
    // "https://i.ibb.co/nkYrxTW/loginpage3.png",
    // "https://i.ibb.co/YXL10VM/animelody.png",
    // "https://i.ibb.co/G3yfYFN/Monokuma.png",
    // "https://i.ibb.co/Ctx4kbM/avatar.jpg",
  ]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [Desc, setDesc] = useState("");
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setSelectedFile([...e.dataTransfer?.files]);
  };
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    for (const file of selectedFile) {
      const objectUrl = URL.createObjectURL(file);
      setListImage((prev) => [...prev, objectUrl]);
    }
    // free memory when ever this component is unmounted
    return () => {
      for (const imgUrl of listImage) {
        URL.revokeObjectURL(imgUrl);
      }
    };
  }, [selectedFile]);

  return (
    <div className="share-post">
      <h1 className="share-post__header">Create new post</h1>
      <div className="share-post__main">
        <div className="share-post__main__left">
          {listImage.length !== 0 ? (
            <>
              {/* <IoIosPhotos size={16} /> */}
              <ImageSlider listImages={listImage} size={520} />
            </>
          ) : (
            <div
              className="upload-image"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <MdPhotoCamera size={96} />
              <h3>Drag photos in here</h3>
              <label htmlFor="photo-upload">Select from computer</label>
              <input
                type="file"
                id="photo-upload"
                multiple
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setSelectedFile([]);
                    return;
                  }
                  setSelectedFile([...e.target.files]);
                }}
              />
            </div>
          )}
        </div>
        <div className="share-post__main__right">
          <div className="user">
            <Avatar />
            <p className="user__name">Phong_huynh_2022</p>
          </div>
          <textarea
            className="description"
            placeholder="Share your thought ?"
            value={Desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <div className="state">{Desc}</div>
        </div>
      </div>
    </div>
  );
}

export default Share;
