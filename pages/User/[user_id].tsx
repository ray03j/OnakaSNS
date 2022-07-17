import { useLayoutEffect, useState } from "react";
import { instance } from "../../utils/instance";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Block from "../../components/Block";
import Link from "next/link";
import { Props } from "../../types/type";
import { useRouter } from "next/router";

const UserPost = () => {
  //const user_id: string = useParams();
  const router = useRouter();
  //console.log(user_id);
  const [posts, setPost] = useState<Props[]>([]);
  useLayoutEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { user_id } = router.query;
    const getUserPost = async () => {
      const token = localStorage.getItem("token");
      console.log(user_id);
      const userposts = await instance.get("/users/" + user_id + "/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(userposts.data);
    };
    try {
      getUserPost();
    } catch (err) {
      console.error(err);
    }
  }, [router.query]);

  return (
    <div>
      <BG>
        <Entire>
          <CenterSection>
            {posts.map((e) => {
              return (
                <BlockLine key={e.id}>
                  <Block props={e} />
                </BlockLine>
              );
            })}
          </CenterSection>
        </Entire>
      </BG>
    </div>
  );
};

const BG = styled.div`
  background-color: #fe9600;
  background-size: cover;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
`;

const Entire = styled.div`
  display: flex;
  justify-content: center;
`;

const CenterSection = styled.div`
  width: 800px;
  min-height: 100vh;
  background-color: #ffee4a;
`;

const BlockLine = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

const PostIco = styled.div`
  left: 30px;
  top: 30px;
  position: absolute;
  background-color: #bbb;
  height: 60px;
  width: 60px;
  padding: 5px;
  border-radius: 30px;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export default UserPost;
