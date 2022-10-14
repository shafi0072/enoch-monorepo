import React from "react";
import Banner from "./Banner";
import EditShopItems from "./EditShopItems";

const EditShopPages: any = {
  BANNER: Banner,
  SHOP_ITEMS: EditShopItems,
};

const EditShop = () => {
  const [editShopPage, seteditShopPage] = React.useState("BANNER");

  const EditPageComponent = EditShopPages[editShopPage];
  return (
    <div>
      <EditPageComponent {...{ seteditShopPage }} />
    </div>
  );
};

export default EditShop;
