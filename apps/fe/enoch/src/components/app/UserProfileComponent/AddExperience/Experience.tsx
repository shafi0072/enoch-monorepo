import React from "react";
import styles from "./Experience.module.css";

interface ExperienceProps {
  jobTitle: string;
  employementType: string;
  startMonth: string;
  startYear: string;
  location: string;
}

const Experience = ({ experience }: { experience: ExperienceProps }) => {
  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="d-flex gap-2 py-3 border-bottom border-2"
    >
      <div className={`${styles.experienceImage}`}>
        <img src="" alt="" />
      </div>
      <div>
        <h1 className={styles.experienceHeader}>{experience.jobTitle}</h1>
        <div
          className={`${styles.experiencePara} d-flex align-item-center gap-1`}
        >
          <span>88mph</span>
          <span>{experience.employementType}</span>
        </div>
        <div className={`${styles.experiencePara} text-muted`}>
          {experience.startMonth + " " + experience.startYear} - Counting , 2
          years 11 months
        </div>
        <div className={`${styles.experiencePara} text-muted`}>
          {experience.location}
        </div>
      </div>
    </div>
  );
};

export default Experience;
