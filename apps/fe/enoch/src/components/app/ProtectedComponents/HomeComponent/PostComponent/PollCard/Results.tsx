import React, { useCallback, useEffect, useState } from "react";
import { pollProps } from ".";
import { getRemainingTime } from "../../../../../../utils";

interface Props {
  selectedOption: string;
  pollOptions: any;
  undoVoting(): void;
  results: any;
}

const Results = ({
  selectedOption,
  pollOptions,
  undoVoting,
  results,
}: Props) => {
  const [pollDuration, setPollDuration] = useState<string>("");
  const { duration, question } = pollOptions;

  const {
    optionA,
    optionACount,
    optionAPercent,
    optionB,
    optionBCount,
    optionBPercent,
    optionC,
    optionCCount,
    optionCPercent,
    optionD,
    optionDCount,
    optionDPercent,
  } = results;

  const pollResults: any = [
    {
      id: 1,
      option: optionA,
      selected: "optionA",
      count: optionACount,
      optionPercent: optionAPercent,
    },
    {
      id: 2,
      selected: "optionB",
      option: optionB,
      count: optionBCount,
      optionPercent: optionBPercent,
    },
    {
      id: 3,
      selected: "optionC",
      option: optionC,
      count: optionCCount,
      optionPercent: optionCPercent,
    },
    {
      id: 4,
      selected: "optionD",
      option: optionD,
      count: optionDCount,
      optionPercent: optionDPercent,
    },
  ];

  useEffect(() => {
    setPollDuration(getRemainingTime(parseInt(duration)));
  }, []);

  const calculateTotalVotes = useCallback(() => {
    const totalVotes = pollResults
      .map((option: any) => option?.count)
      .reduce((acc: number, curr: number): number => {
        return acc + curr;
      }, 0);
    return totalVotes;
  }, [pollResults]);

  return (
    <div className="cryptoWrap m-4">
      <div className="cryptoWrap__heading">{question}</div>
      <div className="cryptoWrap__subheading">
        The author can see how you vote. Learn more
      </div>
      {pollResults
        .filter((el: any) => el?.option)
        .map((option: any) => (
          <div key={option.id} className="crypto__ProgWraper">
            <div
              className="crypto__Prog Yes "
              style={{
                maxWidth: `${option?.optionPercent}%`,
              }}
            >
              <span className="crypto__ProgValue">{option?.option}</span>
              <span>
                {option.selected === selectedOption && (
                  <img
                    className="crypto__ProgValueTickImg"
                    src="/images/tick-circle.svg"
                    alt=""
                  />
                )}
              </span>
            </div>
            <div className="crypto__ProgValuePercentage mt-3">
              {option?.optionPercent}%
            </div>
          </div>
        ))}
      <div className="cryptoVote">
        {calculateTotalVotes()} votes • {pollDuration} left{" "}
        <span onClick={undoVoting} className="cryptoVoteUndo">
          undo
        </span>
      </div>
    </div>
  );
};

export default Results;
