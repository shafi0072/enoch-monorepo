import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../core/lib/bootstrap/Button/Button";
import CheckBox from "../../../core/lib/bootstrap/Form/CheckBox";
import TextareaField from "../../../core/components/TextareaField";
import SelectInputField from "../../../core/components/SelectInputField";
import styles from "./Experience.module.css";
import { InputFieldWrapper } from "../../../core";
import AuthService from "../../../../services/AuthService";
import { messages } from "../../../../locals/en-US";

export interface ExperienceFormProps {
  jobTitle: string;
  employementType: string;
  company: string;
  location: string;
  isCurrentlyWorking: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  industry: string;
  description: string;
}

const EmploymentOptions = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "freelancer", label: "freelancer" },
  { value: "internship", label: "Internship" },
  { value: "trainee", label: "Trainee" },
];

const Month = [
  { value: "Jan", label: "Jan" },
  { value: "Feb", label: "Feb" },
  { value: "Mar", label: "Mar" },
  { value: "Apr", label: "Apr" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "July", label: "July" },
  { value: "Aug", label: "Aug" },
  { value: "Sep", label: "Sep" },
  { value: "Oct", label: "Oct" },
  { value: "Nov", label: "Nov" },
  { value: "Dec", label: "Dec" },
];

const selectStyles = {
  marginBottom: "0px",
  backgroundColor: "#fff",
  border: "2px solid #dee2e6",
  fontSize: "14px",
  height: "auto",
  borderRadius: "0",
  fontFamily: "Poppins",
};

const ExperienceForm = () => {
  const experienceFormSchema = React.useMemo(() => {
    return Yup.object().shape({
      jobTitle: Yup.string().required(messages.userExperience.jobTitle),
      employementType: Yup.string().required(
        messages.userExperience.employementType
      ),
      company: Yup.string().required(messages.userExperience.company),
      location: Yup.string().required(messages.userExperience.location),
      isCurrentlyWorking: Yup.boolean(),
      startMonth: Yup.string().required(messages.userExperience.startMonth),
      startYear: Yup.string().required(messages.userExperience.startYear),
      endMonth: Yup.string().required(messages.userExperience.endMonth),
      endYear: Yup.string().required(messages.userExperience.endYear),
      industry: Yup.string().required(messages.userExperience.industry),
      description: Yup.string().required(messages.userExperience.description),
    });
  }, []);

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
    control,
  } = useForm<ExperienceFormProps>({
    resolver: yupResolver(experienceFormSchema),
    mode: "onChange",
  });

  const onSubmit = React.useCallback(async (data: any) => {
    await AuthService.addUserExperince(data);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-1"
    >
      <InputFieldWrapper
        label="Job Title"
        name="jobTitle"
        placeholder="Ex. Retail Sales Manager"
        register={register}
        getFieldState={getFieldState}
        error={errors.jobTitle}
        type="text"
        parentClassName="sign-form-input border border-2"
      />
      <div>
        <div className={`${styles.label} text-muted pb-1`}>Employment type</div>
        <Controller
          name="employementType"
          render={({ field: { onChange, value, ref, ...rest } }) => (
            <SelectInputField
              placeholder="-"
              options={EmploymentOptions}
              rest={rest}
              value={value}
              ref={ref}
              onChange={onChange}
              controlStyle={selectStyles}
            />
          )}
          control={control}
          defaultValue={""}
        />
      </div>
      <InputFieldWrapper
        label="Company"
        name="company"
        placeholder="Ex. Capcoin"
        register={register}
        getFieldState={getFieldState}
        error={errors.company}
        type="text"
        parentClassName="sign-form-input border border-2"
      />
      <InputFieldWrapper
        label="Location"
        name="location"
        placeholder="Ex. London, United kingdom"
        register={register}
        getFieldState={getFieldState}
        error={errors.location}
        type="text"
        parentClassName="sign-form-input border border-2"
      />
      <CheckBox
        label="I am currently working in this role"
        register={register}
        name="isCurrentlyWorking"
      />
      <div>
        <div className={`${styles.label} text-muted pb-1`}>Start Date</div>
        <div className="d-flex gap-2 w-100">
          <div className="w-100">
            <Controller
              name="startMonth"
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <SelectInputField
                  placeholder="-"
                  rest={rest}
                  value={value}
                  ref={ref}
                  options={Month}
                  onChange={onChange}
                  controlStyle={selectStyles}
                />
              )}
              control={control}
              defaultValue={""}
            />
          </div>
          <div className="w-100">
            <Controller
              name="startYear"
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <SelectInputField
                  placeholder="-"
                  options={[
                    { value: "2019", label: "2019" },
                    { value: "2020", label: "2020" },
                  ]}
                  rest={rest}
                  value={value}
                  ref={ref}
                  onChange={onChange}
                  controlStyle={selectStyles}
                />
              )}
              control={control}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.label} text-muted pb-1`}>End Date</div>
        <div className="d-flex gap-2">
          <div className="w-100">
            <Controller
              name="endMonth"
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <SelectInputField
                  placeholder="-"
                  rest={rest}
                  value={value}
                  ref={ref}
                  options={Month}
                  onChange={onChange}
                  controlStyle={selectStyles}
                />
              )}
              control={control}
              defaultValue={""}
            />
          </div>
          <div className="w-100">
            <Controller
              name="endYear"
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <SelectInputField
                  placeholder="-"
                  options={[
                    { value: "2019", label: "2019" },
                    { value: "2020", label: "2020" },
                  ]}
                  rest={rest}
                  value={value}
                  ref={ref}
                  onChange={onChange}
                  controlStyle={selectStyles}
                />
              )}
              control={control}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <InputFieldWrapper
        label="Industry"
        name="industry"
        placeholder="Type Something"
        register={register}
        getFieldState={getFieldState}
        error={errors.industry}
        type="text"
        parentClassName="sign-form-input border border-2"
      />
      <TextareaField
        label="Description"
        name="description"
        placeholder="Type Something"
        register={register}
        error={errors.description}
        className="sign-form-input border border-2 p-2"
      />
      <div className="d-flex justify-content-end">
        <Button type="submit" label="Save" />
      </div>
    </form>
  );
};

export default ExperienceForm;
