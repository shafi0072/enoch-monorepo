import React, { useCallback, useEffect, useState } from "react";
import { pollOptionProps, pollProps } from ".";
import PostService from "../../../../../../services/PostService";
import { getRemainingTime } from "../../../../../../utils";

interface Props {
  pollOptions: pollOptionProps;
  handleAddVote(option: string, id: string): void;
  undoVoting(): void;
  polls: pollProps[];
}

const Card = ({ handleAddVote, undoVoting, pollOptions, polls }: Props) => {
  const [pollDuration, setPollDuration] = useState<string>("");
  const { duration, title, _id } = pollOptions;

  useEffect(() => {
    setPollDuration(getRemainingTime(parseInt(duration)));
  }, []);

  return (
    <div className="cryptoWrap m-4">
      <div className="cryptoWrap__heading">{title}</div>
      <div className="cryptoWrap__subheading">
        The author can see how you vote. Learn more
      </div>
      <div className="mainstream-awareness-cls">
        {polls
          .filter((el) => el?.text)
          .map((pollOption: pollProps) => {
            return (
              <div key={pollOption.id} className="crypto__btn">
                <button
                  onClick={() => handleAddVote(pollOption.option, _id)}
                  className="cryptoButton"
                >
                  {pollOption.text}
                </button>
              </div>
            );
          })}
      </div>
      <div className="cryptoVote">
        {0} votes • {pollDuration} left
      </div>
    </div>
  );
};

export default Card;
