'use client';
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location } from "@/lib/types";
export function UserAccountDetails({user}: {user: any}) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [addingMethod, setAddingMethod] = useState(false);
  console.log('first name:', user.firstName, 'last name:', user.lastName, 'email:', user.email);
  return (
    <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md grid grid-cols-1 gap-6 md:grid-cols-2 py-4 ">
      <div className="col-span-2">
        <h1 className=" text-xl md:text-3xl text-[#570009] font-semibold ">
          Account Details
        </h1>
        <p className="">Update your personal information below.</p>
      </div>
      <div className="col-span-1">
        <Label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name
        </Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          className="w-full border border-gray-300 rounded-md p-2"
          defaultValue={user.firstName}
        />
      </div>
      <div className="col-span-1">
        <Label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Name
        </Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          className="w-full border border-gray-300 rounded-md p-2"
          defaultValue={user.lastName}
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          className="w-full border border-gray-300 rounded-md p-2"
          defaultValue={user.email}
        />  
      </div>

      <div className="col-span-2">
        <h1 className="text-xl md:text-3xl text-[#570009] font-semibold ">
          Address Details
        </h1>
        <p className="">Update your address information below.</p>
      </div>

       {locations.length === 0  ? (
                <div className="w-full flex justify-center items-center flex-col col-span-2">
                  <Image
                    src="/no location.svg"
                    alt="No Addresses Found"
                    width={100}
                    height={100}
                    className="mt-4"
                  />
                  <h1>No addresses found</h1>
                  <p className="text-center text-gray-500">
                    You have not added any addresses yet.
                  </p>
                  <button
                    onClick={() => setAddingMethod(true)}
                    className="bg-[#570009] text-white rounded-md px-4 py-2 mt-4 cursor-pointer"
                  >
                    Add Address
                  </button>
      
                 
                </div>
              ) : // {/* visa cards start with 4, mastercard with 5, amex with 3 */}
              null}
      
      <Button
        type="submit"
        className="col-2 hover:bg-[#7a020e] text-white  cursor-pointer bg-[#570009] rounded-none py-2"
      >
        Save Changes
      </Button>
    </div>
  );
}
