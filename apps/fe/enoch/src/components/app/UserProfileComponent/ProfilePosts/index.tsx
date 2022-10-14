import React, { useCallback, useState } from "react";
import { IoEye } from "react-icons/io5";
import { userProfileTimelineTabEnums } from "../../../../constants/user-profile-enums";
import { DrawerWrapper } from "../../../core/components/DrawerWrapper";
import CreateCoupon from "../Shop/ManageShop/CreateCoupon";
import CreateOffer from "../Shop/ManageShop/CreateOffer";
import EditShop from "../Shop/ManageShop/EditShop";
import ListItem from "../Shop/ManageShop/ListItems";
import ManageShopComponent from "../Shop/ManageShop/ManageShopComponent";
import MediaSubscription from "./MediaSubscription";
import Tabs from "./Tabs";
import TabsBody from "./TabsBody";

const tabsName = [
  {
    id: 1,
    value: "post",
    text: "Post",
  },
  {
    id: 2,
    value: "postandreplies",
    text: "Post & Replies",
  },
  {
    id: 3,
    value: "media",
    text: "Media",
  },
  {
    id: 4,
    value: "shop",
    text: "Shop",
  },
];

const tabTypes = {
  POST: "post",
  POST_AND_REPLIES: "postandreplies",
  MEDIA: "media",
  SHOP: "shop",
};

export const Pages: any = {
  MANAGE_SHOP: ManageShopComponent,
  EDIT_SHOP: EditShop,
  LIST_ITEMS: ListItem,
  CREATE_COUPON: CreateCoupon,
  CREATE_SALE: () => <div>Create Sale</div>,
  CREATE_OFFER: CreateOffer,
  ANALYTICS: () => <div>Analytics</div>,
};

interface Props {
  isOwnProfile: boolean;
}
const ProfilePosts = ({ isOwnProfile }: Props) => {
  const [activeTab, setActiveTab] = useState(tabTypes.POST);
  const [isManage, setIsManage] = useState(false);
  const [isOtherPeople, setIsOtherPeople] = useState(false);
  const [isMediaSubscription, setIsMediaSubscription] = useState(false);
  const [manageShopDrawer, setManageShopDrawer] = useState<boolean>(false);
  const [page, setPage] = useState<string>("MANAGE_SHOP");
  const [isDashboard, setIsDashboard] = useState<boolean>(false);

  const PageComponent = Pages[page];

  const handleActiveTab = useCallback((val: string) => {
    setIsManage(val === tabTypes.MEDIA);
    setActiveTab(val);
  }, []);

  const openMediaDrawer = useCallback(() => {
    setIsDashboard(true);
  }, []);

  const openSubscriptionDrawer = useCallback(() => {
    setIsMediaSubscription(true);
  }, []);

  return (
    <>
      {isOwnProfile && isManage && !isOtherPeople && (
        <div className="media_upload_avex_btn">
          <button
            onClick={openMediaDrawer}
            id="mange_hide1"
            className="media_upload_nft_avex"
          >
            Manage media
          </button>
        </div>
      )}

      {isOwnProfile && isManage && isOtherPeople && (
        <div className=" media_upload_avex_btn">
          <button
            onClick={openSubscriptionDrawer}
            className="subscribe_btn d-block"
          >
            Subscribe
          </button>
        </div>
      )}

      <div className="dApp-Posts-tabs">
        {activeTab === userProfileTimelineTabEnums.SHOP && isOwnProfile && (
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={() => setManageShopDrawer(true)}
              className="managable-shopi font-poppins"
            >
              Manage Shop
            </button>
            <button className="numbers-added-to-cart border-0 font-poppins">
              <span>1</span>
              <IoEye size={23} color="white" />
            </button>
          </div>
        )}

        <DrawerWrapper
          isOpen={manageShopDrawer}
          onClose={() => setManageShopDrawer(false)}
          setPage={setPage}
          activePage={page}
          indexTab="MANAGE_SHOP"
        >
          <PageComponent {...{ setPage }} />
        </DrawerWrapper>

        <MediaSubscription
          {...{ isMediaSubscription, setIsMediaSubscription }}
        />

        <Tabs {...{ tabsName, activeTab, handleActiveTab }} />
        <TabsBody {...{ activeTab, isDashboard, setIsDashboard }} />
      </div>
    </>
  );
};

export default ProfilePosts;
