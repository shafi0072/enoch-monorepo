import React, { useCallback, useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./ProfileInfo.module.css";
import { CheckBoxInput, InputFieldWrapper } from "../../../core";
import Button from "../../../core/lib/bootstrap/Button/Button";
import { Controller, useForm } from "react-hook-form";
import SelectInputField from "../../../core/components/SelectInputField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccountType,
  GenderEnum,
  OnBoardingScreen,
  ReasonHereFor,
  RelationshipStatus,
} from "../../../../constants/onboarding-enums";
import TextareaField from "../../../core/components/TextareaField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "./DateInput";
import { countries } from "../../OnboardingComponents/PersonalInformationComponent/selectData";
import AuthService from "../../../../services/AuthService";
import onboardingService from "../../../../services/onboardingService";

const selectStyles = {
  marginBottom: "0px",
  backgroundColor: "#F2F7FC",
  padding: "7px",
  fontSize: "14px",
  height: "auto",
  borderRadius: "0",
  fontFamily: "Poppins",
};

type SelectOptions = {
  value: string;
  label: string;
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

const profileFormSchema = Yup.object().shape({
  dateOfBirth: Yup.date(),
  hideDateOfBirth: Yup.boolean(),
  gender: Yup.string(),
  country: Yup.string(),
  bio: Yup.string(),
  relationshipStatus: Yup.string(),
  hideRelationshipStatus: Yup.boolean(),
  hereFor: Yup.string(),
  hideHereFor: Yup.boolean(),
  website: Yup.string().when("accountType", {
    is: AccountType.Business,
    then: Yup.string(),
  }),
  firstName: Yup.string(),
  lastName: Yup.string(),
});

const ProfileForm = ({ handleClose }: { handleClose: () => void }) => {
  const {
    register,
    getFieldState,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileFormSchema),
  });
  const dateRef = useRef<any>(null);

  const userData = (user: any) => {
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("bio", user.bio);
    setValue("dateOfBirth", new Date(user.dateOfBirth));
    setValue("gender", user?.gender || "");
    setValue("website", user?.website || "");
    setValue("hideDateOfBirth", user?.hideDateOfBirth ?? false);
    setValue("country", user?.country);
    setValue("hereFor", user?.hereFor);
    setValue("relationshipStatus", user?.relationshipStatus);
    setValue("hideRelationshipStatus", user?.hideRelationshipStatus ?? false);
    setValue("hideGender", user?.hideGender ?? false);
    setValue("hideHereFor", user?.hideHereFor ?? false);
    setValue("hideRelationshipStatus", user?.hideRelationshipStatus ?? false);
  };

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      userData(user);
    }
  }, []);

  const onSubmit = useCallback(async (data: any) => {
    const res = await onboardingService.addOnboardingInformation({
      ...data,
      activeOnBoardingScreen:
        OnBoardingScreen.UpdateDetailsAfterOnBoardingCompletion,
    });
    if (!res) return;
    AuthService.updateUser(res?.data?.addOnboardingDetails ?? {});
  }, []);

  const handleReset = () => {
    reset();
  };

  return (
    <div className={`${styles.profileForm} d-flex flex-column gap-3`}>
      <div
        className={`${styles.profileFormHead} d-flex align-items-center justify-content-between`}
      >
        <h3>Edit Profile</h3>
        <div
          onClick={handleClose}
          className="d-flex align-items-center justify-content-center"
        >
          <IoMdCloseCircleOutline size={24} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gap-2">
          <div className="col mb-2 md-mb-0">
            <InputFieldWrapper
              name="firstName"
              placeholder="First name"
              register={register}
              getFieldState={getFieldState}
              type="text"
              parentClassName={`${styles.profileFormInput} d-flex`}
            />
            <div className={`${styles.font} pt-2`}>
              We will not show your name in your profile
            </div>
          </div>
          <div className="col mb-2 md-mb-0">
            <InputFieldWrapper
              name="lastName"
              placeholder="Last name"
              register={register}
              getFieldState={getFieldState}
              type="text"
              parentClassName={`${styles.profileFormInput} d-flex`}
            />
            <div className={`${styles.font} pt-2`}>
              We will not show your name in your profile
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col mb-2 md-mb-0">
            <div className={`${styles.profileFormInput} d-flex`}>
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
            <div className="d-flex gap-1 pt-2">
              <CheckBoxInput
                className=""
                type="checkbox"
                name="hideDateOfBirth"
                register={register}
              />
              <label className={`${styles.font}`}>Hide this in my profie</label>
            </div>
          </div>
          <div className="col-sm-auto col-md mb-2 md-mb-0">
            <Controller
              name="gender"
              render={({ field: { onChange, value, ref, ...rest } }) => (
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
          </div>
          <div className="w-100"></div>
          <div className="col mb-2 md-mb-0">
            <InputFieldWrapper
              name="website"
              placeholder="Website"
              register={register}
              getFieldState={getFieldState}
              type="text"
              parentClassName={`${styles.profileFormInput} d-flex`}
            />
          </div>

          <div className="col-sm-auto col-md mb-2 md-mb-0">
            <Controller
              name="country"
              render={({ field: { onChange, value, ref, ...rest } }) => (
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
          </div>
          <div className="w-100"></div>
          <div className="col mb-2 md-mb-0">
            <TextareaField
              label="Your Bio"
              name="bio"
              placeholder="Type Something"
              register={register}
              className={`${styles.profileFormInput} p-3 d-flex border-0`}
            />
          </div>
          <div className="w-100"></div>
          <div className="col-sm-auto col-md mb-2 md-mb-0">
            <Controller
              name="relationshipStatus"
              render={({ field: { onChange, value, ref, ...rest } }) => (
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
            <div className="d-flex gap-1 pt-2">
              <CheckBoxInput
                className=""
                type="checkbox"
                name="hideRelationshipStatus"
                register={register}
              />
              <label className={`${styles.font}`}>Hide this in my profie</label>
            </div>
          </div>
          <div className="col-sm-auto col-md mb-2 md-mb-0">
            <Controller
              name="hereFor"
              render={({ field: { onChange, value, ref, ...rest } }) => (
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
            <div className="d-flex gap-1 pt-2">
              <CheckBoxInput
                className=""
                type="checkbox"
                name="hideHereFor"
                register={register}
              />
              <label className={`${styles.font}`}>Hide this in my profie</label>
            </div>
          </div>
        </div>
        <div className="d-flex pt-4 gap-2 justify-content-end">
          <Button label="Reset" onClick={handleReset} />
          <Button
            type="submit"
            label="Save"
            bgColor="#7521e2"
            textColor="#fff"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
