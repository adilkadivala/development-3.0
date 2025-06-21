import { useId } from "react";

interface Input {
  type: string;
  className: string;
}

const Input = ({ type, className }: Input) => {
  const id = useId();
  return <input type={type} id={id} className={className} />;
};

export default Input;
