import React, { useCallback, useMemo, useState } from "react";
import ManageMedia from "./ManageMedia";
import MyMedia from "./MyMedia";
import Upload from "./Upload";
import Subscription from "./Subscription";
import Analytics from "./Analytics";
import SubscriberReward from "./SubscriberReward";
import PayPerView from "./PayPerView";
import { mediaDashboardTabTypes } from "../../../../../../constants/mediaDashboard-enums";
import { DrawerWrapper } from "../../../../../core/components/DrawerWrapper";

interface Props {
  isDashboard: boolean;
  setIsDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs: any = {
  [mediaDashboardTabTypes.MANAGE_MEDIA]: ManageMedia,
  [mediaDashboardTabTypes.MY_MEDIA]: MyMedia,
  [mediaDashboardTabTypes.UPLOAD]: Upload,
  [mediaDashboardTabTypes.PAY_PER_VIEW]: PayPerView,
  [mediaDashboardTabTypes.SUBSCRIPTION]: Subscription,
  [mediaDashboardTabTypes.SUBSCRIBER_REWARD]: SubscriberReward,
  [mediaDashboardTabTypes.ANALYTICS]: Analytics,
};
const Dashboard = ({ isDashboard, setIsDashboard }: Props) => {
  const [activeBoard, setActiveBoard] = useState<string>(
    mediaDashboardTabTypes.MANAGE_MEDIA
  );
  const handleActiveBoard = useCallback((board: string) => {
    setActiveBoard(board);
  }, []);

  const ActiveComponent = useMemo(() => Tabs[activeBoard], [activeBoard]);
  return (
    <>
      <DrawerWrapper
        isOpen={isDashboard}
        onClose={() => setIsDashboard(false)}
        setPage={setActiveBoard}
        activePage={activeBoard}
        indexTab={mediaDashboardTabTypes.MANAGE_MEDIA}
      >
        <ActiveComponent {...{ handleActiveBoard }} />
      </DrawerWrapper>
    </>
  );
};

export default Dashboard;
