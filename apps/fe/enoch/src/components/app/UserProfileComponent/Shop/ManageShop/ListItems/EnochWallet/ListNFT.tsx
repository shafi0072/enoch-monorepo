import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdFlashOn } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { InputFieldWrapper } from "../../../../../../core";
import SelectInputField from "../../../../../../core/components/SelectInputField";
import styles from "./ListNFT.module.css";

const selectStyles = {
  height: "48px",
  border: "2px solid #d4d8dd",
  background: "transparent",
  borderRadius: "0px",
  width: "100%",
};

const types = [
  {
    name: "Fixed Price",
    icon: <AiFillDollarCircle size={28} />,
    value: "fixedPrice",
  },
  {
    name: "Flash Sale",
    icon: <MdFlashOn size={28} />,
    value: "flashSale",
  },
  {
    name: "Timed Auction",
    icon: <RiAuctionFill size={28} />,
    value: "timedAuction",
  },
];

function ListNFT() {
  return (
    <div className="d-md-flex gap-3 py-5">
      <div className={styles.listnft__left}>
        <div>
          <div className={styles.label}>Type</div>
          <div className="d-md-flex gap-2">
            {types.map((type, index) => (
              <div key={index} className={styles.singleNft}>
                <div>{type.icon}</div>
                <div className="fw-bold">{type.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.label}>Price</div>
          <div className="d-flex gap-3">
            <SelectInputField controlStyle={selectStyles} />
            <input className={styles.input} placeholder="0.0" />
          </div>
        </div>
        <div>
          <div className={styles.label}>Tag</div>
          <div className="d-md-flex gap-3">
            <div className="flex-fill">
              <SelectInputField
                placeholder="Select Tag 1"
                controlStyle={selectStyles}
              />
            </div>
            <div className="flex-fill">
              <SelectInputField
                placeholder="Select Tag 2"
                controlStyle={selectStyles}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.label}>Applied fees:</div>
          <div className="d-flex align-items-center justify-content-between">
            <div>Enoch Royality</div>
            <div>2.5%</div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>Creator Royality</div>
            <div>10%</div>
          </div>
        </div>
      </div>
      <div className={styles.listnft__right}>
        <div className={styles.image}>
          <img src="/images/avater1.png" alt="" />
          <h3>Avatar Name</h3>
          <div className={styles.imgDescp}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddolore
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListNFT;
