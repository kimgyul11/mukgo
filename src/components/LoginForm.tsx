import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import FullPageLoader from "./FullPageLoader";
import Login from "./Login";
import Signup from "./Signup";

/* eslint-disable @next/next/no-img-element */
export default function LoginForm() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {toggle ? (
        <Signup setToggle={setToggle} />
      ) : (
        <Login setToggle={setToggle} />
      )}
    </div>
  );
}
