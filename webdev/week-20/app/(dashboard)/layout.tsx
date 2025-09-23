import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>dashboard header</div>
      {children}
      <div>dashboard footer</div>
    </div>
  );
}
