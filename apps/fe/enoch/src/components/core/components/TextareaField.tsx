interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  register: any;
  className?: string;
  error?: any;
}

const TextareaField = ({
  className,
  name,
  register,
  placeholder,
  label,
  error,
}: TextareaProps) => {
  return (
    <div className="d-flex flex-column gap-2">
      {label && <label>{label}</label>}
      <textarea
        className={className}
        placeholder={placeholder}
        {...register(name)}
      ></textarea>
      <div className="error-msg">{error?.message}</div>
    </div>
  );
};

export default TextareaField;
