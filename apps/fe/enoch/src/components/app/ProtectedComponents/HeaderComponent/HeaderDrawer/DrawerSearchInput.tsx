import React from "react";
import { FiSearch } from "react-icons/fi";
import SearchStyles from "./Drawer.module.css";

const DrawerSearchInput = () => {
  return (
    <div className={SearchStyles.search}>
      <FiSearch size={25} />
      <input
        className={SearchStyles.searchInput}
        placeholder="Search menu..."
      />
    </div>
  );
};

export default DrawerSearchInput;
