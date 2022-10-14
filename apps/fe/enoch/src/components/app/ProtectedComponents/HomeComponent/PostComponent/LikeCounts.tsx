import React from "react";
import { AiOutlineLike } from "react-icons/ai";

const LikeCounts = ({ likeCount }: any) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: "-10px",
          padding: "2px 7px",
          display: "flex",
          alignItems: "center",
          background: "rgb(214, 214, 214)",
          borderRadius: "10px",
        }}
      >
        <AiOutlineLike />
        <p style={{ margin: "0", marginLeft: "5px" }}>{likeCount}</p>
      </div>
    </>
  );
};

export default LikeCounts;
