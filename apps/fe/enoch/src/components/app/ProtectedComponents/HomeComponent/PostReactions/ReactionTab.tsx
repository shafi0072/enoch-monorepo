import React from "react";

interface Props {
  handleActiveComponent: (str: string) => void;
  activeComponent: string;
}

const reactionTabs = [
  {
    id: 1,
    title: "like",
    imageURL: "/images/reaction1.png",
    data: "10k",
  },
  {
    id: 2,
    title: "love",
    imageURL: "/images/reaction2.png",
    data: "2k",
  },
  {
    id: 3,
    title: "support",
    imageURL: "/images/reaction3.png",
    data: "1k",
  },
  {
    id: 4,
    title: "clap",
    imageURL: "/images/reaction4.png",
    data: "800",
  },
  {
    id: 5,
    title: "knowladge",
    imageURL: "/images/reaction5.png",
    data: "1.2k",
  },
  {
    id: 6,
    title: "wow",
    imageURL: "/images/reaction6.png",
    data: "422",
  },
];
const ReactionTab = ({ handleActiveComponent, activeComponent }: Props) => {
  return (
    <div className="user-reaction-modal-block-list">
      <ul>
        <li>15,422</li>
        {reactionTabs.map((reaction) => (
          <li
            key={reaction.id}
            onClick={() => handleActiveComponent(reaction.title)}
            className={`reaction_tablinks ${
              activeComponent === reaction.title && "active"
            }`}
          >
            <span>
              <img src={reaction.imageURL} alt="icon" className="img-fluid" />
            </span>
            {reaction.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactionTab;
