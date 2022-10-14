import { join } from "path";
import React from "react";

const CommunitiesSuggestionCard: React.FC<any> = ({
  community,
  onClickJoinButton,
}) => {
  const [isJoined, setIsJoined] = React.useState(community?.isJoined || false);
  return (
    <>
      <li key={community?._id}>
        <div className="business-communities-left">
          <span className="business-communities-topic business-orange-bg">
            AD
          </span>
          <div className="business-communities-user-right">
            <h3>
              {community?.communityName}
              <span>{community.followersCount} members</span>
            </h3>
            <p>{community?.communityDescription}</p>
          </div>
        </div>
        <div className={"business-communities-right "}>
          <button
            onClick={() => {
              onClickJoinButton(community?._id, isJoined);
              setIsJoined((prev: boolean) => !prev);
            }}
            className={`community-joind-btn  ${isJoined && "join-active"}`}
          >
            {isJoined ? "JOINED" : "JOIN"}
          </button>
        </div>
      </li>
    </>
  );
};

export default CommunitiesSuggestionCard;
