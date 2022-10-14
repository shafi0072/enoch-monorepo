import { useForm, Controller } from "react-hook-form";
import { Button, CheckBoxInput, InputFieldWrapper } from "../../../core";
import { countries } from "./selectData";
import TextareaField from "../../../core/components/TextareaField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInputField from "../../../core/components/SelectInputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { messages } from "../../../../locals/en-US";
import DateInput from "./DateInput";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import onboardingService from "../../../../services/onboardingService";
import {
  AccountType,
  GenderEnum,
  OnBoardingScreen,
  ReasonHereFor,
  RelationshipStatus,
} from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";
import { useRouter } from "next/router";
import { routes } from "../../../../constants/routes";
import styles from "./UserForm.module.css";

type SelectOptions = {
  value: string;
  label: string;
};

export type UserFormValues = {
  dateOfBirth: Date;
  hideDateOfBirth: boolean;
  gender: string;
  website: string;
  country: string;
  bio: string;
  relationshipStatus: string;
  hideRelationshipStatus: boolean;
  hereFor: string;
  hideHereFor: boolean;
  hideGender: boolean;
  accountType: string;
};

interface UserFormProps {
  setUserTypeView: Dispatch<SetStateAction<boolean>>;
}

const selectStyles = {
  marginBottom: "0px",
  backgroundColor: "#F2F7FC",
  padding: "10px",
  fontSize: "16px",
  height: "auto",
  borderRadius: "0",
  fontFamily: "Poppins",
};

const genderOptions: SelectOptions[] = [
  { value: GenderEnum.MALE, label: "Male" },
  { value: GenderEnum.FEMALE, label: "Female" },
  { value: GenderEnum.OTHERS, label: "Other" },
];

const relatonShipOptions: SelectOptions[] = [
  { value: RelationshipStatus.SINGLE, label: "Single" },
  { value: RelationshipStatus.MARRIED, label: "Married" },
  { value: RelationshipStatus.WIDOWED, label: "Widowed" },
  { value: RelationshipStatus.DIVORCED, label: "Divorced" },
  { value: RelationshipStatus.DOMESTIC, label: "Domestic" },
  { value: RelationshipStatus.PREFER_NOT_TO_SAY, label: "Prefer not to say" },
];

const hereForOptions = [
  {
    value: ReasonHereFor.SELLING_DIGITAL_ARTS,
    label: "Selling Digital Arts",
  },
  {
    value: ReasonHereFor.MAKING_SOCIAL_CIRCLE,
    label: "Making Social Circle",
  },
  {
    value: ReasonHereFor.INVESTING_IN_MARKETPLACE,
    label: "Investing in Marketplace",
  },
  { value: ReasonHereFor.PREFER_NOT_TO_SAY, label: "Prefer not to say" },
];
const userFormSchema = Yup.object().shape({
  dateOfBirth: Yup.date().required(messages.dateOfBirthRequired),
  hideDateOfBirth: Yup.boolean(),
  gender: Yup.string().required(messages.genderRequired),
  country: Yup.string().required(messages.countryRequired),
  bio: Yup.string().required(messages.bio),
  relationshipStatus: Yup.string().required(
    messages.relationshipStatusRequired
  ),
  hideRelationshipStatus: Yup.boolean(),
  hereFor: Yup.string().required(messages.hereForRequired),
  hideHereFor: Yup.boolean(),
  hideGender: Yup.boolean(),
  accountType: Yup.string(),
  website: Yup.string().when("accountType", {
    is: AccountType.Business,
    then: Yup.string().required(messages.website),
  }),
});

const UserForm = ({ setUserTypeView }: UserFormProps) => {
  const dateRef = useRef<any>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm<UserFormValues>({
    mode: "onChange",
    resolver: yupResolver(userFormSchema),
  });

  useEffect(() => {
    const user = AuthService.getUser();
    if (!!user) {
      setValue("bio", user.bio || "");
      setValue("dateOfBirth", new Date(user.dateOfBirth) || new Date());
      setValue("gender", user?.gender || "");
      setValue("website", user?.website || "");
      setValue("hideDateOfBirth", user?.hideDateOfBirth ?? false);
      setValue("country", user?.country || "");
      setValue("hereFor", user?.hereFor || "");
      setValue("relationshipStatus", user?.relationshipStatus || "");
      setValue("hideRelationshipStatus", user?.hideRelationshipStatus ?? false);
      setValue("hideGender", user?.hideGender ?? false);
      setValue("hideHereFor", user?.hideHereFor ?? false);
      setValue("hideRelationshipStatus", user?.hideRelationshipStatus ?? false);
      setValue("accountType", user?.accountType);
    }
  }, []);

  const countryOptions: Array<any> = [];

  countryPush();

  function countryPush() {
    countries.forEach((country) => {
      countryOptions.push({
        value: country,
        label: country,
      });
    });
  }

  const onSubmit = useCallback(async (data: any) => {
    const response = await onboardingService.addOnboardingInformation({
      ...data,
      dateOfBirth: data.dateOfBirth.toString(),
      activeOnBoardingScreen: OnBoardingScreen.ChooseInteresedThings,
    });
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails ?? {});
    router.push({
      pathname: routes.selectIndustryOrInterest,
      query: {
        accountType: response?.data?.addOnboardingDetails.accountType,
      },
    });
  }, []);

  const handleReset = () => {
    reset({
      gender: "",
      country: "",
      website: "",
      dateOfBirth: new Date(),
      hereFor: "",
      bio: "",
      hideHereFor: false,
      hideRelationshipStatus: false,
      hideDateOfBirth: false,
      hideGender: false,
    });
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

            <div className="onboard-individual-innerbody">
              <div className="onboard-business-progressBlock">
                <div className="onboard-business-progressbar">
                  <div className="onboard-business-progressbar-inner"></div>
                </div>
                <div className="onboard-business-bottmVal">
                  <span onClick={() => setUserTypeView(true)}>
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
                <h2>Personal information</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  sed do eiusmod tempor
                </p>
              </div>
              <div className="onboard-business-form-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row gap-2">
                    <div className="col">
                      <h3 className={`${styles.h3}`}>About You</h3>
                    </div>
                    <div className="w-100"></div>
                    <div className="col mb-2 md-mb-0">
                      <div className={`${styles.userFormInput} p-3 d-flex`}>
                        <Controller
                          name="dateOfBirth"
                          render={({ field: { onChange, value, ...rest } }) => (
                            <DatePicker
                              {...rest}
                              onChange={onChange}
                              selected={value}
                              placeholderText="Date of Birth"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              customInput={<DateInput ref={dateRef} />}
                            />
                          )}
                          control={control}
                        />
                      </div>
                      <div className="error-msg">
                        {errors.dateOfBirth?.message}
                      </div>
                      <div className="d-flex gap-1 pt-2">
                        <CheckBoxInput
                          className=""
                          type="checkbox"
                          name="hideDateOfBirth"
                          register={register}
                        />
                        <label className={`${styles.font}`}>
                          Hide this in my profie
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-auto col-md mb-2 md-mb-0">
                      <Controller
                        name="gender"
                        render={({
                          field: { onChange, value, ref, ...rest },
                        }) => (
                          <SelectInputField
                            controlStyle={selectStyles}
                            placeholder="Gender"
                            rest={rest}
                            value={value}
                            ref={ref}
                            options={genderOptions}
                            onChange={onChange}
                          />
                        )}
                        control={control}
                        defaultValue={""}
                      />
                      <div className="error-msg">{errors.gender?.message}</div>
                      <div className="d-flex gap-1 pt-2">
                        <CheckBoxInput
                          className=""
                          type="checkbox"
                          name="hideGender"
                          register={register}
                        />
                        <label className={`${styles.font}`}>
                          Hide this in my profie
                        </label>
                      </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col mb-3 md-mb-0">
                      <InputFieldWrapper
                        name="website"
                        placeholder="Website"
                        error={errors.website}
                        register={register}
                        getFieldState={getFieldState}
                        type="text"
                        parentClassName={`${styles.userFormInput} p-3 d-flex`}
                      />
                    </div>
                    <div className="col-sm-auto col-md mb-2 md-mb-0">
                      <Controller
                        name="country"
                        render={({
                          field: { onChange, value, ref, ...rest },
                        }) => (
                          <SelectInputField
                            controlStyle={selectStyles}
                            placeholder="Country"
                            rest={rest}
                            value={value}
                            ref={ref}
                            options={countryOptions}
                            onChange={onChange}
                          />
                        )}
                        control={control}
                        defaultValue={""}
                      />
                      <div className="error-msg">{errors.country?.message}</div>
                      <div className="d-flex gap-1 pt-2">
                        <CheckBoxInput
                          className=""
                          type="checkbox"
                          name="hideGender"
                          register={register}
                        />
                        <label className={`${styles.font}`}>
                          Hide this in my profie
                        </label>
                      </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <h3 className={`${styles.h3}`}>Your Bio</h3>
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <TextareaField
                        name="bio"
                        placeholder="Type Something"
                        register={register}
                        className={`${styles.userFormTextarea} p-3 d-flex border-0`}
                        error={errors.bio}
                      />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                      <h3 className={`${styles.h3}`}>Affinity</h3>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-sm-auto col-md mb-2 md-mb-0">
                      <Controller
                        name="relationshipStatus"
                        render={({
                          field: { onChange, value, ref, ...rest },
                        }) => (
                          <SelectInputField
                            controlStyle={selectStyles}
                            placeholder="Relationship Status"
                            rest={rest}
                            value={value}
                            ref={ref}
                            options={relatonShipOptions}
                            onChange={onChange}
                          />
                        )}
                        control={control}
                        defaultValue={""}
                      />
                      <div className="error-msg">
                        {errors.relationshipStatus?.message}
                      </div>
                      <div className="d-flex gap-1 pt-2">
                        <CheckBoxInput
                          className=""
                          type="checkbox"
                          name="hideRelationshipStatus"
                          register={register}
                        />
                        <label className={`${styles.font}`}>
                          Hide this in my profie
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-auto col-md">
                      <Controller
                        name="hereFor"
                        render={({
                          field: { onChange, value, ref, ...rest },
                        }) => (
                          <SelectInputField
                            controlStyle={selectStyles}
                            placeholder="Here For"
                            rest={rest}
                            value={value}
                            ref={ref}
                            options={hereForOptions}
                            onChange={onChange}
                          />
                        )}
                        control={control}
                        defaultValue={""}
                      />
                      <div className="error-msg">{errors.hereFor?.message}</div>
                      <div className="d-flex gap-1 pt-2">
                        <CheckBoxInput
                          className=""
                          type="checkbox"
                          name="hideHereFor"
                          register={register}
                        />
                        <label className={`${styles.font}`}>
                          Hide this in my profie
                        </label>
                      </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col d-flex justify-content-end mt-2">
                      <Button
                        text="Reset"
                        type="reset"
                        className="onboarding-rest-bttn bg-white"
                        handler={handleReset}
                      />
                      <Button
                        type="submit"
                        text="Update"
                        className="onboarding-update-bttn"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
