import React from "react";
interface StepsProps {
  stepDescription: string;
  stepNumber: string;
}

const SmartPhoneAuthStep: React.FC<StepsProps> = ({
  stepDescription,
  stepNumber,
}) => {
  return (
    <li className="d-flex flex-row align-items-center mt-4 ">
      <span className="d-flex flex-row justify-content-center align-items-center smart-phone-auth-step">
        {stepNumber}
      </span>
      <p className="mb-0 ml-2">{stepDescription}</p>
    </li>
  );
};

export default SmartPhoneAuthStep;
