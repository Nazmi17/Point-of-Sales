import { DarkModeToggle } from "@/common/darkmode-toggle";
import { Coffee } from "lucide-react";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="absolute top-4 left-4">
        <DarkModeToggle />
      </div>
      {children}
    </div>
  );
}
