import React, { useCallback, useState } from "react";
import { number, string } from "yup/lib/locale";

interface Props {
  toggleModal: () => void;
  handleActiveComponent: (val: string) => void;
}

const recipients = [
  {
    id: 1,
    name: "@NFT_ CreatorXO",
  },
  {
    id: 2,
    name: "@NFT_XOX",
  },
  {
    id: 3,
    name: "@NFT_ Radius",
  },
  {
    id: 4,
    name: "@Blah_ CreatorXO",
  },
  {
    id: 5,
    name: "@Hello_world",
  },
  {
    id: 6,
    name: "@Robert_",
  },
];

const SelectRecipientPopup = ({
  toggleModal,
  handleActiveComponent,
}: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const selectUser = useCallback(
    (user: any) => {
      setSelectedUsers((prev) => [...prev, user]);
    },
    [selectedUsers]
  );

  const removeUser = useCallback(
    (id: number) => {
      const newValues = selectedUsers.filter((user) => user.id !== id);
      setSelectedUsers(newValues);
    },
    [selectedUsers]
  );

  return (
    <div className="max-width-620">
      <div className="Celebrate-Modal-header">
        <h2 className="pb-0">Select recipient</h2>
        <span className="close" onClick={toggleModal}>
          <img
            src="/images/post-close.png"
            alt="close"
            className="img-fluid"
            data-dismiss="modal"
          />
        </span>
      </div>
      <div className="Celebrate-modal-body">
        <div className="Select-recipient-content">
          <div className="Select-recipient-search-box">
            <span>
              <img
                src="/images/celebrate-search.png"
                alt="icon"
                className="img-fluid"
              />
            </span>
            <div className="select-recipient-sect flex-wrap">
              {selectedUsers.map((selectedUser) => (
                <div key={selectedUser.id} className="select-recipient p-1 m-1">
                  <h3 className="fs-12">{selectedUser.name}</h3>
                  <div className="select-recipient-cancel-btn">
                    <img
                      width="10px"
                      onClick={() => removeUser(selectedUser.id)}
                      src="/images/select-recepient-Cross.png"
                      alt="icon"
                      className="img-fluid cursor-pointer"
                    />
                  </div>
                </div>
              ))}
              <input
                value={inputValue}
                type="text"
                placeholder="Search for people"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          <div className="Select-recipient-list">
            <ul>
              {recipients
                .filter((el) =>
                  !el?.name
                    ? el
                    : el.name
                        .toLocaleLowerCase()
                        .includes(inputValue.toLocaleLowerCase())
                )
                .map((recipient) => {
                  return (
                    <li key={recipient.id}>
                      <div className="Select-recipient-left-content">
                        <div className="Select-recipient-dp">
                          <img
                            src="/images/1ch.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="Select-recipient-text">
                          <h3>{recipient.name}</h3>
                          <p>
                            I am a Japanese NFT artist. I draw art of nature and
                            animals. I want to make the world Smiling face with
                            sunglasses æ—¥æœ¬ã®NFTã‚’ä¸–ç•Œã¸ã€‚
                            <a href="#">#NFT</a> <a href="#">#nftart</a>{" "}
                            <a href="#">#NFTcollection</a>
                          </p>
                        </div>
                      </div>
                      <div className="Select-recipient-checkbox">
                        {selectedUsers.includes(recipient) ? (
                          <span
                            className="activeCheckmark"
                            onClick={() => removeUser(recipient.id)}
                          >
                            <div className="checkmark-tick" />
                          </span>
                        ) : (
                          <span
                            onClick={() => selectUser(recipient)}
                            className="inactiveCheckmark"
                          ></span>
                        )}
                        <label className="container"></label>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="Celebrate-Modal-footer">
        <button
          onClick={() => handleActiveComponent("select-image")}
          className="back-btn"
        >
          Back
        </button>
        <button
          className="next-btn"
          onClick={() => handleActiveComponent("post-share")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectRecipientPopup;
