import React from "react";

interface Props {
  badge: any;
}
const Badge = ({ badge }: Props) => {
  return (
    <>
      <li key={badge.id} className="badges-term">
        <div className="badge-image badges-earn">
          <img src={badge.imageUrl} alt="" className="img-fluid" />
        </div>

        <div className={badge.classname}>
          <h5>{badge.title}</h5>
        </div>
      </li>
    </>
  );
};

export default Badge;
