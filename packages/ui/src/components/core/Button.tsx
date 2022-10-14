type ButtonProps = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  className: string;
  handler?: any;
};

export const Button = ({ text, type, className, handler }: ButtonProps) => {
  return (
    <button onClick={handler} type={type} className={className}>
      {text}
    </button>
  );
};
