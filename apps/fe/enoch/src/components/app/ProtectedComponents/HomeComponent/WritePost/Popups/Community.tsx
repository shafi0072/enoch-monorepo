import React, { useCallback, useState } from "react";

interface Props {
  closeModal: () => void;
  setCommunity: React.Dispatch<React.SetStateAction<string>>;
  setActiveComponent: any;
  setAudience: any;
}

const communities = [
  {
    id: 1,
    imageURL: "/images/select-com1.png",
    title: "Ethereum Development and DApps",
    name: "dapps",
    inputId: "user-v11",
    labelFor: "user-v11",
  },
  {
    id: 2,
    imageURL: "/images/select-com2.png",
    title: "Ethereum",
    name: "ethereum",
    inputId: "user-v12",
    labelFor: "user-v12",
  },
  {
    id: 3,
    imageURL: "/images/select-com3.png",
    title: "Citizen Finance",
    name: "finance",
    inputId: "user-v13",
    labelFor: "user-v13",
  },
  {
    id: 4,
    imageURL: "/images/select-com4.png",
    title: "Spooky Swap",
    name: "spooky-swap",
    inputId: "user-v14",
    labelFor: "user-v14",
  },
];

const Community = ({
  closeModal,
  setCommunity,
  setActiveComponent,
  setAudience,
}: Props) => {
  const [selectedCommunity, setSelectedCommunity] = useState("");

  const handleChangeForRadio = (e: any): void => {
    const target = e.target;
    const name = target.name;
    setSelectedCommunity(name);
  };

  const selectCommunityHandler = () => {
    setCommunity(selectedCommunity);
    closeModal();
  };

  const goBack = useCallback(() => {
    setActiveComponent("audience");
  }, []);

  return (
    <>
      <div className="modal-content post-user-modal-content">
        <span className="close" onClick={closeModal}>
          <img
            src="/images/post-close.png"
            alt="close"
            className="img-fluid"
            data-dismiss="modal"
          />
        </span>
        <h2>Select a Community</h2>
        <p className="mb-4">
          Only visible to members of this community and will appear on community
          page
        </p>
        <div className="post-visible-modal-list">
          <ul>
            {communities.map((community) => (
              <li key={community.id}>
                <div
                  onClick={() => setAudience(community.title)}
                  className="post-visible-options-sel post-visible-right"
                >
                  <input
                    id={community.inputId}
                    name="b-plan"
                    type="radio"
                    onChange={handleChangeForRadio}
                  />
                  <label htmlFor={community.labelFor}>
                    <div className="post-visible-left align-items-center">
                      <div className="post-seclComm-img mr-2">
                        <img
                          src={community.imageURL}
                          className="img-fluid"
                          alt="pic"
                        />
                      </div>
                      <div>
                        <h3>{community.name}</h3>
                      </div>
                    </div>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="post-visible-buttn-grp">
            <span className="mr-2" onClick={goBack}>
              <a href="#!" className="btn post-visible-back-btn">
                Back
              </a>
            </span>
            <span onClick={selectCommunityHandler}>
              <a className="btn post-visible-save-btn">save</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
