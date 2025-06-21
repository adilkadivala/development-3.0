import { useId } from "react";

interface Button {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  className: string;
}

const Button = ({ type, text, className }: Button) => {
  const id = useId();
  return (
    <button type={type} id={id} className={className}>
      {text}
    </button>
  );
};

export default Button;
