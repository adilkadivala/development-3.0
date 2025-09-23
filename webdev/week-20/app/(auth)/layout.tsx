import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>auth header</div>
      {children}
      <div>auth footer</div>
    </div>
  );
}
