import React, { useCallback, useEffect, useState } from "react";
import RangeInput from "../../../../../../core/components/RangeInput";
interface Props {
  editorRef: any;
  cropState: any;
  setCropState: any;
}

type AspectRatio = {
  id: number;
  width: number;
  ratio?: number;
  height: number;
  title: string;
};
const aspectRatios: AspectRatio[] = [
  {
    id: 1,
    ratio: 0,
    width: 0,
    height: 0,
    title: "Original",
  },
  {
    id: 2,
    width: 2,
    height: 2,
    ratio: 1.4,
    title: "Square",
  },
  {
    id: 3,
    width: 4,
    ratio: 1.5,
    height: 1,
    title: "4 : 1",
  },
  {
    id: 4,
    width: 3,
    height: 4,
    ratio: 1.8,
    title: "3 : 4",
  },
  {
    id: 5,
    width: 16,
    ratio: 4,
    height: 9,
    title: "16 : 9",
  },
];

const cropValues = {
  zoom: {
    min: 1,
    max: 4,
  },
  straighten: {
    min: -180,
    max: 180,
    default: 0,
  },
};

const Crop = ({ editorRef, cropState, setCropState }: Props) => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [dropdownPlaceholder, setDropdownPlaceholder] = useState<string>("");

  const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
  }, []);

  const onFlipImage = useCallback((isXAxis: boolean) => {
    editorRef.current?.[isXAxis ? "flipX" : "flipY"]();
  }, []);

  const onRotate = useCallback(
    (degree: number) => {
      editorRef.current?.rotate(degree);
      setCropState({ ...cropState, ...{ rotate: degree } });
    },
    [cropState, setCropState]
  );

  const onStraighten = useCallback(
    (degree: number) => {
      if (
        degree >= cropState.straighten.min &&
        degree <= cropState.straighten.max
      ) {
        const isDown = cropState.straighten.value > degree;

        setCropState({
          ...cropState,
          ...{ straighten: { value: degree, min: 1, max: 5 } },
        });
        editorRef.current?.rotate(isDown ? -1 : 1);
      }
    },
    [cropState, setCropState]
  );

  const handleAspectRatio = useCallback(
    (aspectRatio: AspectRatio) => {
      setCropState({ cropState, ...{ cropAspectRatio: aspectRatio.ratio } });
      editorRef.current?.startDrawingMode("CROPPER");
      editorRef.current?.setCropzoneRect(aspectRatio.ratio, 0, 0, 0);
      setIsDropdown(false);
    },
    [editorRef]
  );

  const onCrop = useCallback(() => {
    const corpReact = editorRef.current?.getCropzoneRect();
    editorRef.current?.crop(corpReact).then(function () {
      editorRef.current.stopDrawingMode();
    });
    setCropState({ ...cropState, ...{ cropAspectRatio: null } });
  }, [editorRef, cropState]);

  const onCancelCrop = useCallback(() => {
    setCropState({ ...cropState, ...{ cropAspectRatio: null } });
    editorRef.current.stopDrawingMode();
  }, [editorRef, cropState]);

  const onZoom = useCallback((zoomValue) => {
    editorRef.current.zoom({ x: 0, y: 0, zoomLevel: zoomValue });
    setCropState({
      ...cropState,
      ...{ zoom: { value: zoomValue, min: 1, max: 5 } },
    });
  }, []);

  const onZoomIn = useCallback(() => {
    if (cropState.zoom.value === 5) {
      return;
    }
    setCropState({
      ...cropState,
      ...{ zoom: { value: cropState.zoom.value + 1, min: 1, max: 5 } },
    });
    editorRef.current.zoom({ x: 0, y: 0, zoomLevel: cropState.zoom.value + 1 });
  }, [cropState, editorRef]);

  const onZoomOut = useCallback(() => {
    if (cropState.zoom.value === 1) {
      return;
    }
    setCropState({
      ...cropState,
      ...{ zoom: { value: cropState.zoom.value - 1, min: 1, max: 5 } },
    });
    editorRef.current.zoom({ x: 0, y: 0, zoomLevel: cropState.zoom.value - 1 });
  }, [cropState, editorRef]);

  return (
    <div id="Crop" className="Edit_tabcontent d-block">
      <div className="Edit-options-content">
        <div className="Edit-options-head">
          <div className="Crop_Ratio-dropdown-sect d-flex">
            <div onClick={toggleDropdown} className="Crop_Ratio-dropdown-box">
              <h3>
                {dropdownPlaceholder ? dropdownPlaceholder : "Crop ratio"}
              </h3>
              <span>
                <img
                  src="/images/crop-Arrow-Down.svg"
                  alt="icon"
                  className="img-fluid"
                />
              </span>
            </div>
            <div className="Crop_Ratio-dropdown-list d-block">
              {isDropdown && (
                <ul>
                  {aspectRatios.map((ratio) => (
                    <li
                      className="cursor-pointer"
                      onClick={() => handleAspectRatio(ratio)}
                      key={ratio.id}
                    >
                      {ratio.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cropState.cropAspectRatio ? (
              <div className="d-flex">
                <button
                  className="btn btn-secondary btn-sm mx-2"
                  onClick={onCrop}
                >
                  Crop
                </button>
                <button className="btn btn-light btn-sm" onClick={onCancelCrop}>
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
          <div className="crop-and-rotate-list">
            <ul>
              <li onClick={() => onRotate(90)}>
                <span>
                  <img
                    src="/images/rotate-r-icon.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
              </li>
              <li onClick={() => onRotate(-90)}>
                <span>
                  <img
                    src="/images/rotate-L-icon.svg.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
              </li>
              <li onClick={() => onFlipImage(true)}>
                <span>
                  <img
                    src="/images/miror-icon-R.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
                <span>
                  <img
                    src="/images/miror-icon-L.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
              </li>
              <li
                onClick={() => onFlipImage(false)}
                className="mr-0 miror-up-down"
              >
                <span>
                  <img
                    src="/images/miror-icon-R.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
                <span>
                  <img
                    src="/images/miror-icon-L.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Edit-options-content-body">
        <div className="Edit-photo-zoom-sect">
          <h4>Zoom</h4>
          <div className="zoom-bar-sect">
            <span onClick={onZoomOut} className="zoom-decerss-btn ">
              <img
                src="/images/Minus.svg"
                alt="icon"
                className="img-fluid mr-2"
              />
            </span>

            <RangeInput {...cropState.zoom} onChange={onZoom} />

            <span onClick={onZoomIn} className="zoom-incerss-btn">
              <img
                src="/images/Plus.svg"
                alt="icon"
                className="img-fluid ml-2"
              />
            </span>
          </div>
        </div>
        <div className="Edit-photo-Straighten-sect">
          <h4>Straighten</h4>
          <div className="Straighten-bar-sect">
            <span onClick={() => onStraighten(cropState.straighten.value - 1)}>
              <img
                style={{ marginLeft: "-5px" }}
                src="/images/Minus.svg"
                alt="icon"
                className="img-fluid mr-2"
              />
            </span>

            <RangeInput {...cropState.straighten} onChange={onStraighten} />

            <span onClick={() => onStraighten(cropState.straighten.value + 1)}>
              <img
                src="/images/Plus.svg"
                alt="icon"
                className="img-fluid ml-2"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crop;
