import React from "react";
import mockData from "./mockData";
import ShopItemProvider from "./ShopItemContext";
import ShopItemGrid from "./ShopItemGrid";

const EditShopItems = ({ seteditShopPage }: any) => {
  const [items, setitems] = React.useState(mockData);
  return (
    <div className="manage-items-Added-main bg-white">
      <div className="items-content-header">
        <h3>My Item</h3>
        <div className="pre-sale">
          <div className="tooltip-onsale">
            <button className="sales-put-on">Put on Sale</button>
            <div className="tooltip-sale-content tooltip-sale-pose">
              Pinned max. 4 itms to list on the top of the shop
            </div>
          </div>
          <button className="add-items-surplus">ADD ITEM</button>
        </div>
      </div>
      <div className="main-table-avoid-section">
        <div className="My-table-main">
          <ShopItemProvider>
            <ShopItemGrid />
          </ShopItemProvider>
        </div>
      </div>
    </div>
  );
};

export default EditShopItems;
