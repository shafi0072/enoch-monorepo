import React, { useState } from "react";

interface Props { }
const TagImage = ({ }: Props) => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  return (
    <div className="Click-anywhere-to-Tag-sect d-block">
      <div className="Click-anywhere-to-Tag-sect-content">
        <a onClick={() => setIsDropdown(true)} href="#">
          Click anywhere to Tag
        </a>
        {isDropdown && (
          <div className="Click-anywhere-to-Tag-list-dropdown d-block">
            <div className="Click-anywhere-to-Tag-list-search">
              <input type="text" />
            </div>
            <ul className="Click-anywhere-to-Tag-list">
              <li>
                <span>
                  <img
                    src="images/creator-img5.png"
                    alt="img"
                    className="img-fluid Tag-User-img"
                  />
                </span>
                <div className="Tag-list-text">
                  <h4>@Amaia</h4>
                  <p>
                    Especialista en Comunicación Estratégica de Marca en
                    Entornos Digitales - UAO
                  </p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagImage;
