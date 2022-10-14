import React, { useState } from "react";

export type NewsLetter = {
  channelDescription: string;
  channelName: string;
  channelId: string;
  _id: string;
  isSubscribed: boolean;
};
type NewsLettercardProps = {
  newsLetter: NewsLetter;
  handleNewsLetterSelection: (id: string, isSelected: boolean) => void;
};
const NewsLettercard: React.FC<NewsLettercardProps> = ({
  newsLetter,
  handleNewsLetterSelection,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    newsLetter?.isSubscribed || false
  );
  return (
    <li key={newsLetter?._id}>
      <div className="subscribe-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            handleNewsLetterSelection(newsLetter?._id, isSelected);
            setIsSelected((prev) => !prev);
          }}
        />
      </div>
      <div className="onboard-business-subscribe-contnt">
        <h3>{newsLetter?.channelName}</h3>
        <p>{newsLetter?.channelDescription}</p>
      </div>
    </li>
  );
};

export { NewsLettercard };
