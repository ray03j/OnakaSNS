import React, {useState} from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import getUrl from '../losic/Cloudinary';
import { instance } from '../utils/instance'

function Edit() {
  const [sentence, setSentence] = useState('');
  const [image, uploadImage] = useState<FileList>();

  const SentenceSend = async (e) => {
    e.preventDefault();
    console.log(sentence);
    const image_url = await getUrl(image);
    const token = localStorage.getItem("token")
    const res = await instance.post("/posts", {
      content: sentence,
      image_url: image_url,
    }, {
      headers: {Authorization: `Bearer ${token}`}
    })
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em'}}><h1>投稿する画面</h1>
      <form onSubmit={SentenceSend}>
        <Textbox>
          <label>
            <textarea
              onChange={(e) => setSentence(e.target.value)}
              placeholder="ボケてね！"
            >
              
            </textarea>
          </label>
        </Textbox>

        <Picture>
          <div>
            <label>
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(e.target.files);
                }}
                accept="image/*"
              />
            </label>
          </div>
        </Picture>

        <Submit>
          <button type="submit">
            <a>投稿！</a>
          </button>
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