import React from "react";
import styles from "./ManageShop.module.css";

const pageTypes = {
  MANAGE_SHOP: "manageShop",
  EDIT_SHOP: "editShop",
  LIST_ITEMS: "listItems",
  CREATE_COUPON: "createCoupon",
  CREATE_SALE: "createSale",
  CREATE_OFFER: "createOffer",
  ANALYTICS: "analytics",
};

const manageShopOptions = [
  {
    name: "Edit shop",
    value: "EDIT_SHOP",
  },
  {
    name: "List Items",
    value: "LIST_ITEMS",
  },
  {
    name: "Create Coupon",
    value: "CREATE_COUPON",
  },
  {
    name: "Create Sale",
    value: "CREATE_SALE",
  },
  {
    name: "Create Offer",
    value: "CREATE_OFFER",
  },
  {
    name: "Analytics",
    value: "ANALYTICS",
  },
];

const ManageShopComponent = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [performanceData, setperformanceData] = React.useState([
    {
      icon: "",
      label: "Sold items",
      value: "80",
    },
    {
      icon: "",
      label: "In Cart",
      value: "20",
    },
    {
      icon: "",
      label: "Visitors",
      value: "5k",
    },
    {
      icon: "",
      label: "Total Sell",
      value: "$3000",
    },
  ]);
  return (
    <div className="manage-shop_modal_body_content pb-10">
      <h2>Manage Shop</h2>
      <div className="mamage_media_dhashboard_sect d-flex gap-3 mb-3">
        <div className="mamage_media_dhashboard_left bg-white p-3">
          <div className="mamage_media_dhashboard_left_card_headings">
            <h4>Monthly Views</h4>
          </div>
          <div className="overflow-hidden">
            <img
              src="/images/chart.png"
              alt=""
              style={{ objectFit: "contain", height: "250px" }}
            />
          </div>
        </div>
        <div className="mamage_media_dhashboard_right">
          <div className="mamage_media_dhashboard_right_card shop-dashboard-right-card">
            <h2>Monthly Performance</h2>
            <span>April, 2022</span>
            <div className="Total-monthly-earn">
              <h3>Total Earnings</h3>
              <h2>$2800</h2>
            </div>
            <div className="mamage_media_dhashboard_pichart_list">
              <ul>
                <li>
                  <h5 className="oven-wire">Shop overview</h5>
                </li>
                {performanceData.map((item, index) => (
                  <li key={index}>
                    <div className="mamage_media_dhashboard_pichart_list_text">
                      <h5>{item.label}</h5>
                      <h6>{item.value}</h6>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.manage_shop_btns}>
        {manageShopOptions.map((item, index) => (
          <button
            onClick={() => setPage(item.value)}
            key={index}
            className={styles.manage_shop_btn}
          >
            <div className={styles.manage_shop_btn_text}>
              <span>Enoch shop</span>
              <h3>{item.name}</h3>
            </div>
            <span className="manage_edit_btn_shape">
              <img
                src="/images/manage_media_btn_shape.png"
                alt=""
                className="img-fluid"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageShopComponent;
