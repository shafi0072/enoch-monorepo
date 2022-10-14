import React, { Dispatch, SetStateAction } from "react";
import { MdOutlineClose } from "react-icons/md";
import DrawerStyles from "./Drawer.module.css";
import DrawerButton from "./DrawerButton";
import DrawerDescriptionButton from "./DrawerDescriptionButton";
import DrawerSearchInput from "./DrawerSearchInput";

interface HeaderDrawerProps {
  drawerState: boolean;
  setdrawerState: Dispatch<SetStateAction<boolean>>;
}

const HeaderDrawer = ({ drawerState, setdrawerState }: HeaderDrawerProps) => {
  return (
    <div
      className={drawerState ? DrawerStyles.drawer : DrawerStyles.drawerNone}
    >
      <div
        className={DrawerStyles.drawerClose}
        onClick={() => setdrawerState(false)}
      >
        <MdOutlineClose size={26} color="gray" />
      </div>
      <div className={DrawerStyles.drawerOpen}>
        {/* left */}
        <div className={DrawerStyles.drawerLeft}>
          <DrawerSearchInput />
          <div className={DrawerStyles.drawerLeftMenu}>
            {/* left */}
            <div>
              <div>
                <h3 className={DrawerStyles.drawerHead}>Personal</h3>
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon1.png"
                  title="Earn"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon2.png"
                  title="Ranking"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon3.png"
                  title="Billing"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon4.png"
                  title="Affiliate"
                  description="Organise or find events and other things to do online and nearby"
                />
              </div>
              <div>
                <h3 className={DrawerStyles.drawerHead}>Entertainment</h3>
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon11.png"
                  title="Popular"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon12.png"
                  title="Slots"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon13.png"
                  title="Live Casino"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon14.png"
                  title="Lottery"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon15.png"
                  title="Roulette"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon16.png"
                  title="Promotions"
                  description="Organise or find events and other things to do online and nearby"
                />
              </div>
              <div>
                <h3 className={DrawerStyles.drawerHead}>Advertising</h3>
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon19.png"
                  title="Ad Manager"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon20.png"
                  title="Enoch Ad"
                  description="Organise or find events and other things to do online and nearby"
                />
              </div>
              <div className={DrawerStyles.extraPadding}>
                <h3 className={DrawerStyles.drawerHead}>User Settings</h3>
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon26.png"
                  title="Your Profile"
                  description="Organise or find events and other things to do online and nearby"
                />
                <DrawerDescriptionButton
                  image="/images/DrawerIcons/menu-icon27.png"
                  title="Your Account"
                  description="Organise or find events and other things to do online and nearby"
                />
              </div>
            </div>
            {/* right */}
            <div>
              <div>
                <div>
                  <h3 className={DrawerStyles.drawerHead}>Social</h3>
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon5.png"
                    title="My Network"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon6.png"
                    title="Comminities"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon7.png"
                    title="Artist Channel"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon8.png"
                    title="Company pages"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon9.png"
                    title="Events"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon10.png"
                    title="News Feeds"
                    description="Organise or find events and other things to do online and nearby"
                  />
                </div>
                <div>
                  <h3 className={DrawerStyles.drawerHead}>Shopping</h3>
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon17.png"
                    title="Digital Art Marketplace"
                    description="Organise or find events and other things to do online and nearby"
                  />
                </div>
                <div>
                  <h3 className={DrawerStyles.drawerHead}>Jobs</h3>
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon18.png"
                    title="Remote workhub"
                    description="Organise or find events and other things to do online and nearby"
                  />
                </div>
                <div>
                  <h3 className={DrawerStyles.drawerHead}>Developer</h3>
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon21.png"
                    title="Develop"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon22.png"
                    title="Grow"
                    description="Organise or find events and other things to do online and nearby"
                  />
                  <DrawerDescriptionButton
                    image="/images/DrawerIcons/menu-icon23.png"
                    title="Earn"
                    description="Organise or find events and other things to do online and nearby"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className={DrawerStyles.drawerRight}>
          <h3>Create</h3>
          <div>
            <DrawerButton
              image="/images/DrawerIcons/creat-icon1.png"
              label="Post"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon2.png"
              label="Communities"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon3.png"
              label="Artist Channel"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon4.png"
              label="Group"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon5.png"
              label="Event"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon6.png"
              label="Company page"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon7.png"
              label="Job"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon8.png"
              label="Digital Art"
            />
            <DrawerButton
              image="/images/DrawerIcons/creat-icon9.png"
              label="AD"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDrawer;
