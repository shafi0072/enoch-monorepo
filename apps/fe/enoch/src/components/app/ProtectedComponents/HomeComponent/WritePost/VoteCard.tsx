import React from "react";
interface Props {
  data: any;
}
const VoteCard = ({ data }: Props) => {
  return (
    <div className="fungible_token_vote_avex">
      <div className="fungible-token-avex">
        <div className="fungible_vote_heading">
          <h4>{data?.question}</h4>
          <p>
            You can see how people vote.{" "}
            <span className="more_txt_prple">Learn More</span>{" "}
          </p>
        </div>
        <div className="vote_token_yes_no_btns">
          {data?.options?.map((el: any, i: any) => (
            <button key={i} className="vote_section_selct_yes">
              {el.option}
            </button>
          ))}
        </div>
        <div className="vte_views_results">
          <h3>
            0 votes
            <span className="one_w_left"> • {data?.duration} • </span> View
            results
          </h3>
        </div>
      </div>
    </div>
  );
};
export default VoteCard;
