import { DarkModeToggle } from "@/common/darkmode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button>Hello</Button>
      <DarkModeToggle />
    </div>
  );
}
