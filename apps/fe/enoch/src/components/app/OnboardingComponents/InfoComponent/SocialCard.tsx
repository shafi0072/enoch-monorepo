import React from "react";

interface CardProps {
  media: string;
  image: string;
  description: string;
}

const SocialCard: React.FC<CardProps> = ({ media, image, description }) => {
  return (
    <div className="card info-card-size">
      <div className="card_head community-card enoch-bg text-center">
        <img src={image} className="img-fluid rounded-start" alt="icon" />
      </div>
      <div className="card_body community-card text-center">
        <h5 className="app-title">{media}</h5>
        {/* <p className="app-desc">Join +50K users across the world</p> */}
        <p className="app-desc">{description}</p>
      </div>
    </div>
  );
};

export default SocialCard;
