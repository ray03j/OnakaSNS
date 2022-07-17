import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Block from "../components/Block";
import Link from "next/link";
import { instance } from "../utils/instance";
import { Props } from "../types/type";

function Home() {
  const [posts, setPosts] = useState<Props[]>([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    async function fetchPostData() {
      await instance
        .get("/posts", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => setPosts(res.data));
    }
    fetchPostData();
    console.log(posts);
  }, []);
  return (
    <div>
      <Head>
        <title>OnakaSNS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Entire>
        <LeftSection>
          <div>
            <Link href="/Edit">
              <input type="image" src="edit.svg" />
            </Link>
          </div>
        </LeftSection>

        <CenterSection>
          {posts.map((e) => {
            return (
              <div key={e.id}>
                <Block props={e} />
              </div>
            );
          })}
        </CenterSection>

        <RightSection>
          <div></div>
        </RightSection>
      </Entire>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
export default Home;

// Home.getInitialProps = async ({ res }) => {
//   // サーバー側でリダイレクト
//   let temp;
//   try {
//     temp = localStorage.getItem("token");
//   } catch (err) {
//     console.error();
//   }
//   if (temp === null) {
//     if (typeof window === "undefined") {
//       res.writeHead(302, { Location: "/Signup" });
//       res.end();

//       return {};
//     }

//     // クライアント側でリダイレクト

//     Router.push("/Signup");
//   }

//   return {};
// };

const Entire = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  width: 20%;
  min-height: 100vh;
  background-color: #00bfff;
`;

const CenterSection = styled.div`
  width: 60%;
  min-height: 100vh;
  background-color: #fffff0;
`;

const RightSection = styled.div`
  width: 20%;
  min-height: 100vh;
  background-color: #00bfff;
`;
