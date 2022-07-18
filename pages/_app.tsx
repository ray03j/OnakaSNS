import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  // TODO 正式なローディングコンポーネントにする
  const loadingComponent = <h2>Loading...</h2>;

  return (
    <div>
      {pageLoading && <Loading></Loading>}
      <Component {...pageProps} />
    </div>
  );

  //   return <Component {...pageProps} />;
  // }
}

const Loading = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffee4a;
  z-index: 2147483647;
`;

export default MyApp;
