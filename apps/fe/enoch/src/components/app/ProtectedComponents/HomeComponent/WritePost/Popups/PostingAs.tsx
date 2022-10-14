import React, { useCallback } from "react";

interface Props {
  closeModal: () => void;
  setPostingAs: any;
}

const postingUsers = [
  { id: 1, name: "Hulk66", imageURL: "/images/RobertRosePic-event.png" },
  { id: 2, name: "88mh", imageURL: "/images/community-icon4.png" },
];

const PostingAs = ({ closeModal, setPostingAs }: Props) => {
  const handlePostingUser = useCallback((val: string) => {
    setPostingAs(val);
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
      <h2>Posting as a</h2>
      <div className="post-user-modal-list">
        <ul>
          {postingUsers.map((user) => (
            <li key={user.id} onClick={() => handlePostingUser(user.name)}>
              <span>
                <img src={user.imageURL} className="img-fluid" alt="pic" />
              </span>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostingAs;
