import React, {useState} from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onaka-api.herokuapp.com/'
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const loginSend = (e) => {
    e.preventDefault();
    console.log(email, password); 
/* バックエンドに送る処理に変える */
  };

  const postFunc = () => {
    const loginUser = async () => {
      const postData = {
        Email: email,
        Password: password
      };
  
      const jwt = await instance.post(
        `/api/v1/users/signin`, postData
      );
      console.log(jwt.data);
      localStorage.setItem('token',jwt.data.jwt);
    }

    try{
      loginUser();
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2em'}}><h1>ログイン画面</h1>
      <div>

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

        <button  onClick={postFunc}>
            <Link href="/">
              <a>ログイン</a>
            </Link>
          </button>
        
          <Enrole>
            <button type="submit">
              <Link href="/Signup">
                <a><div>新規登録画面へ</div></a>
              </Link>
            </button>
          </Enrole>
          

     </div>
   </div>
  );
}

export default Login;


const Enrole = styled.p`
text-align: center;

`;