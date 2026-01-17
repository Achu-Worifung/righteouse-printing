'use client';
import { Label } from "../label";
import { Input } from "../input";
import { SaveChangesBtn } from "./save-changes-btn";
import Link from "next/link";
import { EyeClosed, Eye } from "lucide-react";
import { useState } from "react";
export function PasswordForm() {
    const [passwordVisible, setPasswordVisible] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const[password, setPassword] = useState({
        current: "",
        new: "",
        confirm: "",
    })
  return (
    <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md grid grid-cols-1 gap-4  py-4 ">
      <div>
        <h1 className="text-xl md:text-3xl">Change Password</h1>
        <p className="text-[#570009]">Update your password below.</p>
      </div>
      <div className="w-full py-4  ">
          <span className="flex justify-between items-center ">
            <Label
              htmlFor="current-password"
            >
              Current Password
            </Label>
            <Link
              href="/loginhelp"
              className="ml-auto text-sm  underline-offset-2 hover:underline"
            >
              Forgot your password?
            </Link>
          </span>
          <span className="flex justify-between items-center border border-muted-foreground/50 focus-within:border-black rounded-md  ">
            <Input
              id="current-password"
              required
              onChange={(e)=>{setPassword({...password, current: e.target.value})}}
              type={passwordVisible.current ? "text" : "password"}
              className=" py-0 text-lg border-0 focus:border-0 focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {passwordVisible.current ? (
              <EyeClosed
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, current: false})}
              />
            ) : (
              <Eye
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, current: true})}
              />
            )}
          </span>
        </div>
      <div className="w-full py-4  ">
          <span className="flex justify-between items-center ">
            <Label
              htmlFor="new-password"
            >
              New Password
            </Label>
           
          </span>
          <span className="flex justify-between items-center border border-muted-foreground/50 focus-within:border-black rounded-md  ">
            <Input
              id="new-password"
              required
              onChange={(e)=>{setPassword({...password, new: e.target.value})}}
              type={passwordVisible.new ? "text" : "password"}
              className=" py-0 text-lg border-0 focus:border-0 focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {passwordVisible.new ? (
              <EyeClosed
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, new: false})}
              />
            ) : (
              <Eye
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, new: true})}
              />
            )}
          </span>
        </div>
      <div className="w-full py-4  ">
          <span className="flex justify-between items-center ">
            <Label
              htmlFor="confirm-new-password"
            >
              Confirm New Password
            </Label>
          </span>
          <span className="flex justify-between items-center border border-muted-foreground/50 focus-within:border-black rounded-md  ">
            <Input
              id="confirm-new-password"
              required
              onChange={(e)=>{setPassword({...password, confirm: e.target.value})}}
              type={passwordVisible.confirm ? "text" : "password"}
              className=" py-0 text-lg border-0 focus:border-0 focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {passwordVisible.confirm ? (
              <EyeClosed
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, confirm: false})}
              />
            ) : (
              <Eye
                className="cursor-pointer w-[40px] text-gray-600 hover:text-black"
                onClick={()=>setPasswordVisible({...passwordVisible, confirm: true})}
              />
            )}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">

        <SaveChangesBtn text="Save Changes" onClick={() => {}} />
        </div>
    </div>
  );
}
