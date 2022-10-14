import * as React from "react";
import mockData from "./mockData";

export const ShopItemContext = React.createContext<any | null>(null);

const ShopItemProvider = ({ children }: any) => {
  const [items, setItems] = React.useState(mockData);

  return (
    <ShopItemContext.Provider value={{ items, setItems }}>
      {children}
    </ShopItemContext.Provider>
  );
};

export default ShopItemProvider;
