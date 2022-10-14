import { useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { SelectOptions } from "../../../../constants/loginTypes";
import { CountryCodesInterface } from "../../../../interfaces/auth-interface";
import AuthService from "../../../../services/AuthService";
import SelectInputField from "../SelectInputField";

interface CountryCode {
  control: any;
  name: string;
  placeholder: string;
}

const CountryCode = ({ control, name, placeholder }: CountryCode) => {
  const [countryOptions, setCountryOptions] = useState([
    { label: "", value: "" },
  ]);

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  const fetchCountryCodes = useCallback(async () => {
    const countryCode = await AuthService.getCountryCodes();
    if (countryCode) {
      const options = countryCode.map(
        ({ dial_code, code }: CountryCodesInterface) => {
          return {
            label: `${dial_code} (${code})`,
            value: dial_code,
          };
        }
      );
      setCountryOptions([...options]);
    }
  }, []);

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <SelectInputField
          placeholder={placeholder}
          rest={rest}
          ref={ref}
          options={countryOptions}
          onChange={onChange}
          className="sign-form-select"
          controlStyle={{
            fontSize: 14,
            backgroundColor: "#fff",
            color: "#3f434a",
            height: "54px",
            marginBottom: 0,
          }}
        />
      )}
      control={control}
      defaultValue={""}
    />
  );
};

export default CountryCode;
