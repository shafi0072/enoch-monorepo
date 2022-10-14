import React, { useCallback, useState } from "react";
import { get } from 'lodash';
import RangeInput from "../../../../../../core/components/RangeInput";
interface Props {
  editorRef: any,
  adjustments: any,
  setAdjustments: any,
}

interface adjust {
  BRIGHTNESS: string;
  CONTRAST: string;
  SATURATION: string;
  VIGNETTE: string;
}

const adjustmentsOptions: adjust = {
  BRIGHTNESS: 'Brightness',
  CONTRAST: 'Contrast',
  SATURATION: 'Saturation',
  VIGNETTE: 'Vignette',
}

const filterOptionsMapping = {
  'Brightness': {
    name: 'Brightness',
    mode: 'brightness',
    expr: (value: number) => {
      return { 'brightness': value / 255 }
    },
  },
  'Contrast': {
    name: 'Tint',
    mode: 'blendColor',
    expr: (value: number) => {
      return {
        mode: 'tint',
        color: '#282828',
        alpha: value / 99.5
      }
    }
  },
  'Saturation': {
    name: 'Remove Color',
    mode: 'brightness',
    expr: (value: number) => {
      return {
        'brightness': value / 255
      }
    }
  },
  'Vignette': {
    name: 'Tint',
    mode: 'blendColor',
    expr: (value: number) => {
      return {
        mode: 'tint',
        color: '#a16946',
        alpha: value / 99.5
      }
    }
  },
}


const Adjust = ({ editorRef, adjustments, setAdjustments }: Props) => { 
  const [activeadjustments, setActiveadjustments] = useState<string>(adjustmentsOptions.BRIGHTNESS)
  const onadjustments = useCallback((adjustmentsType: string) => {
    applyRemoveFilter(adjustmentsType);
    setActiveadjustments(adjustmentsType);
  }, [])

  const onadjustmentsChange = useCallback((value: number) => {
    setAdjustments({ ...adjustments, ...{ [activeadjustments]: { value, min: 0, max: 100 } } })
    const { mode, expr } = get(filterOptionsMapping, activeadjustments);
    editorRef.current.applyFilter(mode, expr(value))
  }, [activeadjustments, adjustments]);


  const applyRemoveFilter = useCallback((filterType: string) => {
    if (filterType === adjustmentsOptions.SATURATION) {
      editorRef.current.applyFilter('Sharpen');
    }
  }, []);

  return (
    <div id="Adjust" className="Edit_tabcontent d-block">
      <div className="avax__photo__sectionInner">
        <div className="avax__photo__rangeSlider">
          <h5 className="avax__photo__rangeSlider__title">{activeadjustments}</h5>
          <div className="avax__photo__slidecontainer">
            <RangeInput
              {...get(adjustments, activeadjustments)}
              width="100%"
              onChange={onadjustmentsChange}
            />
          </div>
        </div>
        <div className="avax__photo__bttn">
          {
            Reflect.ownKeys(adjustmentsOptions).map((option, index) => {
              const activeComponentValue = get(adjustmentsOptions, option)
              return (
                <button
                  onClick={() => onadjustments(activeComponentValue as string)}
                  key={index}
                  className={`avax__photo__bttn__dark avex__afterthumb ${activeComponentValue === activeadjustments ? 'active' : ''}`}
                >
                  {
                    activeComponentValue
                  }
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Adjust;
