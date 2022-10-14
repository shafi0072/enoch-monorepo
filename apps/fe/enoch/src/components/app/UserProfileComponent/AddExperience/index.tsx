import React, { useState } from "react";
import ModalWrapper from "../../../core/lib/bootstrap/Modal";
import Button from "../../../core/lib/bootstrap/Button/Button";
import { HiPlus } from "react-icons/hi";
import AuthService from "../../../../services/AuthService";
import Experience from "./Experience";
import styles from "./Experience.module.css";
import ExperienceForm, { ExperienceFormProps } from "./ExperienceForm";

interface Props {
  isOwnProfile?: boolean;
}

const AddExperience = ({ isOwnProfile }: Props) => {
  const [modal, setmodal] = useState<boolean>(false);
  const [userJobExperience, setuserJobExperience] = useState<
    Array<ExperienceFormProps>
  >([]);

  React.useEffect(() => {
    const fetchExperience = async () => {
      const data = await AuthService.getMyJobExperienceInfo();
      setuserJobExperience(data.getUser.userJobExperience);
    };
    fetchExperience();
  }, []);

  return (
    <div>
      <div className="">
        {userJobExperience.length > 0 ? (
          <div className="border-top border-2">
            {userJobExperience.map(
              (experience: ExperienceFormProps, index: number) => (
                <Experience key={index} {...{ experience }} />
              )
            )}
          </div>
        ) : (
          <div className={`${styles.noRecord} text-center pb-2 text-muted`}>
            No records found
          </div>
        )}
        {isOwnProfile && (
          <div
            className={
              userJobExperience.length > 0
                ? "d-flex justify-content-end pt-3"
                : "d-flex justify-content-center pt-3"
            }
          >
            <Button
              icon={<HiPlus size={16} />}
              label="Add Experience"
              onClick={() => setmodal(true)}
            />
          </div>
        )}
      </div>
      <ModalWrapper
        title="Add Experience"
        isOpen={modal}
        onClose={() => setmodal(false)}
      >
        <ExperienceForm />
      </ModalWrapper>
    </div>
  );
};

export default AddExperience;
