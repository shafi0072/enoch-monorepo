import React from "react";
import { UserType } from "./index";

interface Props {
  user: UserType;
}

const UserCard = ({
  user: { avater, firstName, lastName, username, _id },
}: Props) => (
  <div className="You-might-like-follow-list">
    <ul>
      <li>
        <div className="You-might-like-follow-dp">
          <img
            src="/images/business-user1.png"
            alt="image"
            className="img-fluid"
          />
        </div>
        <div className="You-might-like-follow-text-sect">
          <div className="You-might-like-follow-text">
            <div className="You-might-like-follow-username">
              <h5>
                {firstName} {lastName}
              </h5>
            </div>
            <p>
              Entrepreneur always eager to learn more and contribute as much as
              possible into making a better world. <a href="#!">#crypto</a>{" "}
              beginner & <a href="#!">#nft</a> creator <a href="#!">#startup</a>{" "}
              enthusiast
            </p>
          </div>
          <div className="You-might-like-follow-btn ml-2">
            <button>Follow</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
);
export default UserCard;
