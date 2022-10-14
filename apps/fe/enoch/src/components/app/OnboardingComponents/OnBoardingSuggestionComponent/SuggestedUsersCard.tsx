import React from "react";

function SuggestedUsersCard({
  user,
  onClickFollowButton,
  removeFromSuggestedList,
}: any) {
  const [isFollowing, setIsFollowing] = React.useState(
    user?.isFollowing || false
  );
  return (
    <li key={user._id}>
      <span
        onClick={() => removeFromSuggestedList(user._id)}
        className="bussinss-close"
      >
        <img
          src="/images/businessClose.png"
          className="img-fluid"
          alt="close"
        />
      </span>
      <div className="suggest-user-follow_avex">
        <div className="suggest-user-img_avex">
          <img
            src="/images/alien_onboard.png"
            className="img-fluid"
            alt="user"
          />
          <span className="tck_wve_circle">
            <img
              src="/images/alien_onboard.png"
              alt=""
              className="wave_circle"
            />
            <img
              src="/images/tck_nft.svg"
              alt="tck_nft"
              className="tick_nft55"
            />
          </span>
        </div>
        <h3>@{user?.username}</h3>
        <h4>{user?.country}</h4>
        <p>{user?.bio}</p>
        <div className="business-followbtn-block ">
          <button
            onClick={() => {
              onClickFollowButton(isFollowing, user._id);
              setIsFollowing((prev: boolean) => !prev);
            }}
            className={`business-follow-btn_avex ${
              isFollowing && "btn-success"
            }`}
          >
            {isFollowing && (
              <img
                src="/images/businessCheck.png"
                className="img-fluid p-2"
                alt="icon"
              />
            )}
            {!isFollowing ? "+ Follow" : "Following"}
          </button>
        </div>
      </div>
    </li>
  );
}

export default SuggestedUsersCard;
