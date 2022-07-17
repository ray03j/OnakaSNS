import React, {useState} from 'react';


interface Props {
  ID: string
  content: string
  image_url: string
}

const Block : React.FC<{props:Props}> =({props}) => {
  return (
    <div>
     <img src={props.image_url} />

     <div>{props.content}</div>
    </div>
  )
}
export default Block;
