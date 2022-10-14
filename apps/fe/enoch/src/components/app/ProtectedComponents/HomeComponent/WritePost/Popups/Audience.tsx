import React, { useCallback } from "react";

interface Props {
  openCommunity: () => void;
  closeModal: () => void;
  setAudience: any;
  setAudienceValue: any
}

const audiences = [
  {
    id: 1,
    title: "Anyone",
    subTitle: "Anyone on or off Enoch",
    value: "PUBLIC"
  },
  {
    id: 2,
    title: "Anyone + Twitter",
    subTitle: "Anyone on or off Linkdien; post to Twitter",
    value: "TWITTER"
  },
  {
    id: 3,
    title: "Followers Only",
    subTitle: "Followers on Enoch",
    value: "CONNECTION_ONLY"
  },
];

const Audience = ({ openCommunity, closeModal, setAudience, setAudienceValue }: Props) => {
  const handleAudience = useCallback((val: any) => {
    setAudience(val.title);
    setAudienceValue(val.value)
    closeModal();
  }, []);
  return (
    <div className="modal-content post-user-modal-content">
      <span className="close" onClick={closeModal}>
        <img
          src="/images/post-close.png"
          alt="close"
          className="img-fluid"
          data-dismiss="modal"
        />
      </span>
      <h2>Who can see your post?</h2>
      <p className="mb-4">
        Your post will be visible on feed, on your profile and in search results
      </p>
      <div className="post-visible-modal-list">
        <ul>
          {audiences.map((audience) => (
            <li
              key={audience.id}
              onClick={() => handleAudience(audience)}
            >
              <div className="post-visible-options-sel post-visible-right">
                <input id="user-v21" name="b-plan" type="radio" />
                <label htmlFor="user-v21">
                  <div className="post-visible-left">
                    <div className="mr-2">
                      <img
                        src="/images/Globe2.png"
                        className="img-fluid"
                        alt="pic"
                      />
                    </div>
                    <div>
                      <h3>{audience.title}</h3>
                      <p>{audience.subTitle}</p>
                    </div>
                  </div>
                </label>
              </div>
            </li>
          ))}

          <li>
            <div className="post-visible-options-sel post-visible-right">
              <input id="user-v24" name="b-plan" type="radio" />
              <label htmlFor="user-v24">
                <div className="post-visible-left">
                  <div className="mr-2">
                    <img
                      src="/images/who-coomunity.png"
                      className="img-fluid"
                      alt="pic"
                    />
                  </div>
                  <div>
                    <h3 onClick={openCommunity} id="post-select-btn">
                      Community <span>{">"}</span>
                    </h3>
                    <p>Select a Community youâ€™re in</p>
                  </div>
                </div>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Audience;
