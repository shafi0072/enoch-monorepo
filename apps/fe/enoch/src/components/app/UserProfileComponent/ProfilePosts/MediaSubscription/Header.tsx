import React from "react";

interface Props {
  goBack(): void;
}

const Header = ({ goBack }: Props) => (
  <div className="mamage_media_header">
    <button onClick={goBack} className="mamage_media_modal_close_btn p-2">
      <img src="/images/Arrow-Left.png" alt="" className="img-fluid" />
    </button>
    <a href="#" target="_blank">
      Open in a new window
    </a>
  </div>
);

export default Header;
