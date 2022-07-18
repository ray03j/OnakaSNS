import { useLayoutEffect, useState } from "react";
import { instance } from "../../utils/instance";
import styled from "styled-components";
import Block from "../../components/Block";
import { User, Props } from "../../types/type";
import { useRouter } from "next/router";

const UserPost = () => {
  const router = useRouter();
  const [posts, setPost] = useState<Props[]>([]);
  const [isGot, setIsGot] = useState<boolean>(false);
  const [me, setMe] = useState<User>(Object);
  useLayoutEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { user_id } = router.query;
    const token = localStorage.getItem("token");
    instance
      .get(`/users/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMe(res.data);
      });
    const getUserPost = async () => {
      const token = localStorage.getItem("token");
      console.log(user_id);
      const userposts = await instance.get("/users/" + user_id + "/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(userposts.data);
      setIsGot(true);
    };
    try {
      getUserPost();
    } catch (err) {
      console.error(err);
    }
  }, [router.query]);

  const LogOut = () => {
    localStorage.removeItem("token");
    location.href = "/Signup";
  };

  const backPage = () => {
    location.href = "/";
  };

  return (
    <div>
      <Header>
        <HeaderButton>
          <LogOutButton onClick={LogOut}>Sign Out</LogOutButton>
          <LogOutButton onClick={backPage}>Back</LogOutButton>
        </HeaderButton>
        <LogoImg src="/logo.png" height="60px" />
      </Header>
      <BG>
        <Entire>
          <CenterSection>
            <UserName>{me.name}</UserName>
            {isGot ? <PostNum>投稿数：{posts.length}</PostNum> : <></>}
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

const LogOutButton = styled.button`
  background-color: #ffee4a;
  height: 60px;
  width: 120px;
  padding: 7px;
  margin: 0 5px;
  border-radius: 25px;
  border: #77477e solid 2px;
  color: #77477e;
  font-size: 16px;
  font-weight: bold;
`;

const Header = styled.div`
  height: 70px;
  background-color: #ffc501;
  border-bottom: 2px solid #77477e;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderButton = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  margin-right: 20px;
`;

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

const UserName = styled.div`
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  margin: 3% 5%;
  padding: 0 3%;
  background: #fff48f;
  border-radius: 10px;
`;

const PostNum = styled.div`
  margin-left: 6%;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default UserPost;
