'use client';
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Logo } from "../components/ui/logo";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function LoginHelp() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const sendVerificationEmail = async () => {
    //logic to send verification email
    
    try {
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success("Verification email sent successfully!");
        setEmailSent(true);
      } else {
        toast.error("Failed to send verification email.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("An error occurred while sending the verification email.");
    }
  };
  return (
    <Card className="relative text-lg   md:m-0 w-full max-w-lg !py-5 !px-4  flex flex-row  justify-center items-center gap-4 shadow-2xl ">
      <div className=" w-[90%] !max-w-[500px] !pl-3 flex flex-col gap-4 items-center py-10">
        <span className="text-lg font-light flex items-center text-black">
          <Logo /> <h1>RhprintsDesigns</h1>
        </span>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Forgot Password?
        </h1>
        <p className="leading-7 text-center  text-lg">
          Don&apos;t worry! We can help you get back into your account.
        </p>
        {!emailSent ? (
          <>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={sendVerificationEmail}
              className="w-fit px-2 justify-center text-lg group flex items-center  py-0.5  border-2 border-black dark:border-white uppercase bg-offwhite text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all duration-75"
            >
              Get Verification Code
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
          </>
        ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-center">
                A verification email has been sent to {email}. Please check your inbox and follow the instructions to reset your password.
              </p>
              <p>If you do not receive the email, please check your spam folder.</p>
              <p>If you still have not received the email, please contact our support team.</p>
              <button
                className="w-[150px] justify-center text-lg group flex items-center  py-0.5  border-2 border-black dark:border-white uppercase bg-offwhite text-black transition duration-200 ease-in-out shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-pointer active:scale-95 transform-all duration-75"
              >
                <Send />
              </button>
            </div>
        )}
      </div>
    </Card>
  );
}
