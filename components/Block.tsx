import React, { useEffect, useState } from "react";
import { Props } from "../types/type";
import styled from "styled-components";
import Link from "next/link";

const Block: React.FC<{ props: Props }> = ({ props }) => {
  const formatDate = (date: string) => {
    const dateInfo = new Date(date);
    const year = dateInfo.getFullYear();
    const month = `0${dateInfo.getMonth() + 1}`.slice(-2);
    const dates = `0${dateInfo.getDate()}`.slice(-2);
    const hours = `0${dateInfo.getHours()}`.slice(-2);
    const minutes = `0${dateInfo.getMinutes()}`.slice(-2);
    const seconds = `0${dateInfo.getSeconds()}`.slice(-2);

    return `${year}/${month}/${dates} ${hours}:${minutes}:${seconds}`;
  };
  const [yummyFlag, setYummyFlag] = useState<boolean>(false);
  const [funnyFlag, setFunnyFlag] = useState<boolean>(false);

  useEffect(() => {
    const uid = localStorage.getItem("user_id");
    props.funny_users.forEach((user) => {
      if (user.id == uid) setFunnyFlag(true);
    });
    props.yummy_users.forEach((user) => {
      if (user.id == uid) setYummyFlag(true);
    });
  }, []);

  return (
    <BlockDiv>
      <ImgContain>
        <BlockImg src={props.image_url} />
      </ImgContain>
      <ContentDiv>
        <h1>{props.content}</h1>
        <Link href={"/User/" + props.user.id}>
          <p>Posted by {props.user.name}</p>
        </Link>
        <Buttons>
          {yummyFlag ? (
            <PushedYummyButton>
              Yummy! {props.yummy_users.length}
            </PushedYummyButton>
          ) : (
            <UnpushYummyButton>
              Yummy! {props.yummy_users.length}
            </UnpushYummyButton>
          )}
          {funnyFlag ? (
            <PushedFunnyButton>
              Funny! {props.funny_users.length}
            </PushedFunnyButton>
          ) : (
            <UnpushFunnyButton>
              Funny! {props.funny_users.length}
            </UnpushFunnyButton>
          )}
        </Buttons>
        <TimeSmall>{formatDate(props.created_at)}</TimeSmall>
      </ContentDiv>
    </BlockDiv>
  );
};
export default Block;

const ImgContain = styled.div`
  height: 600px;
  width: 600px;
  border: 2px solid #aaa;
  border-radius: 5px;
  background-color: #888;
  margin: 10px 0;
`;

const BlockImg = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

const BlockDiv = styled.div`
  background-color: white;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #aaa;
  margin: 2px 0;
  border-radius: 10px;
`;

const ContentDiv = styled.div`
  width: 80%;
`;

const TimeSmall = styled.p`
  text-align: right;
  font-size: 13px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const UnpushYummyButton = styled.button`
  margin: 0 5px;
  padding: 12px 32px;
  border: 3px solid #ffc501;
  background-color: white;
  color: #ffc501;
  border-radius: 10px;
  font-size: 17px;
`;

const PushedYummyButton = styled.button`
  margin: 0 5px;
  padding: 15px 35px;
  border: none;
  background-color: #ffc501;
  color: white;
  border-radius: 10px;
  font-size: 17px;
`;

const UnpushFunnyButton = styled.button`
  margin: 0 5px;
  padding: 12px 32px;
  border: 3px solid #77477e;
  background-color: white;
  color: #77477e;
  border-radius: 10px;
  font-size: 17px;
`;

const PushedFunnyButton = styled.button`
  margin: 0 5px;
  padding: 15px 35px;
  border: none;
  background-color: #77477e;
  color: white;
  border-radius: 10px;
  font-size: 17px;
`;
