import React from "react";
import { BiCart } from "react-icons/bi";
import { DrawerWrapper } from "../../../core/components/DrawerWrapper";
import SelectInputField from "../../../core/components/SelectInputField";
import Card from "./Card";
import styles from "./Card.module.css";

const selectStyles = {
  fontSize: 16,
  borderRadius: 0,
  backgroundColor: "#fff",
  border: "1px solid #D4D8DD",
  padding: 0,
  margin: 0,
  height: 50,
  fontFamily: "Poppins",
};

const Shop = () => {
  const [cartDrawerState, setcartDrawerState] = React.useState(false);
  return (
    <div className="Daap1-shop-manager bg-white">
      <div>
        <div className="main-banner-shop-manager">
          <img src="./images/banner-shop.png" alt="" />
        </div>
        <div className="sale-coupan-banner-main">
          <div className="sale-coupan-tag">
            <div className="spring-sale-offer">
              Spring Sale | Min $125 Off
              <img src="./images/rings-path.png" alt="" />
            </div>
            <button className="coupan-button">You can use your coupon</button>
          </div>
          <button
            onClick={() => setcartDrawerState(true)}
            className={`d-flex align-items-center justify-content-center gap-2 text-white border-0 rounded ${styles.cart__btn}`}
          >
            <div className="position-relative">
              <BiCart size={27} />
            </div>
            <div className="fw-bold">Cart</div>
          </button>
        </div>
      </div>
      <div className="shops-to-buy-cards d-grid gap-2 d-md-flex gap-2">
        <SelectInputField
          options={{}}
          placeholder="Select Category"
          controlStyle={selectStyles}
        />
        <SelectInputField
          options={{}}
          placeholder="By Type"
          controlStyle={selectStyles}
        />
        <SelectInputField
          options={{}}
          placeholder="Sort By"
          controlStyle={selectStyles}
        />
      </div>
      <div>
        <div>
          <div className="row gap-3">
            <div className="col-sm p-0">
              <Card cardType="sale" />
            </div>
            <div className="col-sm p-0">
              <Card cardType="buy" />
            </div>
            <div className="col-sm p-0">
              <Card cardType="auction" />
            </div>
            <div className="col-sm p-0">
              <Card cardType="sale" />
            </div>
          </div>
        </div>
      </div>
      <DrawerWrapper
        isOpen={cartDrawerState}
        onClose={() => setcartDrawerState(false)}
      >
        One
      </DrawerWrapper>
    </div>
  );
};

export default Shop;
