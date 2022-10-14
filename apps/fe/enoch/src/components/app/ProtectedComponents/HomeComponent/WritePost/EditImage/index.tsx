import React, { useCallback, useState, useRef } from "react";
import Tab from "../../../../../core/components/Tab";
import Crop from "./CropImage";
import Filters from "./FilterImage";
import Adjust from "./AdjustImage";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
  image: any;
  setImage?: React.Dispatch<any>;
  editorRef?: any
  cropState?: any, 
  setCropState?: any,
  adjustments?: any, 
  setAdjustments?: any,
}

const tabTypes = {
  CROP: "crop",
  ADJUST: "adjust",
  FILTERS: "filters",
};

const options = [
  { id: 1, title: "Crop", value: "crop", image: "/images/crop-icon.svg" },
  {
    id: 2,
    title: "Filters",
    value: "filters",
    image: "/images/filter-icon.svg",
  },
  { id: 3, title: "Adjust", value: "adjust", image: "/images/adjust-icon.svg" },
];

const EditImage = ({ image, cropState, setCropState, adjustments, setAdjustments, editorRef }: Props) => {
  const [activeComponent, setActiveComponent] = useState<string>(tabTypes.CROP);

  const handleActiveComponent = useCallback((val: string) => {
    setActiveComponent(val);
  }, []);

  return (
    <div>
      <Tab {...{ activeComponent, tabName: tabTypes.CROP }}>
        <Crop editorRef={editorRef} {...{cropState, setCropState}} />
      </Tab>
      <Tab {...{ activeComponent, tabName: tabTypes.FILTERS }}>
        <Filters image={image} editorRef={editorRef} />
      </Tab>
      <Tab {...{ activeComponent, tabName: tabTypes.ADJUST }}>
        <Adjust editorRef={editorRef} {...{adjustments, setAdjustments}} />
      </Tab>

      <div className="edit-tab-btns">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleActiveComponent(option.value)}
            className={`edit_tablinks crop-img-btn ${activeComponent === option.value && "active"
              }`}
            id="defaultOpen"
          >
            <span>
              <img src={option.image} alt="icon" className="img-fluid" />
            </span>
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditImage;
