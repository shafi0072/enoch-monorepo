import React, { useCallback, useState } from "react";
import PostService from "../../../../../../services/PostService";
import Card from "./Card";
import Results from "./Results";

export interface pollOptionProps {
  _id: string;
  title: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  duration: string;
}

export interface pollProps {
  id: number;
  text: string;
  option: string;
}

interface Props {
  content: any;
}

const PollCard = ({ content }: Props) => {
  const [isResults, setIsResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [results, setResults] = useState<any>();

  const { optionA, optionB, optionC, optionD } = content;
  const polls: pollProps[] = [
    {
      id: 1,
      text: optionA,
      option: "A",
    },
    {
      id: 2,
      text: optionB,
      option: "B",
    },
    {
      id: 3,
      text: optionC,
      option: "C",
    },
    {
      id: 4,
      text: optionD,
      option: "D",
    },
  ];

  const handleAddVote = useCallback(async (option: string, postId: string) => {
    const res = await PostService.addVote(option, postId);
    setResults(res?.data?.addVote);
    setIsResults(true);
    setSelectedOption(`option${option}`);
  }, []);

  const undoVoting = useCallback(() => {
    setIsResults(false);
  }, []);

  return (
    <>
      {isResults ? (
        <Results
          {...{
            results,
            selectedOption,
            pollOptions: content,
            polls,
            undoVoting,
          }}
        />
      ) : (
        <Card
          {...{
            pollOptions: content,
            handleAddVote,
            polls,
            undoVoting,
          }}
        />
      )}
    </>
  );
};

export default PollCard;
