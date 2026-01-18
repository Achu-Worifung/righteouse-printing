"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Trash2, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressForm } from "./address-form";

type AddressData = {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
};

type AddressManagerProps = {
  initialAddresses?: AddressData[];
  userId?: string;
};

export function AddressManager({
  initialAddresses = [],
  userId,
}: AddressManagerProps) {
  const [addresses, setAddresses] = useState<AddressData[]>(initialAddresses);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | undefined>(
    undefined,
  );
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = useMemo(() => {
    // Check if addresses array length changed or content changed
    if (addresses.length !== initialAddresses.length) return true;
    return JSON.stringify(addresses) !== JSON.stringify(initialAddresses);
  }, [addresses, initialAddresses]);

  const handleSaveAddress = (address: AddressData) => {
    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((a) => (a.id === address.id ? address : a)),
      );
      setEditingAddress(undefined);
    } else {
      // Add new address
      setAddresses((prev) => [...prev, address]);
    }
    setOpenDialog(false);
  };

  const handleEditAddress = (address: AddressData) => {
    setEditingAddress(address);
    setOpenDialog(true);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setOpenDialog(true);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setEditingAddress(undefined);
    }
    setOpenDialog(open);
  };

  const handleSaveAddresses = async () => {
    if (!userId) {
      alert("User ID not found");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/me/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Addresses saved successfully!");
      } else {
        alert(data.message || "Failed to save addresses");
      }
    } catch (error) {
      console.error("Error saving addresses:", error);
      alert("An error occurred while saving addresses");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AddressForm
        open={openDialog}
        onOpenChange={handleCloseDialog}
        onSaveAddress={handleSaveAddress}
        initialAddress={editingAddress}
        isEditing={!!editingAddress}
      />

      <div className="border border-gray-300 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md py-4">
        <div>
          <h1 className="text-xl md:text-3xl text-[#570009] font-semibold">
            Address Details
          </h1>
          <p className="">Update your address information below.</p>
        </div>

        {addresses.length === 0 ? (
          <div className="w-full flex justify-center items-center flex-col py-8">
            <Image
              src="/no location.svg"
              alt="No addresses"
              width={100}
              height={100}
              className="mt-4"
            />
            <h2 className="text-lg font-medium mt-4">No addresses found</h2>
            <p className="text-center text-gray-500 mb-4">
              You have not added any addresses yet.
            </p>
            <Button
              onClick={handleAddNew}
              className="bg-[#570009] text-white hover:bg-[#570009]/90 cursor-pointer"
            >
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {address.line1}
                        {address.line2 && ` ${address.line2}`}
                      </h3>
                      {address.isDefault && (
                        <span className="text-xs bg-[#570009] text-white px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="p-2 hover:bg-white rounded transition"
                      title="Edit address"
                    >
                      <PencilRuler className="w-4 h-4 text-[#570009] hover:text-[#570009]/80" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 hover:bg-white rounded transition"
                      title="Delete address"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <Button
                onClick={handleAddNew}
                className="flex-1 bg-[#570009] text-white hover:bg-[#570009]/90 cursor-pointer"
              >
                Add Another Address
              </Button>

              {hasChanges && (
                <Button
                  onClick={handleSaveAddresses}
                  disabled={isSaving}
                  className="flex-1 bg-[#570009] text-white hover:bg-[#570009]/90 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Addresses"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
