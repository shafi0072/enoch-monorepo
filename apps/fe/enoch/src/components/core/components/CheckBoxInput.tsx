type CheckBoxProps = {
  type: string;
  register?: any;
  name?: string;
  error?: any;
  className?: string;
};

export const CheckBoxInput = ({
  type = "checkbox",
  register,
  name,
  error,
  className,
}: CheckBoxProps) => {
  return (
    <div className="d-flex align-items-center">
      <input type={type} {...register(name)} className={className} />
      {error && <div className="error-msg">{error?.message}</div>}
    </div>
  );
};
