"use client";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { EyeClosed, Eye } from "lucide-react";

import { useState } from "react";

export function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Card className="relative text-lg m-4 md:m-0 w-[90%] !py-5 !px-4 max-w-[1440px0] flex flex-row  justify-center items-center gap-4 shadow-2xl">
      <div className=" w-[90%] !max-w-[500px] !pl-3 flex flex-col gap-4 items-center">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Sign In
        </h1>
        <p className="leading-7 text-center text-muted-foreground text-lg">
          Welcome back! Please enter your details.
        </p>

        <div className="w-full py-4 px-8 ">
          <label className="block mb-1 font-medium text-muted-foreground text-lg" htmlFor="email" >
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            className="py-0 text-lg rounded-none border border-muted-foreground/50 border-x-0 border-t-0 shadow-none"
          />
        </div>
        <div className="w-full py-4 px-8 ">
          <label className="block mb-1 font-medium text-muted-foreground text-lg" htmlFor="password">
            Password
          </label>
          <span className="flex justify-between items-center border rounded-md px-3 py-2">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
            className="py-0 text-lg rounded-none border border-muted-foreground/50 border-x-0 border-t-0 shadow-none"
            />
            {passwordVisible ? (
              <EyeClosed
                className="cursor-pointer mr-3"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="cursor-pointer mr-3"
                onClick={togglePasswordVisibility}
              />
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 w-full">
          <p className="text-muted-foreground text-md">Forgot your password?</p>
        </div>
        <button className="w-[150px] justify-center text-lg group flex items-center px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all duration-75">
          Sign In
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="group-hover:animate-accordion-open inline-block h-7 w-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none ml-1"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      
    </Card>
  );
}
