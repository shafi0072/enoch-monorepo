import React from "react";

const SeeMore = ({ showMore, value }: any) => (
  <div onClick={() => showMore(value)} className="dApp-Who-seemore">
    <a href="#!">Show more</a>
  </div>
);

export default SeeMore;
