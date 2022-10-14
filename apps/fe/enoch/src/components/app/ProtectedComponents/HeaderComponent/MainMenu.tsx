import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { RiStackLine } from "react-icons/ri";
import HeaderStyles from "./Header.module.css";
import MainMenuButton from "./MainMenuButton";

const MainMenu = () => {
  const [menu1drop, setmenu1drop] = useState<boolean>(false);
  const [menu2drop, setmenu2drop] = useState<boolean>(false);
  const [menu3drop, setmenu3drop] = useState<boolean>(false);
  return (
    <div className={HeaderStyles.maindropdown}>
      <MainMenuButton label="Overview" icon={<AiOutlineEye size={18} />} />
      <div>
        <MainMenuButton
          icon={<BsGraphUp size={12} />}
          label="Trade"
          dropdown={!menu1drop}
          dropdownIcon={true}
          onClick={() => setmenu1drop(!menu1drop)}
        />
        {menu1drop && (
          <div>
            <MainMenuButton label="Swap" />
            <MainMenuButton label="Liquidity" />
          </div>
        )}
      </div>
      <div>
        <MainMenuButton
          label="Pools"
          icon={<RiStackLine />}
          dropdown={!menu2drop}
          dropdownIcon={true}
          onClick={() => setmenu2drop(!menu2drop)}
        />
        {menu2drop && (
          <div>
            <MainMenuButton label="Entertainment Pools" />
            <MainMenuButton label="NFT Farming Pools" />
          </div>
        )}
      </div>
      <div>
        <MainMenuButton
          label="Stacking"
          icon={<RiStackLine />}
          dropdown={!menu3drop}
          dropdownIcon={true}
          onClick={() => setmenu3drop(!menu3drop)}
        />
        {menu3drop && (
          <div>
            <MainMenuButton label="Enoch Staking" />
            <MainMenuButton label="NFT Stacking" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMenu;
