"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Logo } from "../components/ui/logo";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { PasswordValidation } from "@/lib/types";


export default function SignUp() {
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });
  const [showValidation, setShowValidation] = useState(false);

  const validatePassword = (pass: string) => {
    const validation: PasswordValidation = {
      minLength: pass.length >= 8,
      hasUppercase: /[A-Z]/.test(pass),
      hasLowercase: /[a-z]/.test(pass),
      hasNumber: /\d/.test(pass),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
    };

    setPasswordValidation(validation);
    return Object.values(validation).every((v) => v);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length > 0) {
      setShowValidation(true);
      validatePassword(newPassword);
    } else {
      setShowValidation(false);
    }
  };

  const isPasswordValid = Object.values(passwordValidation).every((v) => v);

  function validateForm() {
    let isValid = true;

    if (!fname.trim()) {
      toast.error("First name is required");

      isValid = false;
      return;
    }

    if (!lname.trim()) {
      toast.error("Last name is required");

      isValid = false;
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");

      isValid = false;
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");

      isValid = false;
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");

      isValid = false;
      return;
    }

    if (!password) {
      toast.error("Password is required");

      isValid = false;
      return;
    } else if (!isPasswordValid) {
      toast.error("Please enter a valid password");

      isValid = false;

      return;
    }

    return isValid;
  }

  const handleSignUp = () => {
    if (validateForm()) {
      // Proceed with form submission or further processing
      const form = new FormData();
      form.append("firstName", fname);
      form.append("lastName", lname);
      form.append("email", email);
      form.append("password", password);
      form.append("google", "false");

      fetch("/api/auth/signup", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Sign up successful!");
        })
        .catch((error) => {
          console.error("Error during sign-up:", error);
          toast.error("Sign up failed!");
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen">
      <span className="flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-light flex items-center text-black">
          <Logo /> <h1>RhprintsDesigns</h1>
        </span>
        <span>
          <span>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              Sign Up
            </h1>
            <p className="leading-7 text-center  text-lg">
              Represent your passion
            </p>
          </span>
        </span>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {showValidation && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Password Requirements:
              </p>
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordValidation.minLength
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {passwordValidation.minLength ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                At least 8 characters
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordValidation.hasUppercase
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {passwordValidation.hasUppercase ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                One uppercase letter
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordValidation.hasLowercase
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {passwordValidation.hasLowercase ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                One lowercase letter
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordValidation.hasNumber
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {passwordValidation.hasNumber ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                One number
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordValidation.hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {passwordValidation.hasSpecialChar ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                One special character (!@#$%^&*)
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSignUp}
          className="w-[150px] justify-center text-lg group flex items-center  py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all duration-75"
        >
          Sign up
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
          <span className="text-sm  whitespace-nowrap">Or continue with</span>
          <div className="flex-1 border-t border-muted-foreground/30" />
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full max-w-[400px] bg-foreground font-medium text-card hover:border hover:border-foreground hover:bg-background hover:text-foreground cursor-pointer"
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
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium underline underline-offset-4 hover:font-bold"
          >
            Sign in
          </Link>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </span>

      <span className="hidden md:flex">
        <img src={"/childofgod.png"} className="w-full aspect-auto" />
      </span>
    </div>
  );
}
