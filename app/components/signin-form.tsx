"use client";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { EyeClosed, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./ui/logo";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Card className="relative text-lg   md:m-0 w-full max-w-lg !py-5 !px-4  flex flex-row  justify-center items-center gap-4 shadow-2xl">
      <div className=" w-[90%] !max-w-[500px] !pl-3 flex flex-col gap-4 items-center">
        <span className="text-lg font-light flex items-center text-black">
          <Logo /> <h1>RhprintsDesigns</h1>
        </span>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Login to your account
        </h1>
        <p className="leading-7 text-center  text-lg">
          Welcome back! Please enter your details.
        </p>

        <div className="w-full py-4 px-8 ">
          <Label
            htmlFor="email"
            className="mb-1"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            required
          />
        </div>
        <div className="w-full py-4 px-8 ">
          <span className="flex justify-between items-center ">
            <Label
              htmlFor="password"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm  underline-offset-2 hover:underline"
            >
              Forgot your password?
            </Link>
          </span>
          <span className="flex justify-between items-center border border-muted-foreground/50 focus-within:border-black rounded-md  ">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              className=" py-0 text-lg border-0 focus:border-0 focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {passwordVisible ? (
              <EyeClosed
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={togglePasswordVisibility}
              />
            )}
          </span>
        </div>

        <button className="w-[150px] justify-center text-lg group flex items-center  py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all duration-75">
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
        <div className="relative flex items-center gap-4 w-full py-2">
          <div className="flex-1 border-t border-muted-foreground/30" />
          <span className="text-sm  whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 border-t border-muted-foreground/30" />
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full bg-foreground font-medium text-card hover:border hover:border-foreground hover:bg-background hover:text-foreground cursor-pointer"
        >
          <svg
            className="mr-2 size-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="font-medium underline underline-offset-4 hover:font-bold"
          >
            Sign up
          </Link>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      </div>
    </Card>
  );
}
