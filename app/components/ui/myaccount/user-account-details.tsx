import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function UserAccountDetails() {
  return (
    <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md grid grid-cols-1 gap-6 md:grid-cols-2 py-4 ">
      <div className="col-span-2">
        <h1 className=" text-xl md:text-3xl ">Account Details</h1>
        <p className="text-[#570009]">Update your personal information below.</p>
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
        />
      </div>

      <div className="col-span-2">
        <h1 className="text-xl md:text-3xl">Address Details</h1>
        <p className="text-[#570009]">Update your address information below.</p>
      </div>
      <div className="col-span-1 ">
        <Label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Street
        </Label>
        <Input
          type="text"
          id="street"
          name="street"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="col-span-1">
        <Label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City
        </Label>
        <Input
          type="text"
          id="city"
          name="city"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <span className="grid grid-cols-1 md:grid-cols-3 col-span-2 gap-2">
        <div className="col-span-1">
          <Label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State/Province
          </Label>
          <Select>
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
              <SelectValue placeholder="Select Your State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ZIP/Postal Code
          </Label>
          <Input
            type="text"
            id="zip"
            name="zip"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="col-span-1">
          <Label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </Label>
          <Input
            id="country"
            name="country"
            className="w-full border border-gray-300 rounded-md p-2"
            value="United States"
            readOnly
          />
        </div>
      </span>
          <Button type="submit" className="col-2 bg-[#1c3144] text-white  cursor-pointer rounded-none py-2">Save Changes</Button>
    </div>
  );
}
