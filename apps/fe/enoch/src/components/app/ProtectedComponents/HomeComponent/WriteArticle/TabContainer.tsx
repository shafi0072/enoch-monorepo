import React from "react";

interface Props {
  showTabs: () => void;
  handleActiveComponent: (val: string) => void;
}

const items = [
  {
    id: 1,
    imgURL: "/images/insertimg.svg",
    classname: "add_attachment_tablinks add-img-tablinks",
    text: "Image",
    value: "IMAGE"
  },
  {
    id: 2,
    imgURL: "/images/insertVideo-2.svg",
    classname: "add_attachment_tablinks add-img-tablinks",
    text: "Video",
    value: "VIDEO"
  },
  {
    id: 3,
    imgURL: "/images/slide-icon.svg",
    classname: "add_attachment_tablinks add-img-tablinks",
    text: "Slides",
    value: "SLIDES"
  },
  {
    id: 4,
    imgURL: "/images/insertLink-2.svg",
    classname: "add_attachment_tablinks add-img-tablinks",
    text: "Links",
    value: "LINKS"
  },
  {
    id: 5,
    imgURL: "/images/script-icon.svg",
    classname: "add_attachment_tablinks add-img-tablinks",
    text: "Snippet",
    value: "SNIPPET"
  }
];

const TabContainer = ({ showTabs, handleActiveComponent }: Props) => {
  return (
    <div className="add-attachment-tab-content">
      <span onClick={showTabs} className="add-attachment-tab-content-close">
        <img src="/images/Cross.svg" alt="icon" className="img-fluid" />
      </span>
      <div className="add_attachment_tab_btns">
        {items.map(item => (
          <button
            key={item.id}
            className={item.classname}
            onClick={() => {
              handleActiveComponent(item.value);
            }}
          >
            <span>
              <img src={item.imgURL} alt="icon" className="img-fluid" />
            </span>
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabContainer;
