import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loading: React.FC = () => {
  return <Load>Loading</Load>;
};

const Load = styled.div`
  width: 100%;
  height: 100%;
  background: #ffee4a;
`;

export default Loading;
