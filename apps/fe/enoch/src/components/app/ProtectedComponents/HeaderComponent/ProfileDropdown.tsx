import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Switch from "react-switch";
import { Button } from "../../../core/components/Button";
import DropDownStyles from "./Dropdown.module.css";

const ProfileDropdown: FC = () => {
  const [onlineStatus, setonlineStatus] = useState<boolean>(true);

  const router = useRouter();

  const onLogout = useCallback(() =>{
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      router.push('/auth/login')
    }
  }, []);



  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={DropDownStyles.dropProfile}
    >
      <div>
        <div className={DropDownStyles.dropButton}>
          <div>
            <FaRegUserCircle size={20} color="#B8BCC1" />
            <span className="font-weight-bold pl-1">@HULK66</span>
          </div>
          <div className={DropDownStyles.changeBtn}>Change</div>
        </div>
        <div className={DropDownStyles.btnGroup}>
          <div className={DropDownStyles.dropButton}>
            <div>Online status</div>
            <Switch
              onChange={() => setonlineStatus(!onlineStatus)}
              checked={onlineStatus}
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={18}
              width={48}
              onColor="#9757E9"
            />
          </div>
          <Button
            text="Become Creator"
            type="button"
            className={DropDownStyles.dropButton}
          />
          <Button
            text="Your public profile"
            type="button"
            className={DropDownStyles.dropButton}
            textColor="#7521E2"
          />
        </div>
        <div className={DropDownStyles.btnGroup}>
          <Button
            text="Setting"
            type="button"
            className={DropDownStyles.dropButton}
          />
          <Button
            text="Help Center"
            type="button"
            className={DropDownStyles.dropButton}
          />
          <Button
            text="Upgrade to Premium"
            type="button"
            className={DropDownStyles.dropButton}
            textColor="#FFA02F"
          />
        </div>
        <div className={DropDownStyles.btnGroup}>
          <div className={DropDownStyles.dropButton}>
            <div>Wallet</div>
            <div className={DropDownStyles.walletBalance}>$400</div>
          </div>
        </div>
        <div className={DropDownStyles.btnGroup}>
          <Button
            text="Logout"
            type="button"
            className={DropDownStyles.dropButton}
            textColor="#F25047"
            handler={onLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
