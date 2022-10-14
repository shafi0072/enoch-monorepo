import React from "react";
import DecentralizedWalletItems from "./DecentralizedWalletItems";
import EnochWallet from "./EnochWallet";
import ListItemComponent from "./ListItemComponent";

const Pages: any = {
  LIST_ITEM: ListItemComponent,
  DECENTRALISED_WALLET: DecentralizedWalletItems,
  ENOCH_WALLET: EnochWallet,
};

const ListItem = () => {
  const [page, setPage] = React.useState("LIST_ITEM");

  const PageComponent = Pages[page];
  return <PageComponent {...{ setPage }} />;
};

export default ListItem;
