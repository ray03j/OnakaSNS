import { useLayoutEffect } from "react";
import { instance } from "../utils/instance";
import { useParams } from "react-router-dom";

const UserPost = () => {
  const user_id: string = useParams();
  useLayoutEffect(() => {
    const getUserPost = async () => {
      const token = localStorage.getItem("token");
      const useposts = await instance.get("/" + user_id + "posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
    };
    try {
      getUserPost();
    } catch (err) {
      console.error(err);
    }
  }, []);
};

export default UserPost;
