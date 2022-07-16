import React, {useState} from 'react';
import Link from 'next/link'
import styled from 'styled-components';

function Edit() {
  const [sentence, setSentence] = useState('');

  const SentenceSend = (e) => {
    e.preventDefault();
    console.log(sentence);
/* バックエンドに送る処理に変える */
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em'}}><h1>投稿する画面</h1>
      <form onSubmit={SentenceSend}>
            <Textbox>
              <label>
                <textarea
                  onChange={(e) => setSentence(e.target.value)}
                >
                  ボケてね！
                </textarea>
              </label>
            </Textbox>

            <Picture>
              <div>
                <label>
                  <input type="file" />
                </label>
              </div>
            </Picture>

        <Submit>
          <div>
            <button type="submit">
                <a>投稿！</a>
            </button>
          </div>
        </Submit>

         <Cancel>
            <button type="submit">
              <Link href="/">
                <a><div>キャンセル</div></a>
              </Link>
           </button>
          </Cancel>
          

     </form>
   </div>
  );
}

export default Edit;


const Textbox = styled.label`
  name: sentence;
  type: string;
  rows: 10;
cols: 60;
text-align: center;

`;

const Picture = styled.label`
  text-align: center;

`;

const Submit = styled.p`
  text-align: center;

`;

const Cancel = styled.p`
  text-align: center;

`;