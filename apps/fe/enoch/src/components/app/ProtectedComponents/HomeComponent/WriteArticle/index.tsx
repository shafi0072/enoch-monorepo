import React, { useCallback, useState } from "react";
import ContentContainer from "./ContentContainer";
import TabContainer from "./TabContainer";

const actions = ["Action", "Another action", "Something else here"];

const WriteArticleWrapper = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");
  const [isTabs, setIsTabs] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [dropdownText, setDropdownText] = useState<string>("Publishing menu");

  const handleActiveComponent = useCallback((val: string) => {
    setActiveComponent(val);
  }, []);
  const showTabs = useCallback(() => {
    setIsTabs((prev) => !prev);
  }, []);

  const closeActiveComponent = useCallback(() => {
    setActiveComponent("");
  }, []);

  const handleDropdownText = (val: string) => {
    setDropdownText(val);
    toggleDropdown();
  };
  const toggleDropdown = useCallback(() => {
    setDropdown((prev) => !prev);
  }, []);

  return (
    <div className="row">
      <div className="Write_Article-top-ber-sect">
        <div className="Write_Article-top-ber-content ezl-dashboard-container">
          <div className="Publishing-menu-dropdown-sect">
            <div className="Publishing-menu-dropdown-box">
              <button
                onClick={toggleDropdown}
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
              >
                {dropdownText}
                <span>
                  <img
                    src="/images/crop-Arrow-Down.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
              </button>
              {dropdown && (
                <div className="dropdown-menu d-block top-110px">
                  {actions.map((item, index) => (
                    <a
                      key={index}
                      onClick={() => handleDropdownText(item)}
                      className="dropdown-item"
                      href="#"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="Write_Article-top-ber-icon-and-btn-list">
            <div className="Write_Article-top-ber-icon-list">
              <ul>
                <li>
                  <img
                    src="/images/bold.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </li>
                <li>
                  <img
                    src="/images/bold.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </li>
                <li>
                  <img
                    src="/images/bold.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </li>
                <li>
                  <img
                    src="/images/bold.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </li>
              </ul>
            </div>
            <div className="Write_Article-top-ber-btn-sect">
              <button>Publish</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Write_Article-body-sect">
        <h2>Headline</h2>
        <div className="No-cover-image-sect">
          <div className="No-cover-image-icon">
            <img src="/images/Camera.svg" alt="icon" className="img-fluid" />
          </div>
          <h3>No cover image uploaded</h3>
          <p>
            Consider adding a cover image that complements your article to
            attract more readers. We recommend uploading an image with a pixel
            size of 1320 x 742
          </p>
        </div>
        {isTabs ? (
          <div className="add-attachment-tab-sect" style={{ display: "block" }}>
            {activeComponent ? (
              <ContentContainer
                {...{ activeComponent, closeActiveComponent }}
              />
            ) : (
              <TabContainer {...{ handleActiveComponent, showTabs }} />
            )}
          </div>
        ) : (
          <div className="add-attachment-btn-sect">
            <button onClick={showTabs}>
              <img
                src="/images/add-attachment-btn.svg"
                alt="icon"
                className="img-fluid"
              />
            </button>
            <h4>Write here. Add images or video for visual impact.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticleWrapper;
