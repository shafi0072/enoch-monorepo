import React, { useCallback, useEffect, useState } from "react";

type IndustryProps = {
  _id: string;
  title: string;
  img: string;
  classname: string;
  industryCategory: string;
  isSelected: boolean;
};

type IndustryCardProps = {
  industry: IndustryProps;
  setSelectedIndustries?: React.Dispatch<React.SetStateAction<[string] | []>>;
  selectedIndustries: string[];
  onCardClick: (id: string, isSelected: boolean) => void;
};
const IndustryCard = ({
  industry,
  onCardClick,
  selectedIndustries,
}: IndustryCardProps) => {
  const [isCardSelected, setIsSelected] = useState<boolean>(false);
  useEffect(() => {
    if (selectedIndustries.includes(industry._id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedIndustries]);

  return (
    <div
      onClick={() => {
        onCardClick(industry._id, isCardSelected);
      }}
      className={`${industry.classname} col-md-4 p_9 col-lg-3 col-sm-6  ${
        isCardSelected ? "seclect-active" : ""
      }`}
    >
      <div className="onboarding_business_card border_pink1">
        <div className="_imgonboarding_business_card_img">
          <img
            src="/images/industry_img_8.png"
            alt="img"
            className="img-fluid"
          />
        </div>
        <p>{industry?.industryCategory}</p>
        <div className="seclection-check">
          <img
            src="/images/business-tick.png"
            className="img-fluid business-tick"
            alt="tick"
          />
          <img
            src="/images/business-cross.png"
            className="img-fluid business-cross"
            alt="tick"
          />
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;
