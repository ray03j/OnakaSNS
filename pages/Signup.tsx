import React, {useState} from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onaka-api.herokuapp.com/'
});

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');

//  const SignupSend = (e) => {
//    e.preventDefault();
//    console.log(email, password);
             /* バックエンドに送る処理に変える */
//  };

  const postFunc = () => {
    const addUser = async () => {
      const postData = {
        Name: username,
        Email: email,
        Password: password
      };
      const data = await instance.post(
        `/api/v1/users/signup`, postData
      ); // instanceはbaseURLで定義したもの
      console.log(data);
    }

    try{
      addUser();
    }
    catch(err){
      console.error(err);
      /* すでに登録済みだったらエラーの表示をする */
    }
  }

  return (
    <BG>
      <ContentDiv>
        <Card>
          <Title>新規登録画面</Title>
          <div>
            <div>
              <label>
                <div>ユーザー名</div>
                <InputForm
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <div>メールアドレス</div>
                <InputForm
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e. target.value)}
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
              <InputButton onClick = {postFunc}>
                <a>新規登録</a>
              </InputButton>
              <InputButton type="submit">
                <Link href="/Login">
                  <a><div>ログイン画面へ</div></a>
                </Link>
              </InputButton>
            </Enrole>
          </div>
        </Card>
      </ContentDiv>
    </BG>
  );
}

export default Signup;

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
`

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
`

const InputForm = styled.input`
  padding: 4px 23px;
  margin: 5px 30px;
  border-radius: 5px;
  border: 2px solid #fe9600;
`

const InputButton = styled.button`
  border-color: #00000000;
  background-color: #fe9600;
  color: white;
  padding: 7px;
  margin-top: 8px;
  border-radius: 6px;
  display: inline-block;
`

// .color-0 { color: #fe9600; }
// .color-1 { color: #ffc501; }
// .color-2 { color: #ffee4a; }
// .color-3 { color: #77477e; }
// .color-4 { color: #03001c; }
