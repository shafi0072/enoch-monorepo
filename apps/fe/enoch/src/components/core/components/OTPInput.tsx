type OTPInputProps = {
  type: string;
  className: string;
  value: string;
};

export const OTPInput = ({ type, className, value }: OTPInputProps) => {
  return <input type={type} className={className} value={value} />;
};
