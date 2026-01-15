"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UserAccountDetails({ user }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    addresses: user?.addresses || [
      { street: "", city: "", state: "", zipCode: "", country: "" },
    ],
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newAddresses = [...prev.addresses];
      newAddresses[index] = { ...newAddresses[index], [field]: value };
      return { ...prev, addresses: newAddresses };
    });
  };

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        { street: "", city: "", state: "", zipCode: "", country: "" },
      ],
    }));
  };

  const handleRemoveAddress = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/me/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      addresses: user?.addresses || [
        { street: "", city: "", state: "", zipCode: "", country: "" },
      ],
    });
    setIsEditing(false);
  };

  return (
    <section id="user-account-details" className="w-full">
      <h1 className="text-2xl font-bold mb-2 md:text-3xl ">
        Account Information
      </h1>
      <hr className="mb-6 h-2 w-full md:w-1/2 border-0 bg-red-600" />

      {/* Personal Information */}
      <div className="mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="flex flex-col">
            <Label htmlFor="firstName" className="text-sm font-semibold mb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className={isEditing ? "" : "bg-gray-100"}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="lastName" className="text-sm font-semibold mb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={isEditing ? "" : "bg-gray-100"}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <Label htmlFor="email" className="text-sm font-semibold mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={isEditing ? "" : "bg-gray-100"}
            />
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <span className="w-full">

          <h1 className="text-2xl font-bold mb-2 md:text-3xl ">
            Addresses
          </h1>
          <hr className="mb-6 h-2 w-full md:w-1/2 border-0 bg-red-600" />
            </span>
          {isEditing && (
            <Button onClick={handleAddAddress} variant="outline" size="sm">
              Add Address
            </Button>
          )}
        </div>
        <div className="space-y-6">
          {formData.addresses.map((address, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:col-span-2">
                  <Label
                    htmlFor={`street-${index}`}
                    className="text-sm font-semibold mb-2"
                  >
                    Street Address
                  </Label>
                  <Input
                    id={`street-${index}`}
                    type="text"
                    value={address.street || ""}
                    onChange={(e) =>
                      handleAddressChange(index, "street", e.target.value)
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-100"}
                    placeholder="Street address"
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor={`city-${index}`}
                    className="text-sm font-semibold mb-2"
                  >
                    City
                  </Label>
                  <Input
                    id={`city-${index}`}
                    type="text"
                    value={address.city || ""}
                    onChange={(e) =>
                      handleAddressChange(index, "city", e.target.value)
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-100"}
                    placeholder="City"
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor={`state-${index}`}
                    className="text-sm font-semibold mb-2"
                  >
                    State
                  </Label>
                  <Input
                    id={`state-${index}`}
                    type="text"
                    value={address.state || ""}
                    onChange={(e) =>
                      handleAddressChange(index, "state", e.target.value)
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-100"}
                    placeholder="State"
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor={`zipCode-${index}`}
                    className="text-sm font-semibold mb-2"
                  >
                    Zip Code
                  </Label>
                  <Input
                    id={`zipCode-${index}`}
                    type="text"
                    value={address.zipCode || ""}
                    onChange={(e) =>
                      handleAddressChange(index, "zipCode", e.target.value)
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-100"}
                    placeholder="Zip code"
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor={`country-${index}`}
                    className="text-sm font-semibold mb-2"
                  >
                    Country
                  </Label>
                  <Input
                    id={`country-${index}`}
                    type="text"
                    value={address.country || ""}
                    onChange={(e) =>
                      handleAddressChange(index, "country", e.target.value)
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-100"}
                    placeholder="Country"
                  />
                </div>
                {isEditing && formData.addresses.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      onClick={() => handleRemoveAddress(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <>
            <Button onClick={handleSave} disabled={isSaving} variant="default">
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
