type CheckBoxProps = {
  type: string;
  register?: any;
  name?: string;
  error?: any;
};

export const CheckboxInput = ({ type, register, name, error }: CheckBoxProps) => {
  return (
    <>
      <input type={type} {...register(name)} />
      <div className="error-msg">{error?.message}</div>
    </>
  );
};
