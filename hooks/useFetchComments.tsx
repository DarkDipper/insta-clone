import axios from "axios";
import { useEffect, useState } from "react";

function useFetchComments(postId: string) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComment = async () => {
      await axios
        .get(
          `https://insta-clone-backend-dipper.onrender.com/api/v1/comment/${postId}`
        )
        .then((res) => {
          // console.log(res.data);
          setComments(res.data["comments"]);
        })
        .catch((error) => {
          console.log(error.response?.data.message);
        });
    };
    fetchComment();
    console.log("Fetch post success");
  }, [postId]);
  return comments;
}

export default useFetchComments;
