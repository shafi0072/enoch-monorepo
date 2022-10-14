import React, { useCallback, useMemo, useState } from "react";
import { Modal } from "../../../../core";
import { DrawerWrapper } from "../../../../core/components/DrawerWrapper";
import Dashboard from "./Dashboard";
import FreeMedia from "./FreeMedia";
import Content from "./ModalContent";
import PremiumMedia from "./PremiumMedia";
import Tabs from "./Tabs";

export const thumbnails = [
  {
    id: 1,
    rating: "11.4K",
    image: "/images/video_list_bg1.png",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
    isPrivate: false,
  },
  {
    id: 4,
    rating: "11.4K",
    image: "/images/fly_men.png",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
    isPrivate: true,
  },
  {
    id: 2,
    rating: "7.6K",
    image: "/images/fly_men.png",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
    isPrivate: true,
  },
  {
    id: 3,
    rating: "15.4K",
    image: "/images/fly_men.png",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
    isPrivate: false,
  },
  {
    id: 5,
    rating: "7.6K",
    image: "/images/fly_men.png",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
    isPrivate: false,
  },
];

const tabsName = [
  {
    id: 1,
    value: "free",
    text: "Free",
    image: "/images/list_vdeos.png",
  },
  {
    id: 2,
    value: "premium",
    text: "Premium",
    image: "/images/premium.svg",
  },
];

const tabTypes = {
  FREE: "free",
  PREMIUM: "premium",
};

interface Props {
  isDashboard: boolean;
  toggleDashboard(): void;
  setIsDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tab: any = {
  [tabTypes.FREE]: FreeMedia,
  [tabTypes.PREMIUM]: PremiumMedia,
};

const Media = ({ isDashboard, setIsDashboard }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(tabTypes.FREE);
  const [activeVideoURL, setActiveVideoURL] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleActiveTab = useCallback((val: string) => {
    setActiveTab(val);
  }, []);

  const handleModal = useCallback(() => {
    setIsModal((prev) => !prev);
  }, []);

  const playVideo = useCallback((url: string) => {
    setActiveVideoURL(url);
    handleModal();
  }, []);

  const ActiveComponent = useMemo(() => Tab[activeTab], [activeTab]);

  return (
    <>
      <div id="Media_tab" className="tabcontent bg-white d-block">
        <Tabs {...{ activeTab, handleActiveTab, tabsName }} />
        <ActiveComponent {...{ playVideo }} />
        <Modal isOpen={isModal}>
          <Content {...{ handleModal, activeVideoURL, setActiveVideoURL }} />
        </Modal>

        <Dashboard {...{ isDashboard, setIsDashboard }} />
      </div>
    </>
  );
};

export default Media;
