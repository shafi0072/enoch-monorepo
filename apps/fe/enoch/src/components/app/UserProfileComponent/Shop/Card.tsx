import React from "react";
import { BsFillLightningFill, BsHeartFill } from "react-icons/bs";
import styles from "./Card.module.css";

const purchaseType = {
  SALE: "sale",
  BUY: "buy",
  AUCTION: "auction",
};

const Card = ({ cardType }: { cardType: string }) => {
  return (
    <div className={`font-poppins border overflow-hidden ${styles.card}`}>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.card__image}`}
      >
        <img src="./images/arch-man.png" alt="" />
      </div>
      <div></div>
      <div className="d-flex flex-column gap-2">
        <div
          className={`p-2 px-3 d-flex align-items-center w-100 ${styles.card__price__box}`}
        >
          {cardType === purchaseType.BUY ? (
            <div className="d-flex align-items-center justify-content-between w-100">
              <h5 className={`m-0 p-0 ${styles.font24}`}>$115</h5>
              <h5 className={`m-0 p-0 ${styles.font24}`}>Hurry Now</h5>
            </div>
          ) : cardType === purchaseType.SALE ? (
            <div className="d-flex align-items-center justify-content-between w-100">
              <div>
                <div className={`${styles.font15}`}>$300 15% OFF</div>
                <h5 className={`m-0 p-0 ${styles.font24}`}>$180</h5>
              </div>
              <div>
                <div
                  className={`d-flex align-items-center fw-bold ${styles.font11}`}
                >
                  <BsFillLightningFill />
                  Flash sale
                </div>
              </div>
            </div>
          ) : (
            cardType === purchaseType.AUCTION && (
              <div className="d-flex align-items-center justify-content-between w-100">
                <div>
                  <div className={`${styles.font15}`}>Bid amount</div>
                  <h5 className={`m-0 p-0 ${styles.font24}`}>$180</h5>
                </div>
                <div>
                  <div
                    className={`d-flex align-items-center fw-bold ${styles.font11}`}
                  >
                    <BsFillLightningFill />
                    Auction ends in
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {/*  */}
        <div className="p-2 px-3 d-grid gap-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="">Enoch Citizen</div>
            <div className={`${styles.font12}`} style={{ color: "#aaaaaa" }}>
              #3444
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center flex-wrap gap-1">
              <div
                className={`text-danger border border-danger p-1 px-2 ${styles.card_category}`}
              >
                Instant buy
              </div>
              <div
                className={`text-danger border border-danger p-1 px-2 ${styles.card_category}`}
              >
                Spring sale
              </div>
            </div>
            <h5
              style={{ color: "#474CD5", fontSize: "14px" }}
              className="text-uppercase m-0 p-0 fw-bold"
            >
              {cardType === purchaseType.BUY
                ? "Buy"
                : cardType === purchaseType.SALE
                ? "Sale"
                : cardType === purchaseType.AUCTION && "Auction"}
            </h5>
          </div>
        </div>
        {cardType === purchaseType.SALE || cardType === purchaseType.BUY ? (
          <div className="d-flex gap-2 p-2 px-3">
            <button
              className={`p-2 border px-3 rounded-pill bg-white ${styles.font15}`}
            >
              Add to Cart
            </button>
            <button
              className={`p-2 border px-3 rounded-pill ${styles.font15} ${styles.btn__purple}`}
            >
              Buy Now
            </button>
          </div>
        ) : (
          cardType === purchaseType.AUCTION && (
            <div className="p-2 px-3">
              <button
                className={`p-2 border px-3 rounded-pill w-100 ${styles.font15}`}
              >
                Bid Now
              </button>
            </div>
          )
        )}
        <div
          className={`d-flex align-items-center justify-content-start gap-1 ml-2 px-3 pb-3 ${styles.font14}`}
        >
          <BsHeartFill className="text-danger" />
          <span>24</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
