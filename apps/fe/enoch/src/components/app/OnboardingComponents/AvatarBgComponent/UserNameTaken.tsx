import React from "react";
import { MdOutlineInfo } from "react-icons/md";
import styles from "./AvatarBg.module.css";

const UserNameTaken = ({ suggestions }: { suggestions: Array<string> }) => {
  return (
    <div className={styles.inputFieldFailure}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <MdOutlineInfo /> The username is already taken.
      </div>
      <div className={styles.inputFieldSuggestions}>
        <div>Suggestions: </div>
        <div className="d-flex gap-1">
          {suggestions.map((item, index) => (
            <React.Fragment key={index}>
              <div>{item}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNameTaken;
