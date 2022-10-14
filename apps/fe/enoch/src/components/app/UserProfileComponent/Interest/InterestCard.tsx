import React from "react";
import { BiCheck } from "react-icons/bi";
import { HiOutlineCheck, HiPlus } from "react-icons/hi";
import Button from "../../../core/lib/bootstrap/Button/Button";
import styles from "./Interest.module.css";

interface InterestCardProps {
  title?: string;
  description?: string;
  image?: string;
  following?: boolean;
}

const InterestCard = ({
  title,
  description,
  image,
  following,
}: InterestCardProps) => {
  return (
    <div
      className={`${styles.interestCard} d-flex align-items-center gap-2 border-bottom border-2 py-4`}
    >
      <div>
        <div className={`${styles.interestCardImg}`}>
          <div>
            <img src={image} alt="" />
          </div>
          <span>
            <BiCheck color="#fff" />
          </span>
        </div>
      </div>
      <div className={`${styles.interestCardInfo} flex-grow-1 mr-2`}>
        <h1>{title}</h1>
        <div>{description}</div>
      </div>
      <div>
        {following ? (
          <Button
            label="Following"
            icon={<HiOutlineCheck size={18} color="green" />}
            width="120px"
          />
        ) : (
          <Button
            label="Follow"
            width="120px"
            icon={<HiPlus size={18} color="#8A9099" />}
          />
        )}
      </div>
    </div>
  );
};

export default InterestCard;
