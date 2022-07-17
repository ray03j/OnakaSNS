import React, { useEffect, useState } from "react";
import { Props } from "../types/type";
import styled from "styled-components";
import Link from "next/link";
import { instance } from "../utils/instance";

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
  const DeleteYummy = () => {
    const tokenValue = localStorage.getItem("token");
    instance
      .delete("/yummy/" + props.id, {
        headers: { Authorization: "Bearer " + tokenValue },
      })
      .then((res) => {
        console.log(res.data);
        setYummyFlag(false);
        setYummyCount(yummyCount - 1);
      });
  };

  const PostYummy = () => {
    const tokenValue = localStorage.getItem("token");
    instance
      .post("/yummy/" + props.id, null, {
        headers: { Authorization: "Bearer " + tokenValue },
      })
      .then((res) => {
        console.log(res.data);
        setYummyFlag(true);
        setYummyCount(yummyCount + 1);
      });
  };

  const DeleteFunny = () => {
    const tokenValue = localStorage.getItem("token");
    instance
      .delete("/funny/" + props.id, {
        headers: { Authorization: "Bearer " + tokenValue },
      })
      .then((res) => {
        console.log(res.data);
        setFunnyFlag(false);
        setFunnyCount(funnyCount - 1);
      });
  };

  const PostFunny = () => {
    const tokenValue = localStorage.getItem("token");
    instance
      .post("/funny/" + props.id, null, {
        headers: { Authorization: "Bearer " + tokenValue },
      })
      .then((res) => {
        console.log(res.data);
        setFunnyFlag(true);
        setFunnyCount(funnyCount + 1);
      });
  };
  const [yummyFlag, setYummyFlag] = useState<boolean>(false);
  const [funnyFlag, setFunnyFlag] = useState<boolean>(false);
  const [yummyCount, setYummyCount] = useState<number>(0);
  const [funnyCount, setFunnyCount] = useState<number>(0);

  useEffect(() => {
    const uid = localStorage.getItem("user_id");
    props.funny_users.forEach((user) => {
      if (user.id == uid) setFunnyFlag(true);
    });
    props.yummy_users.forEach((user) => {
      if (user.id == uid) setYummyFlag(true);
    });
    setYummyCount(props.yummy_users.length);
    setFunnyCount(props.funny_users.length);
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
            <PushedYummyButton onClick={() => DeleteYummy()}>
              <WhiteSvgDiv>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M4 20.1v-2q0-5.45 5.25-8.775T24 6q9.5 0 14.75 3.325T44 18.1v2Zm3.1-3h33.8q-.15-3.45-4.825-5.775T24 9q-7.4 0-12.125 2.325T7.1 17.1ZM4 28.9v-3q1.65 0 2.875-1.1t3.925-1.1q2.7 0 3.575 1.1t2.925 1.1q2.05 0 3.025-1.1.975-1.1 3.675-1.1 2.7 0 3.675 1.1.975 1.1 3.025 1.1t2.925-1.1q.875-1.1 3.575-1.1t3.925 1.1Q42.35 25.9 44 25.9v3q-2.7 0-3.725-1.1T37.2 26.7q-2.05 0-2.925 1.1T30.7 28.9q-2.7 0-3.675-1.1-.975-1.1-3.025-1.1t-3.025 1.1Q20 28.9 17.3 28.9q-2.7 0-3.575-1.1T10.8 26.7q-2.05 0-3.075 1.1Q6.7 28.9 4 28.9ZM7 42q-1.2 0-2.1-.9Q4 40.2 4 39v-6.4h40V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34v-3.4H7V39Zm0-3.4h34Zm.1-18.5h33.8Z" />
                </svg>
              </WhiteSvgDiv>
              Yummy! {yummyCount}
            </PushedYummyButton>
          ) : (
            <UnpushYummyButton onClick={() => PostYummy()}>
              <FoodSvgDiv>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M4 20.1v-2q0-5.45 5.25-8.775T24 6q9.5 0 14.75 3.325T44 18.1v2Zm3.1-3h33.8q-.15-3.45-4.825-5.775T24 9q-7.4 0-12.125 2.325T7.1 17.1ZM4 28.9v-3q1.65 0 2.875-1.1t3.925-1.1q2.7 0 3.575 1.1t2.925 1.1q2.05 0 3.025-1.1.975-1.1 3.675-1.1 2.7 0 3.675 1.1.975 1.1 3.025 1.1t2.925-1.1q.875-1.1 3.575-1.1t3.925 1.1Q42.35 25.9 44 25.9v3q-2.7 0-3.725-1.1T37.2 26.7q-2.05 0-2.925 1.1T30.7 28.9q-2.7 0-3.675-1.1-.975-1.1-3.025-1.1t-3.025 1.1Q20 28.9 17.3 28.9q-2.7 0-3.575-1.1T10.8 26.7q-2.05 0-3.075 1.1Q6.7 28.9 4 28.9ZM7 42q-1.2 0-2.1-.9Q4 40.2 4 39v-6.4h40V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34v-3.4H7V39Zm0-3.4h34Zm.1-18.5h33.8Z" />
                </svg>
              </FoodSvgDiv>
              Yummy! {yummyCount}
            </UnpushYummyButton>
          )}
          {funnyFlag ? (
            <PushedFunnyButton onClick={() => DeleteFunny()}>
              <WhiteSvgDiv>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M24 34.95q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95Zm-8.9-13.6 2.25-2.25 2.25 2.25 1.8-1.8-4.05-4.05-4.05 4.05Zm13.35 0 2.25-2.25 2.25 2.25 1.8-1.8-4.05-4.05-4.05 4.05ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Z" />
                </svg>
              </WhiteSvgDiv>
              Funny! {funnyCount}
            </PushedFunnyButton>
          ) : (
            <UnpushFunnyButton onClick={() => PostFunny()}>
              <SmileSvgDiv>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path d="M24 34.95q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95Zm-8.9-13.6 2.25-2.25 2.25 2.25 1.8-1.8-4.05-4.05-4.05 4.05Zm13.35 0 2.25-2.25 2.25 2.25 1.8-1.8-4.05-4.05-4.05 4.05ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Z" />
                </svg>
              </SmileSvgDiv>
              Funny! {funnyCount}
            </UnpushFunnyButton>
          )}
        </Buttons>
        <TimeSmall>{formatDate(props.created_at)}</TimeSmall>
      </ContentDiv>
    </BlockDiv>
  );
};
export default Block;

const FoodSvgDiv = styled.div`
  fill: #ffc501;
`;

const SmileSvgDiv = styled.div`
  fill: #77477e;
`;

const WhiteSvgDiv = styled.div`
  fill: white;
`;

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
