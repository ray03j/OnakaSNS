import React, {useState} from 'react';
import Link from 'next/link'
import styled from 'styled-components';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const SignupSend = (e) => {
    e.preventDefault();
    console.log(email, password);
/* バックエンドに送る処理に変える */
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em'}}><h1>投稿する画面</h1>
      <form onSubmit={SignupSend}>
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

        <button type="submit">
              <a>新規登録</a>
        </button>

         <Enrole>
            <button type="submit">
              <Link href="/Login">
                <a><div>ログイン画面へ</div></a>
              </Link>
           </button>
          </Enrole>
          

     </form>
   </div>
  );
}

export default Signup;


const Enrole = styled.p`
text-align: center;

`;