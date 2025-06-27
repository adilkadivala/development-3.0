import { useId } from "react";

interface Button {
  type: "submit" | "reset" | "button" | undefined;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ type, className, children, onClick }: Button) => {
  const id = useId();
  return (
    <button type={type} id={id} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
