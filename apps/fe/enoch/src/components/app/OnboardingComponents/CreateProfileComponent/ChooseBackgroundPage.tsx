import React, { Dispatch, SetStateAction } from "react";

interface ChooseBackgroundProps {
  images: Array<string>;
  setbackgroundImage: Dispatch<SetStateAction<string>>;
}

const ChooseBackgroundPage = ({
  images,
  setbackgroundImage,
}: ChooseBackgroundProps) => {
  return (
    <div className="choose__bg">
      <div className="choose__bg__grid">
        {images.map((image, index) => (
          <img
            onClick={() => setbackgroundImage(image)}
            key={index}
            src={image}
            alt=""
            className="img-fluid"
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseBackgroundPage;
