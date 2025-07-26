import { DarkModeToggle } from "@/common/darkmode-toggle";
import Login from "./_components/login";

export const metadata = {
    title: "Warluk | Login"
};

export default function LoginPage() {
    return (
        <div>
            {/* <DarkModeToggle/> */}
            <Login/>
        </div>
    )
}