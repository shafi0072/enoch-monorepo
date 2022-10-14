import React, { useState, useCallback } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import SelectInputField from "../../../../core/components/SelectInputField";
import PostUIWrapper from "./PostUIWrapper";

import { PollDurationEnums } from "../../../../../constants/post-enums";

const selectStyles = {
  marginBottom: "0px",
  padding: "4px",
  fontSize: "16px",
  height: "auto",
  borderRadius: "0",
  fontFamily: "Poppins",
  backgroundColor: "#fff",
  border: "1px solid #d4d8dd",
};

const durations = [
  { value: PollDurationEnums.ONE_DAY, label: "1 Day" },
  { value: PollDurationEnums.THREE_DAYS, label: "3 Days" },
  { value: PollDurationEnums.ONE_WEEK, label: "1 Week" },
  { value: PollDurationEnums.TWO_WEEKS, label: "2 Week" },
];

const CreatePoll = ({ register, control, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onOptionAddition = useCallback(() => {
    if (fields.length === 4) {
      return;
    } else {
      append({ option: "" });
    }
  }, []);

  return (
    <PostUIWrapper>
      <h2 className="posting-step-hd-title">Create a poll</h2>
      <div className="posting-steps-poll">
        <form>
          <div className="steps-poll-input-grp">
            <div className="poll-input-label">Your question</div>
            <div className="poll-input-field">
              <input
                type="text"
                placeholder="E.g., How do you commute to work?"
                {...register("question")}
              />
            </div>
          </div>

          {fields.map((_, index: number) => (
            <div key={index} className="steps-poll-input-grp">
              <div className="poll-input-label">
                Option
                {index === 0 || index === 1 ? null : (
                  <span
                    className="poll-option-extra-remove"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </span>
                )}
              </div>
              <div className="poll-input-field">
                <input
                  placeholder="Eg. Public Transportation"
                  {...register(`options.${index}.option`, { required: true })}
                />
              </div>
              <div className="errorMsg">
                {errors.options?.[index]?.option?.message}
              </div>
            </div>
          ))}

          {fields.length !== 4 && (
            <div className="step-poll-addOption">
              <a className="btn poll-addOption-btn" onClick={onOptionAddition}>
                + Add Options
              </a>
            </div>
          )}

          <div className="steps-poll-input-grp Poll-duration-dropdown">
            <div className="poll-input-label">Poll duration</div>
            <div className="event-form-input">
              <Controller
                name="duration"
                render={({ field: { onChange, value, ref, ...rest } }) => (
                  <SelectInputField
                    controlStyle={selectStyles}
                    placeholder="Poll duration"
                    rest={rest}
                    value={value}
                    ref={ref}
                    options={durations}
                    onChange={onChange}
                  />
                )}
                control={control}
                defaultValue={""}
              />
            </div>
          </div>
          <p className="poll-bottm-txt">
            We don’t allow requests for political opinions, medical information
            or other sensitive data.
          </p>
        </form>
      </div>
    </PostUIWrapper>
  );
};

export default CreatePoll;
