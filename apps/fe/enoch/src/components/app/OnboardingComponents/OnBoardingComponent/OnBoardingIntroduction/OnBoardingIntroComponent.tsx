import { Key, useCallback, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Slider from "react-slick";
import { onBoardingIntroData } from "./onBoardingIntroData";
import { Logo } from "../../../../core/index";
import { useRouter } from "next/router";

export interface sliderInterface {
  slickPrev?: any;
  slickNext?: any;
  current?: object;
}

const OnBoardingIntroComponent: React.FC = () => {
  const router = useRouter();
  const sliderRef = useRef<sliderInterface>({ current: {} });
  const [currentIndex, setCurrentIndex] = useState({
    activeSlide: 0,
    currentSlide: 0,
  });

  const handleNext = useCallback(() => {
    sliderRef.current.slickNext();
  }, [sliderRef.current]);

  const handlePrev = useCallback(() => {
    sliderRef.current.slickPrev();
  }, [sliderRef.current]);

  function navigateToNextPage() {
    router.push("/onboarding/personal-information");
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    dotsClass: "onboarding-dots slick-dots",
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    beforeChange: (current: any, next: any) =>
      setCurrentIndex({ ...currentIndex, activeSlide: next }),
    afterChange: (current: any) =>
      setCurrentIndex({ ...currentIndex, currentSlide: current }),
  };

  return (
    <>
      <div className="container-fluid">
        <div className=" ">
          <div className="onboarding-new-container container-bg1 overflow-hidden">
            <Slider ref={(c) => !!c && (sliderRef.current = c)} {...settings}>
              {onBoardingIntroData.map(
                (data: { id: number; heading: string; para: string }) => {
                  return (
                    <div key={data.id}>
                      <div className="onboarding-new-block">
                        <div className="onboarding-slide-lft-sect">
                          <div className="onboarding-new-block-lft">
                            <img
                              src="images/onboarding-slider-img.png"
                              className="img-fluid"
                              alt="slider"
                            />
                          </div>
                        </div>
                        <div className="onboarding-slide-right-sect">
                          <div className="onboarding-new-block-right">
                            <div className="onboarding-new-hearder-img">
                              <Logo />
                            </div>
                            <div>
                              <h3 className="onboarding-component-intro-heading">
                                {data.heading}
                              </h3>
                              <p className="onboarding-component-intro-des">
                                {data.para}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </Slider>

            <div className="onboarding-new-slide-pagi d-flex justify-content-between w-50">
              {
                <a
                  onClick={navigateToNextPage}
                  className="btn left text-decoration-none onboarding-skip-btn"
                  data-slide="prev"
                >
                  <span className="slide-pagi-prev">
                    {currentIndex.currentSlide !==
                    onBoardingIntroData.length - 1
                      ? "SKIP"
                      : ""}{" "}
                  </span>
                </a>
              }

              <div className="onboarding-slider-btn">
                {currentIndex.currentSlide !==
                  onBoardingIntroData.length - 1 && (
                  <a
                    onClick={handlePrev}
                    className="btn left text-decoration-none"
                    data-slide="prev"
                  >
                    <span
                      className="slide-pagi-prev"
                      style={{
                        color:
                          currentIndex.currentSlide > 0 ? "#7521e2" : "#8a9099",
                      }}
                    >
                      PREVIOUS
                    </span>
                  </a>
                )}
                <a
                  onClick={() => {
                    currentIndex.currentSlide == onBoardingIntroData.length - 1
                      ? navigateToNextPage()
                      : handleNext();
                  }}
                  className="btn right text-decoration-none"
                  data-slide="next"
                >
                  <span className="slide-pagi-next">
                    {currentIndex.currentSlide == onBoardingIntroData.length - 1
                      ? "START YOUR JOURNEY"
                      : "NEXT"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OnBoardingIntroComponent;
