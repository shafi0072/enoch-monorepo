import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tab from "../../../../core/components/Tab";
import { Modal } from "../../../../core/index";
import {
  Popup1,
  Popup10,
  Popup11,
  Popup12,
  Popup2,
  Popup3,
  Popup4,
  Popup5,
  Popup6,
  Popup7,
  Popup8,
  Popup9,
} from "./allPopups";
import onboardingService from "../../../../../services/onboardingService";
import { OnBoardingScreen } from "../../../../../constants/onboarding-enums";
import AuthService from "../../../../../services/AuthService";
import { routes } from "../../../../../constants/routes";
import RepeatComponent from "../../../../core/components/RepeatComponent";

type DotProps = {
  val: number;
};
const dots: DotProps[] = [
  {
    val: 1,
  },
  {
    val: 2,
  },
  {
    val: 3,
  },
  {
    val: 4,
  },
  {
    val: 5,
  },
  {
    val: 6,
  },
  {
    val: 7,
  },
  {
    val: 8,
  },
  {
    val: 9,
  },
  {
    val: 10,
  },
  {
    val: 11,
  },
  {
    val: 12,
  },
];

const totalSteps = 11;

const FeaturePopup = () => {
  const [activePopupComponent, setActivePopupComponent] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const user = AuthService.getUser();
    if (user?.activeOnBoardingScreen === OnBoardingScreen.FeaturePopupScreen) {
      openModal();
    }
  }, []);

  const next = useCallback(() => {
    if (step !== dots.length) {
      setStep(step + 1);
      setActivePopupComponent(step + 1);
    }
    if (step === dots.length) {
      skipIntro();
    }
  }, [step]);

  const prev = useCallback(() => {
    if (step === 0) {
      setStep(dots.length);
    } else {
      setStep(step - 1);
    }
    setActivePopupComponent(step - 1);
  }, [step]);

  const skipIntro = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation({
      activeOnBoardingScreen: OnBoardingScreen.WelcomeScreenAfterOnboarding,
    });
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails);
    router.push(routes.onBoardingWelcome);
  }, []);

  const openModal = useCallback(() => {
    setIsModal(true);
    if (!isModal) {
      document.body.className = "overflow-hidden";
    }
  }, []);

  const agreeToTerms = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation({
      activeOnBoardingScreen: OnBoardingScreen.FeaturePopupScreen,
      isAgreedToOnboardingTerms: true,
    });
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails);
    openModal();
  }, []);

  return (
    <>
      <header className="enoch-header">
        <div>
          <img className="encho-logo cursor" src="/images/encho-logo.png" />
        </div>
      </header>

      <section>
        <div>
          <img className="aggrement-bg" src="/images/aggrement-bg.png" />
        </div>

        <div className="aggrement-section">
          <h3 className="terms-title">Terms of service</h3>

          <p className="aggrement-description mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>

          <div className="scrollable-section">
            <RepeatComponent count={10}>
              {({ index }: any) => (
                <p key={index} className="scrollable-section-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </p>
              )}
            </RepeatComponent>
          </div>

          <button
            type="button"
            className="aggrement-btn"
            onClick={agreeToTerms}
          >
            Agree & Continue
          </button>
        </div>
      </section>

      <Modal isOpen={isModal}>
        <div className="enoch-modal modal in" style={{ display: "block" }}>
          <div className=" modal-dialog-centered modal-dialog modal-xl ">
            <div className=" modal-content">
              <div className=" modal-body">
                <div>
                  <img
                    onClick={skipIntro}
                    src="/images/cross-modal.png"
                    className="cross-modal cursor"
                    data-dismiss="modal"
                  />
                </div>

                <div
                  id="carouselExampleIndicators"
                  className="enoch-popupModal-ref--modalbody-content"
                  data-ride="carousel"
                  data-interval="false"
                >
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 1,
                    }}
                  >
                    <Popup1 />
                  </Tab>

                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 2,
                    }}
                  >
                    <Popup2 />
                  </Tab>

                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 3,
                    }}
                  >
                    <Popup3 />
                  </Tab>

                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 4,
                    }}
                  >
                    <Popup4 />
                  </Tab>

                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 5,
                    }}
                  >
                    <Popup5 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 6,
                    }}
                  >
                    <Popup6 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 7,
                    }}
                  >
                    <Popup7 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 8,
                    }}
                  >
                    <Popup8 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 9,
                    }}
                  >
                    <Popup9 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 10,
                    }}
                  >
                    <Popup10 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 11,
                    }}
                  >
                    <Popup11 />
                  </Tab>
                  <Tab
                    {...{
                      activeComponent: activePopupComponent,
                      tabName: 12,
                    }}
                  >
                    <Popup12 />
                  </Tab>
                </div>
                <div className="enoch-popupModal-ref--modalfooter">
                  {step > 1 ? (
                    <a
                      href="#"
                      onClick={prev}
                      className="enoch-popupModal-ref--prev"
                    >
                      <span>
                        <img
                          src="/images/Arrow-Left.png"
                          alt="left arrow"
                          className="img-fluid"
                        />
                      </span>
                      <span className="link-text">Previous</span>
                    </a>
                  ) : (
                    <a className="enoch-popupModal-ref--prev">
                      <span>
                        <img
                          src="/images/Arrow-Left.png"
                          alt="left arrow"
                          className="img-fluid"
                        />
                      </span>
                      <span className="link-text">Previous</span>
                    </a>
                  )}
                  <div className="enoch-popupModal-ref--indicators">
                    <ol className="enoch-popupModal-ref--indicatorsList">
                      {dots.map((dot) => (
                        <li
                          key={dot.val}
                          className={`${step === dot.val && "active"}`}
                        ></li>
                      ))}
                    </ol>
                  </div>
                  {step > totalSteps ? (
                    <a
                      href="#"
                      className="enoch-popupModal-ref--next"
                      onClick={next}
                    >
                      <span className="link-text">Post to feed</span>
                      <span>
                        <img
                          src="/images/Arrow-right.png"
                          alt="left arrow"
                          className="img-fluid"
                        />
                      </span>
                    </a>
                  ) : (
                    <a
                      onClick={next}
                      className="enoch-popupModal-ref--next"
                      href="#"
                    >
                      <span className="link-text">Post to feed</span>
                      <span>
                        <img
                          src="/images/Arrow-right.png"
                          alt="left arrow"
                          className="img-fluid"
                        />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeaturePopup;
