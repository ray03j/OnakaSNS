import React, { useState } from "react";
import { Props } from "../types/type";

const Block: React.FC<{ props: Props }> = ({ props }) => {
  return (
    <div>
      <img src={props.image_url} />

      <div>{props.content}</div>
    </div>
  );
};
export default Block;
