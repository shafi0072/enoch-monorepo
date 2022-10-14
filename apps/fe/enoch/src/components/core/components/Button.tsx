type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  handler?: any;
  textColor?: string;
  disabled?: boolean;
};

export const Button = ({
  text,
  type,
  className,
  handler,
  textColor,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={handler}
      type={type}
      className={className}
      style={{ color: textColor }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
