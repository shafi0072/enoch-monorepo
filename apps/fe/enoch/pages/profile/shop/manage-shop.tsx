import React from "react";
import ManageShopComponent from "../../../src/components/app/UserProfileComponent/Shop/ManageShop/ManageShopComponent";

const pageTypes = {
  MANAGE_SHOP: "manageShop",
  EDIT_SHOP: "editShop",
  LIST_ITEMS: "listItems",
  CREATE_COUPON: "createCoupon",
  CREATE_SALE: "createSale",
  CREATE_OFFER: "createOffer",
  ANALYTICS: "analytics",
};

const ManageShop: React.FC = () => {
  const [page, setPage] = React.useState(pageTypes.MANAGE_SHOP);
  return <ManageShopComponent setPage={setPage} />;
};

export default ManageShop;
