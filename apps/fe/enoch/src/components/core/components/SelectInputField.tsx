import React from "react";
import Select from "react-select";

const controlStyleDefaultValue = {
  height: "60px",
  border: "none",
  backgroundColor: "#F2F7FC",
  marginBottom: "10px",
  overflow: "hidden",
  fontSize: "18px",
};
interface SelectInputProps {
  options?: any;
  placeholder?: string;
  onChange?: any;
  rest?: any;
  className?: string;
  controlStyle?: object;
  value?: any;
}

const SelectInputField = React.forwardRef(
  (
    {
      className = "",
      controlStyle,
      options,
      placeholder,
      onChange,
      value = null,
      ...rest
    }: SelectInputProps,
    ref
  ) => {
    const [selectedOption, setSelectedOption] = React.useState(null);

    React.useEffect(() => {
      if (value) {
        const foundOption = options.find(
          (c: { value: any }) => c.value === value
        );
        setSelectedOption(foundOption);
      }
    }, [value, options]);

    return (
      <Select
        placeholder={placeholder}
        ref={() => ref}
        className={className}
        options={options}
        instanceId="selectbox"
        onChange={(e: any) => {
          onChange(e?.value), setSelectedOption(e);
        }}
        value={selectedOption}
        {...rest}
        styles={{
          control: (base) => ({
            ...base,
            ...controlStyleDefaultValue,
            ...controlStyle,
          }),
          input: (base) => ({
            ...base,
          }),
          placeholder: (base) => ({
            ...base,
            padding: "0",
          }),
        }}
      />
    );
  }
);

export default SelectInputField;
