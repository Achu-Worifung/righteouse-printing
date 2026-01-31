"use client";

import { useMemo, useState, useId } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

type AddressFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveAddress: (address: AddressData) => void;
  initialAddress?: AddressData;
  isEditing?: boolean;
};

export function AddressForm({
  open,
  onOpenChange,
  onSaveAddress,
  initialAddress,
  isEditing = false,
}: AddressFormProps) {
  const idPrefix = useId();
  
  // Initialize state from initialAddress or empty
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const isValid = useMemo(() => {
    return (
      line1.trim().length > 2 &&
      city.trim().length > 1 &&
      state.trim().length > 1 &&
      postalCode.trim().length > 2 &&
      country.trim().length > 1
    );
  }, [line1, city, state, postalCode, country]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const id = initialAddress?.id || `${idPrefix}-addr`;
    const address: AddressData = {
      id,
      line1,
      line2: line2 || undefined,
      city,
      state,
      postalCode,
      country,
      isDefault,
      createdAt: initialAddress?.createdAt || new Date().toISOString(),
    };

    onSaveAddress(address);
    onOpenChange(false);
    resetForm();
  }

  function resetForm() {
    if (initialAddress) {
      setLine1(initialAddress.line1 || "");
      setLine2(initialAddress.line2 || "");
      setCity(initialAddress.city || "");
      setState(initialAddress.state || "");
      setPostalCode(initialAddress.postalCode || "");
      setCountry(initialAddress.country || "");
      setIsDefault(initialAddress.isDefault || false);
    } else {
      setLine1("");
      setLine2("");
      setCity("");
      setState("");
      setPostalCode("");
      setCountry("");
      setIsDefault(false);
    }
  }

  function handleClose() {
    onOpenChange(false);
    resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-2xl"
        onOpenAutoFocus={(e) => {
          // Prevent default focus and populate form with initial data
          e.preventDefault();
          // Use setTimeout to avoid React's setState warning
          setTimeout(() => resetForm(), 0);
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-left font-serif text-xl md:text-2xl text-forest tracking-tighter text-burgundy">
            {isEditing ? "Edit address" : "Add new address"}
          </DialogTitle>
          <DialogDescription>
            Enter your address details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address-line1">Address Line 1 *</Label>
            <Input
              id="address-line1"
              placeholder="123 Main Street"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              required
              autoComplete="address-line1"
              defaultValue={initialAddress?.line1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
            <Input
              id="address-line2"
              placeholder="Apt, suite, etc."
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              autoComplete="address-line2"
              defaultValue={initialAddress?.line2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                autoComplete="address-level2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                autoComplete="address-level1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code *</Label>
              <Input
                id="postal-code"
                placeholder="12345"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                autoComplete="postal-code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                autoComplete="country-name"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="default-address"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <Label htmlFor="default-address" className="cursor-pointer">
              Set as default address
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="cursor-pointer border-gray-700 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-[#570009] text-white cursor-pointer"
            >
              {isEditing ? "Update address" : "Add address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
