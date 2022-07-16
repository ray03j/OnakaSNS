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
    <div style={{ textAlign: 'center', marginTop: '2em'}}><h1>新規登録画面</h1>
      <div>
        <div>
          <label>
            <div>ユーザー名</div>
            <input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            <div>メールアドレス</div>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e. target.value)}
            />
          </label>
        </div>

        <div>
         <label>
            <div>パスワード</div> 
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </label>
        </div>

        <button onClick = {postFunc}>
              <a>新規登録</a>
        </button>

         <Enrole>
            <button type="submit">
              <Link href="/Login">
                <a><div>ログイン画面へ</div></a>
              </Link>
           </button>
          </Enrole>
          

     </div>
   </div>
  );
}

export default Signup;


const Enrole = styled.p`
text-align: center;

`;