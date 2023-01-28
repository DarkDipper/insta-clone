import { MouseEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import ModalPost from "../ModalPost";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import useComponentVisible from "@yourapp/hooks/useComponentVisible";
import Image from "next/image";
import { Blurhash } from "react-blurhash";
function MiniPost({ post }: Props) {
  const [Loaded, setLoaded] = useState(false);
  const [Hover, setHover] = useState(false);
  const {
    ref: modalPostRef,
    isComponentVisible: modalPostVisible,
    setIsComponentVisible: setModalPostVisible,
  } = useComponentVisible(false);
  const handleModalPost = (e: MouseEvent) => {
    e.preventDefault();
    setModalPostVisible(true);
  };
  useEffect(() => {
    if (modalPostVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [modalPostVisible]);
  return (
    <>
      {modalPostVisible && (
        <Modal handleClose={setModalPostVisible}>
          <ModalPost SlideImage={post.list_image} modalPostRef={modalPostRef} />
        </Modal>
      )}
      <div
        className="mini-post"
        onClick={handleModalPost}
        onMouseEnter={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setHover(false);
        }}
      >
        {!Loaded && (
          <Blurhash
            hash={post.list_image[0].blurHash}
            width={"100%"}
            height={"100%"}
          />
        )}
        <div
          className="hover"
          style={{
            opacity: Hover ? 0.6 : 0,
          }}
        >
          <div className="liked">
            <span>{post.likes.length}</span> <AiFillHeart />
          </div>
          <div className="comments">
            <span>{post.comment.length}</span> <TbMessageCircle2 />
          </div>
        </div>
        <Image
          src={post.list_image[0].path}
          sizes="100%"
          fill
          draggable={false}
          alt=""
          onLoadingComplete={() => {
            post.list_image[0].blurHash && setLoaded(true);
          }}
        />
      </div>
    </>
  );
}

export default MiniPost;
type Props = {
  post: {
    _id: string;
    comment: string[];
    list_image: {
      _id: string;
      path: string;
      width: number;
      height: number;
      blurHash: string;
    }[];
    likes: string[];
    user: {
      _id: string;
      user_name: string;
      profile_picture: string;
    };
    description?: string;
  };
};
