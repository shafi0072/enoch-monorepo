import React from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import DatePicker from "react-datepicker";
import SelectInputField from "../../../../../core/components/SelectInputField";
import DateInput from "../../../../OnboardingComponents/PersonalInformationComponent/DateInput";
import styles from "../ManageShop.module.css";

const selectStyles = {
  fontSize: "14px",
  border: "1px solid #e8e9eb",
  padding: "8px",
  backgroundColor: "transparent",
  height: "48px",
  margin: 0,
  verticalAlign: "middle",
};

const CreateCoupon = ({ setPage }: any) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: [{ couponName: "", discount: "", amount: "", validTill: "" }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "test",
  });

  const dateRef = React.useRef<any>(null);
  return (
    <div className="mamage_media_body_content_avex_coupen bg-white">
      <div className="main_head">
        <h2>Create a coupon</h2>
        <div className="coupen_btns">
          <button className="skp_avex">Skip</button>
          <button className="hassan-con">Save & Continue</button>
        </div>
      </div>

      <div className="main_to_list_sec">
        <div className="filter-main-avex">
          {fields.map((item, index) => (
            <div key={index} className="filters_avex">
              <ul>
                <li>
                  <div className="prple_cirle">
                    <span>{index + 1}</span>
                  </div>
                </li>
                <li>
                  <div className="cupn_nme">
                    <input
                      placeholder="Coupon Name"
                      {...register(`test.${index}.couponName`)}
                    />
                  </div>
                </li>
                <li>
                  <Controller
                    name={`test.${index}.discount`}
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                      <SelectInputField
                        controlStyle={selectStyles}
                        placeholder="Select Discount (%)"
                        rest={rest}
                        value={value}
                        ref={ref}
                        onChange={onChange}
                      />
                    )}
                    control={control}
                    defaultValue={""}
                  />
                </li>
                <li>
                  <Controller
                    name={`test.${index}.amount`}
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                      <SelectInputField
                        controlStyle={selectStyles}
                        placeholder="Select Amount"
                        rest={rest}
                        value={value}
                        ref={ref}
                        onChange={onChange}
                      />
                    )}
                    control={control}
                    defaultValue={""}
                  />
                </li>
                <li>
                  <div className="Select-discount_cop">
                    <Controller
                      name={`test.${index}.validTill`}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <DatePicker
                          {...rest}
                          onChange={onChange}
                          placeholderText="Valid Till"
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
                </li>
                <li>
                  <div
                    onClick={() => {
                      append({
                        couponName: "",
                        discount: "",
                        amount: "",
                        validTill: "",
                      });
                    }}
                    className={styles.addBtn}
                  >
                    <span>
                      <MdAdd size={25} color="#ffffff" />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="title_aded">
          <h3>Added coupon</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
