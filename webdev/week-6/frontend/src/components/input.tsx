import { useId } from "react";
import type { ChangeEvent } from "react";

interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  value: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  className,
  placeholder,
  value,
  name,
  onChange,
}: InputProps) => {
  const id = useId();
  return (
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
