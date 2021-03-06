import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import getUrl from "../losic/Cloudinary";
import { instance } from "../utils/instance";
import * as z from "zod";

function Edit() {
  const [sentence, setSentence] = useState("");
  const [sentenceLength, setSentenceLength] = useState(0);
  const [image, uploadImage] = useState<FileList>();
  const [imgXml, setImgXml] = useState<JSX.Element>(<></>);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  useEffect(() => {
    setSentenceLength(100 - sentence.length);
  }, [sentence]);
  const SentenceSend = async (e) => {
    setIsPosting(true);
    e.preventDefault();
    if (!image) {
      alert("画像を選択してください");
      return;
    }
    console.log(sentence);
    try {
      const ok = limit.parse({ str: sentence });
    } catch (err) {
      alert("100文字を超えています！");
      return;
    }

    const image_url = await getUrl(image);
    const token = localStorage.getItem("token");
    const res = await instance.post(
      "/posts",
      {
        content: sentence,
        image_url: image_url,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    location.href = "/";
  };

  const limit = z.object({
    str: z.string().max(100),
  });
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image[0]);
      reader.onload = (e) => {
        setImgXml(
          <>
            <ImgDiv>
              <ImgContain>
                <ThumbImg src={e.target.result.toString()} />
              </ImgContain>
              <CloseButton
                type="button"
                onClick={() => {
                  uploadImage(null);
                }}
              >
                <b>✕</b>
              </CloseButton>
            </ImgDiv>
          </>
        );
      };
    } else {
      setImgXml(<></>);
    }
  }, [image]);

  return (
    <BG>
      <ContentDiv>
        <Card>
          <Title>投稿</Title>
          <form onSubmit={SentenceSend}>
            {image ? (
              imgXml
            ) : (
              <Label>
                画像を選ぶ
                <InputFile
                  type="file"
                  onChange={(e) => {
                    uploadImage(e.target.files);
                  }}
                  accept="image/*"
                />
              </Label>
            )}
            <label>
              <InputForm
                onChange={(e) => setSentence(e.target.value)}
                placeholder="ボケてね！"
                required
              ></InputForm>
            </label>
            {sentenceLength < 0 ? (
              <OverSentence>残り{sentenceLength}字</OverSentence>
            ) : (
              <RemainSentence>残り{sentenceLength}字</RemainSentence>
            )}
            <Enrole>
              <BuckButton>
                <Link href="/">キャンセル</Link>
              </BuckButton>
              <InputColorButton disabled={isPosting} type="submit">
                おなポイ!
              </InputColorButton>
            </Enrole>
          </form>
        </Card>
      </ContentDiv>
    </BG>
  );
}

const RemainSentence = styled.p`
  font-weight: bold;
  color: #ffc501;
`;

const OverSentence = styled.p`
  font-weight: bold;
  color: #ff0000;
`;

const Enrole = styled.div`
  text-align: center;
  display: flex;
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
  min-width: 600px;
  background-color: white;
  padding: 1em 30px;
  margin: 30px 0;
  border-radius: 20px;
`;

const Cancel = styled.p`
  text-align: center;
`;

const Title = styled.h1`
  margin: 10px 0;
  color: #fe9600;
  font-weight: 30px;
`;

const InputForm = styled.textarea`
  padding: 6px;
  margin: 5px 0;
  border-radius: 5px;
  border: 2px solid #fe9600;
  resize: none;
  min-height: 150px;
  width: 90%;
`;

const BuckButton = styled.div`
  border-color: #00000000;
  background-color: #aaa;
  color: white;
  padding: 7px;
  margin: 8px 10px 0;
  border-radius: 6px;
  width: 40%;
`;

const InputColorButton = styled.button`
  border-color: #00000000;
  background-color: #fe9600;
  color: white;
  padding: 7px;
  margin: 8px 10px 0;
  border-radius: 6px;
  width: 40%;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label`
  display: inline-block;
  width: 80%;
  background-color: #fe9600;
  padding: 20px 5px;
  border-radius: 6px;
  color: white;
  margin-bottom: 10px;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CloseButton = styled.button`
  border-radius: 20px;
  width: 30px;
  height: 30px;
  border: none;
  margin-left: 5px;
  background-color: #aaa;
  color: white;
`;

const ImgContain = styled.div`
  height: 400px;
  width: 400px;
  border: 2px solid #aaa;
  border-radius: 5px;
  background-color: #888;
`;

const ThumbImg = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

export default Edit;
