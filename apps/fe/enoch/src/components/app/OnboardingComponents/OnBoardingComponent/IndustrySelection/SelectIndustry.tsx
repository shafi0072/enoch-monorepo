import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  AccountType,
  OnBoardingScreen,
} from "../../../../../constants/onboarding-enums";
import { routes } from "../../../../../constants/routes";
import { GET_VERIFIED_INDUSTRUES } from "../../../../../graphql/mutations/addOnBoardingDetails";
import AuthService from "../../../../../services/AuthService";
import onboardingService from "../../../../../services/onboardingService";
import { InputFieldWrapper, Modal } from "../../../../core";
import Tab from "../../../../core/components/Tab";
import IndustryCard from "./IndustryCard";

export const addIndustryValidationSchema = yup.object().shape({
  industryCategory: yup.string().required("This field is mandatory"),
});

type IndustryProps = {
  _id: string;
  title: string;
  img: string;
  classname: string;
  industryCategory: string;
  isSelected: boolean;
};
const SelectIndustry = ({}: any) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("");
  const [allIndustries, setAllIndustries] = useState<any>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const user = AuthService.getUser();
    setAccountType(user?.accountType);
    onboardingService.getVerifiedIndustries().then((industries) => {
      setAllIndustries(
        industries?.data?.getVerifiedIndustries?.industries || []
      );
      setSelectedIndustries([
        ...(new Set([
          ...selectedIndustries,
          ...(industries?.data?.getVerifiedIndustries?.selectedIndustries ||
            []),
        ]) as any),
      ]);
    });
  }, []);

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addIndustryValidationSchema),
  });

  const onCardClick = useCallback(
    (id, isSelected) => {
      if (accountType == AccountType.Individual) {
        setSelectedIndustries((prevState: any) => {
          const updatedState = isSelected
            ? prevState.filter((i: string) => i != id)
            : [...prevState, id];
          return updatedState || [];
        });
        return;
      }
      setSelectedIndustries(id);
    },
    [selectedIndustries, accountType]
  );

  const handleOnNext = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation(
      {
        [accountType && accountType == AccountType.Individual
          ? "interests"
          : "industryType"]: selectedIndustries,
        activeOnBoardingScreen: OnBoardingScreen.SelectUsersToFollow,
      },
      GET_VERIFIED_INDUSTRUES
    );
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails);
    router.push(routes.addFollowersPage);
  }, [selectedIndustries]);

  const toggleModal = useCallback(() => {
    setIsModal((prev) => !prev);

    if (!isModal) {
      document.body.className = "overflow-hidden";
    }
    if (isModal) {
      document.body.className = "overflow-auto";
    }
  }, [isModal]);

  const onSubmit = async ({ industryCategory }: any) => {
    const res = await onboardingService.createIndustry(industryCategory);
    if (!res) return;
    setAllIndustries([...allIndustries, res?.createIndustry]);
    await onCardClick(res?.createIndustry._id, false);
    toggleModal();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="onboarding-new-container container-bg2">
          <div className="onboard-individual-body">
            <div className="onboard-business-logo">
              <img
                src="/images/businessNewLogo.png"
                className="img-fluid"
                alt="logo"
              />
            </div>
            <div className="onboard-business-bottm-img">
              <img
                src="/images/business-img.png"
                className="img-fluid"
                alt="logo"
              />
            </div>

            <div className="onboard-business-innerbody">
              <div className="onboard-business-progressBlock">
                <div className="onboard-business-progressbar">
                  <div className="onboard-business-progressbar-inner progress-29"></div>
                </div>
                <div className="onboard-business-bottmVal">
                  <span onClick={() => router.push(routes.personalInformation)}>
                    <img
                      src="/images/back-arrow.png"
                      className="img-fluid mr-2"
                      alt="back"
                    />
                    GO BACK
                  </span>
                  <div className="onboarding-progress-step-count">
                    <strong>1</strong>
                    <span>/5</span>
                  </div>
                </div>
              </div>
              <div className="onboard-business-hd">
                <h2>
                  {accountType == AccountType.Individual
                    ? "What type of things are you interetsed in ?"
                    : "Which industry do you work for ?"}{" "}
                </h2>
                <p>
                  {accountType == AccountType.Individual
                    ? `Everone has interests and things that excites them and enjoy
                  doing !`
                    : `Select your industry to get benefits of social commerce `}
                </p>
              </div>
              <div className="onboard-business-selection-block">
                <div className="onboarding_business_cards_sect">
                  <div className="row">
                    {allIndustries.length &&
                      allIndustries.map((industry: IndustryProps) => (
                        <IndustryCard
                          key={industry._id}
                          industry={industry}
                          selectedIndustries={selectedIndustries}
                          onCardClick={onCardClick}
                        />
                      ))}
                    <div
                      onClick={toggleModal}
                      className=" col-md-4 col-lg-3 col-sm-6 p_9"
                    >
                      <div className="onboarding_business_card border_pink1">
                        <div className="_imgonboarding_business_card_img">
                          <img
                            src="/images/section-img9.png"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <p>Others</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="onboard-busines-nxt">
                <button
                  onClick={handleOnNext}
                  id="selectothers-cont-btn"
                  className="bunsinss-nxt-bttn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModal}>
        <Tab {...{ activeComponent: "industry", tabName: "industry" }}>
          <div className="modal-dialog mt-0 mb-0 industry-modal-dialog">
            <div className="modal-content selectOthers-modal-content">
              <span onClick={toggleModal} className="close">
                <img
                  src="/images/businessCross.png"
                  alt="close"
                  className="img-fluid"
                  data-dismiss="modal"
                />
              </span>
              <h3>
                {accountType == AccountType.Business
                  ? "Which industry do you work for ?"
                  : "What type of things are you interetsed in ? "}{" "}
              </h3>
              <div className="selectothers-form-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="selectothers-form-input">
                    <InputFieldWrapper
                      customclassName="border-0"
                      type="text"
                      placeholder="industry name"
                      register={register}
                      error={errors.industryCatagory}
                      getFieldState={getFieldState}
                      name="industryCategory"
                    />
                  </div>
                  <div className="selectothers-btn-block">
                    <button
                      type="submit"
                      id="selectothers-cont-btn"
                      className="selectothers-nxt-bttn"
                      data-toggle="modal"
                      data-target="onboard-selectOthers-modal2"
                    >
                      Submit & Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Tab>
      </Modal>
    </div>
  );
};

export default SelectIndustry;
