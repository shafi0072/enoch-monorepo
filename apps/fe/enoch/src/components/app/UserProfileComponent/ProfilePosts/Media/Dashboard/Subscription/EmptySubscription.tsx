import React from "react";

interface Props {
  message: string;
}
const EmptySubscription = ({ message }: Props) => {
  return (
    <div id="mediaSubscriber" className="tabcontent_subscription d-block">
      <div className="no-subs-Field">
        <img src="/images/no-sub-down.png" alt="" />
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default EmptySubscription;
