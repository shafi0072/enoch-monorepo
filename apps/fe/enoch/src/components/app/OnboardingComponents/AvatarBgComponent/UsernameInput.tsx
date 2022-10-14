import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { SiMaildotru } from "react-icons/si";
import styles from "./AvatarBg.module.css";
import _debounce from "lodash/debounce";
import { Button } from "../../../core";
import UserNameTaken from "./UserNameTaken";
import UserNameAvailable from "./UserNameAvailable";
import OnboardingService from "../../../../services/onboardingService";

const usernames = ["Draco", "Bounce", "Coder", "Batman"];

interface UsernameInputProps {
  username: string;
  setusername: Dispatch<SetStateAction<string>>;
}

const UsernameInput = ({ setusername }: UsernameInputProps) => {
  const [usernameTaken, setusernameTaken] = useState<boolean | null>(null);
  const [inputValue, setinputValue] = useState<string>("");

  const validateUsername = useCallback(async (username) => {
    const res = await OnboardingService.validateUsername(
      JSON.stringify(username)
    );

    if (!res?.data) return setusernameTaken(true);
    setusernameTaken(false);
  }, []);
  // debounce function to check username
  const handleDebounceFn = async (inputValue: string) => {
    validateUsername(inputValue);
  };

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  // onChange inputValue
  const onChangeUsername = useCallback(
    (e: any) => {
      setinputValue(e.target.value);
      debounceFn(e.target.value);
    },
    [inputValue]
  );

  // Click ok to finalise username
  const handleUsername = useCallback(() => {
    setusername(inputValue);
    setusernameTaken(null);
  }, [inputValue, usernameTaken]);

  return (
    <div className={styles.input}>
      <div className={styles.inputFieldWrapper}>
        <div className={styles.inputField}>
          <SiMaildotru />
          <input
            value={inputValue}
            onChange={onChangeUsername}
            placeholder="Enter username"
          />
          <div className={styles.inputFieldValid}>
            {usernameTaken === false && (
              <Button
                className={styles.inputFieldSuccessBtn}
                type="button"
                text="OK"
                handler={handleUsername}
              />
            )}
          </div>
        </div>
        <div className={usernameTaken === null ? "" : styles.inputDrop}>
          {usernameTaken === null ? null : usernameTaken ? (
            <UserNameTaken suggestions={["Draco", "Drake", "Drune"]} />
          ) : (
            <UserNameAvailable />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameInput;
