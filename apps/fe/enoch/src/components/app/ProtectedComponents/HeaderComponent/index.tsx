import Link from "next/link";
import NavButton from "./NavButton";
import { HiMenuAlt2 } from "react-icons/hi";
import { BiHomeAlt, BiMenu, BiMessageDetail } from "react-icons/bi";
import { FaEthereum, FaRegBell } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RiCloseLine, RiCustomerServiceLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import HeaderStyles from "./Header.module.css";
import SearchInput from "./SearchInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import CartDropdown from "./CartDropdown";
import MainMenu from "./MainMenu";
import MessageDropdown from "./MessagesDropdown";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import HeaderDrawer from "./HeaderDrawer/HeaderDrawer";

const menuList = {
  MESSAGE: "MESSAGE",
  CART: "CART",
  NOTIFICATION: "NOTIFICATION",
  ACCOUNT: "ACCOUNT",
  MENU: "MENU",
  PROFILE: "PROFILE",
  MOBILE_MENU: "MOBILE_MENU",
};

const Header = () => {
  const [activeDropdown, setActiveComponent] = useState("");
  const [drawerState, setdrawerState] = useState<boolean>(false);
  const impactRef = useRef<any>(null);

  useOutsideClick(impactRef, () => setActiveComponent("")); //Change my dropdown state to close when clicked outside

  const onMenuClick = useCallback(
    (menuName: string) => {
      menuName !== activeDropdown
        ? setActiveComponent(menuName)
        : setActiveComponent("");
    },
    [activeDropdown]
  );

  return (
    <header
      className={`${HeaderStyles.header}`}
      ref={(c) => !!c && (impactRef.current = c)}
    >
      <HeaderDrawer {...{ drawerState, setdrawerState }} />
      <div className={HeaderStyles.navbar}>
        <div className={HeaderStyles.navbarLeft}>
          <div
            style={{
              position: "relative",
            }}
          >
            <HiMenuAlt2
              size={23}
              color="#3F434A"
              onClick={() => onMenuClick(menuList.MENU)}
            />

            {activeDropdown === menuList.MENU && <MainMenu />}
          </div>
          <div className="header-logo">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>
        </div>
        {/* search */}
        <SearchInput />
        <div className="menuright-side">
          {/* menu buttons */}
          <div className="menu-mid-sect">
            <div
              className={
                activeDropdown === menuList.MOBILE_MENU
                  ? HeaderStyles.menuMobile
                  : HeaderStyles.menu
              }
            >
              <NavButton
                label="Home"
                icon={<BiHomeAlt size={18} color="#8A9099" />}
              />
              <div className={HeaderStyles.parentDropdown}>
                <NavButton
                  label="Messaging"
                  messagePop={true}
                  icon={<BiMessageDetail size={18} color="#8A9099" />}
                  value={5}
                  onClick={() => onMenuClick(menuList.MESSAGE)}
                />
                {activeDropdown === menuList.MESSAGE && <MessageDropdown />}
              </div>
              <NavButton
                label="ETH Mainnet"
                icon={<img src="/images/ethereum.png"/>}
                extraIcon={<img src="/images/eth-arrow-right.svg"/>}
                textColor="#7521E2"
                bgColor="rgba(117, 33, 226, .04)"
              />
              <NavButton
                label="Connect Wallet"
                bgColor="rgba(71, 76, 212, .04)"
                textColor="#474CD5"
              />
              <div className={HeaderStyles.parentDropdown}>
                <NavButton
                  label="Cart"
                  icon={<FiShoppingCart size={17} color="#8A9099" />}
                  bgColor="rgba(71, 76, 212, .04)"
                  textColor="#474CD5"
                  messagePop={true}
                  onClick={() => onMenuClick(menuList.CART)}
                />
                {activeDropdown === menuList.CART && <CartDropdown />}
              </div>
            </div>
            <div className={HeaderStyles.navbarRight}>
              <div className={HeaderStyles.navbarRightMenu}>
                <div style={{ display: "flex", marginRight: 15 }}>
                  <NavButton
                    icon={<img src="/images/headphone.svg" />}
                  />
                  <div className={HeaderStyles.parentDropdown}>
                    <NavButton
                      icon={<FaRegBell size={20} color="#3F434A" />}
                      messagePop={true}
                      value={10}
                      onClick={() => onMenuClick(menuList.NOTIFICATION)}
                    />
                    {activeDropdown === menuList.NOTIFICATION && (
                      <NotificationDropdown />
                    )}
                  </div>
                </div>
                <div
                  className={HeaderStyles.profile}
                  onClick={() => onMenuClick(menuList.PROFILE)}
                >
                  <div className={HeaderStyles.profileImg}>
                    <img
                      src="/images/userAvtar/user-Av4.png"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <TiArrowSortedDown color="#3F434A" />
                  {activeDropdown === menuList.PROFILE && <ProfileDropdown />}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  className={HeaderStyles.menuIcon}
                  onClick={() => setdrawerState(true)}
                >
                  <img src="/images/LeftSide-Menu.png" alt="" />
                </div>
                <div
                  className={HeaderStyles.mobileMenu}
                  onClick={() => onMenuClick(menuList.MOBILE_MENU)}
                >
                  {activeDropdown === menuList.MOBILE_MENU ? (
                    <RiCloseLine size={23} />
                  ) : (
                    <BiMenu size={23} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
