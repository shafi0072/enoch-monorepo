import React, { useCallback, useMemo } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { toBase64 } from "../../../../../../../utils";
import styles from "../Editor.module.css";

interface Props {
  image: any;
  editorRef: any;
}

const grayScaleStyles = {
  filter: "grayscale(*0%)",
};

const sepiaStyles = {
  filter: "sepia(80%)",
};

const sharpenStyles = {
  filter: "contrast(1.25)",
};

const invertStyles = {
  filter: "invert(25%)",
};

const noiseStyles = {
  background: "url(" + "https://assets.codepen.io/17119/wolves.svg" + ")",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  filter: "contrast(100%) brightness(150%)",
};

const filterOptions = [
  {
    name: "Original",
    filter: "Original",
    style: grayScaleStyles,
  },
  {
    name: "Spotlight",
    filter: "sharpen",
    style: sharpenStyles,
  },
  {
    name: "Studio",
    filter: "grayscale",
    style: grayScaleStyles,
  },
  {
    name: "Prime",
    filter: "noise",
    style: noiseStyles,
  },
  {
    name: "Classic",
    filter: "emboss",
    style: invertStyles,
  },
  {
    name: "Luminate",
    filter: "sepia",
    style: sepiaStyles,
  },
];

const Filters = ({ image, editorRef }: Props) => {
  const [imageURL, setImageUrl] = React.useState<any>("");

  const [initialSlide, setinitialSlide] = React.useState(0);
  const [finalSlide, setfinalSlide] = React.useState(5);

  React.useEffect(() => {
    initImage();
  }, [image]);

  const initImage = async () =>
    await toBase64(image).then((data) => setImageUrl(data));

  const addFilter = useCallback((filterName: string) => {
    if (filterName === "Original") {
      editorRef.current?.removeFilter(filterName);
    } else {
      editorRef.current?.applyFilter(filterName);
    }
  }, []);

  return (
    <div id="Filters" className="Edit_tabcontent d-block">
      <div className="edit-Photo-filterBlock">
        <div
          id="editImgcrousal"
          className="carousel slide multi-item-carousel"
          data-interval="false"
        >
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            <li
              data-target="#editImgcrousal"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#editImgcrousal" data-slide-to="1"></li>
            <li data-target="#editImgcrousal" data-slide-to="2"></li>
            <li data-target="#editImgcrousal" data-slide-to="3"></li>
            <li data-target="#editImgcrousal" data-slide-to="4"></li>
            <li data-target="#editImgcrousal" data-slide-to="5"></li>
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item edit-crousalItem active">
              <ul>
                {filterOptions
                  .slice(initialSlide, finalSlide)
                  .map((option, index) => (
                    <li key={index} onClick={() => addFilter(option.filter)}>
                      <div className="avax__photo__image">
                        <div className="avax__photoImg">
                          <img
                            src={imageURL}
                            alt=""
                            style={option.style}
                            className="slide_avex_enoch img-fluid"
                          />
                        </div>
                        <h5 className="slide_avex">{option.name}</h5>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* <!-- Left and right controls --> */}
          <div className="edit-crousalItem-controls">
            <span>
              <div
                className={styles.carouselBtn}
                onClick={() => {
                  if (initialSlide === 0) {
                    return;
                  }
                  setinitialSlide((c) => c - 1);
                  setfinalSlide((c) => c - 1);
                }}
              >
                <MdOutlineKeyboardArrowLeft size={25} color="#FFF" />
              </div>
            </span>
            <span>
              <div
                className={styles.carouselBtn}
                onClick={() => {
                  if (finalSlide === filterOptions.length) {
                    return;
                  }
                  setfinalSlide((c) => c + 1);
                  setinitialSlide((c) => c + 1);
                }}
              >
                <MdOutlineKeyboardArrowRight size={25} color="#FFF" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
