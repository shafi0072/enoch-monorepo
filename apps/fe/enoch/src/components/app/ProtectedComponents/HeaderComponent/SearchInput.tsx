import { FC } from "react";
import HeaderStyles from "./Header.module.css";
import { FiSearch } from "react-icons/fi";

const SearchInput: FC = () => {
  return (
    <div className={HeaderStyles.searchInputBox}>
      <FiSearch size={18} color="#8A9099" />
      <input className={HeaderStyles.searchInput} placeholder="Search Enoch" />
    </div>
  );
};

export default SearchInput;
