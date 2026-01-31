"use client";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

import { Location } from "@/lib/types";
export function UserAccountDetails({ user }: { user: any }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [addingMethod, setAddingMethod] = useState(false);
  console.log(
    "first name:",
    user.firstName,
    "last name:",
    user.lastName,
    "email:",
    user.email,
  );
  return (
    <div className="border rounded-none border-gray-300 max-w-3xl mx-auto p-4 bg-offwhite shadow-md grid grid-cols-1 gap-6 md:grid-cols-2 py-4 ">
      <div className="col-span-2">
      <p className=" relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center">
          Account Details
        </p>
      <p className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
          Update your personal information below.</p>
      </div>
      <div className="col-span-2 md:col-span-1">
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
          className="w-full border border-gray-300 rounded-none p-2"
          defaultValue={user.firstName}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
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
          className="w-full border border-gray-300 rounded-none p-2"
          defaultValue={user.lastName}
        />
      </div>
      <div className="col-span-2 ">
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
          className="w-full border border-gray-300 rounded-none p-2"
          defaultValue={user.email}
        />
      </div>

      <Button
        type="submit"
        className="col-span-2 md:col-span-1 md:col-start-2 bg-burgundy text-white cursor-pointer hover:bg-hoverprimary hover:text-hovertext rounded-none py-2"
      >
        Save Changes
      </Button>
    </div>
  );
}
