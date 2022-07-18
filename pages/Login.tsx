import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";
import * as z from "zod";

const instance = axios.create({
  baseURL: "https://onaka-api.herokuapp.com/",
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSend = (e) => {
    e.preventDefault();
    console.log(email, password);
    /* バックエンドに送る処理に変える */
  };

  const postDataChecker = z.object({
    Email: z
      .string()
      .min(1, { message: "Emailを入力してください" })
      .email({ message: "Emailの型にになっていません" }),
    Password: z.string().min(1, { message: "パスワードを入力してください" }),
  });

  const postFunc = () => {
    const loginUser = async () => {
      const postData = {
        Email: email,
        Password: password,
      };
      try {
        postDataChecker.parse(postData);
      } catch (err) {
        console.error(err);
        alert(err.issues[0].message);
        return;
      }
      const jwt = await instance.post(`/api/v1/users/signin`, postData);
      console.log(jwt.data);
      localStorage.setItem("token", jwt.data.jwt);
      location.href = jwt.data.jwt ? "/" : "/Signup";
    };

    try {
      loginUser();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      location.href = "/";
    }
  }, []);

  return (
    <BG>
      <ContentDiv>
        <Card>
          <Title>ログイン画面</Title>
          <div>
            <label>
              <div>メールアドレス</div>
              <InputForm
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <div>パスワード</div>
              <InputForm
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <Enrole>
            <InputButton
              onClick={postFunc}
              // disabled={!(email !== "" && password !== "")}
            >
              <div>ログイン</div>
            </InputButton>
            <InputButton>
              <Link href="/Signup">
                <a>
                  <div>新規登録画面へ</div>
                </a>
              </Link>
            </InputButton>
          </Enrole>
        </Card>
      </ContentDiv>
    </BG>
  );
}

export default Login;

const Enrole = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`;

const BG = styled.div`
  background-color: #ffee4a;
  background-size: cover;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
`;

const ContentDiv = styled.div`
  position: relative;
`;

const Card = styled.div`
  text-align: center;
  padding-top: 2em;
  max-width: 800px;
  background-color: white;
  padding: 1em 30px;
  margin: 30px 0;
  border-radius: 20px;
`;

const Title = styled.h1`
  margin: 10px 0;
  color: #fe9600;
`;

const InputForm = styled.input`
  padding: 4px 23px;
  margin: 5px 30px;
  border-radius: 5px;
  border: 2px solid #fe9600;
`;

const InputButton = styled.button`
  border-color: #00000000;
  background-color: #fe9600;
  color: white;
  padding: 7px;
  margin-top: 8px;
  border-radius: 6px;
  display: inline-block;
`;

// .color-0 { color: #fe9600; }
// .color-1 { color: #ffc501; }
// .color-2 { color: #ffee4a; }
// .color-3 { color: #77477e; }
// .color-4 { color: #03001c; }
