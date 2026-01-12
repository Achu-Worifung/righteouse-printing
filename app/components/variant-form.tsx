"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RequiredIndicator } from "@/app/components/ui/form-essential";
import { toast } from "sonner";
import ImageUploader from "./ui/image-uploader";

type Variant = {
  sku: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  status: "enabled" | "disabled";
  images?: string[];
  imageFiles?: File[];
};

type VariantFormProps = {
  allColors: { name: string; hex: string }[];
  allSizes: string[];
  variants: Variant[];
  onVariantsChange: (variants: Variant[]) => void;
};

export default function VariantForm({
  variants,
  allColors,
  allSizes,
  onVariantsChange,
}: VariantFormProps) {
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [variantImages, setVariantImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<Variant>({
    sku: "",
    color: "",
    size: "",
    price: 0,
    quantity: 0,
    status: "enabled",
    images: [],
  });

  const resetForm = () => {
    setFormData({
      sku: "",
      color: "",
      size: "",
      price: 0,
      quantity: 0,
      status: "enabled",
      images: [],
    });
    setVariantImages([]);
    setEditingIndex(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  const handleEditVariant = (index: number) => {
    setFormData(variants[index]);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!formData.sku) errors.push("SKU is required.");
    if (!formData.color) errors.push("Color is required.");
    if (!formData.price || formData.price < 0)
      errors.push("Price must be greater than or equal to 0.");
    if (formData.quantity < 0)
      errors.push("Quantity must be greater than or equal to 0.");
    if (!formData.status) errors.push("Status is required.");
    if(!variantImages.length) errors.push("At least one image is required.");
    
    if (errors.length) {
      errors.forEach((msg) => toast.error(msg));
      return;
    }

    // Create variant with image file references
    const variantWithImages: Variant = {
      sku: formData.sku,
      color: formData.color,
      size: formData.size,
      price: formData.price,
      quantity: formData.quantity,
      status: formData.status,
      images: formData.images,
      imageFiles: variantImages,
    };

    let updatedVariants: Variant[];
    if (editingIndex !== null) {
      updatedVariants = variants.map((v, i) =>
        i === editingIndex ? variantWithImages : v
      );
      toast.success("Variant updated successfully.");
    } else {
      updatedVariants = [...variants, variantWithImages];
      toast.success("Variant added successfully.");
    }

    onVariantsChange(updatedVariants);
    handleOpenChange(false);
  };

  const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onVariantsChange(updatedVariants);
    toast.success("Variant deleted.");
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Color
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Size
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                SKU
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Stock
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-300 px-4 py-4 text-center text-gray-500"
                >
                  No variants added yet.
                </td>
              </tr>
            ) : (
              variants.map((variant, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {variant.color}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {variant.size || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {variant.sku}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${variant.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {variant.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={
                        variant.status === "enabled"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {variant.status === "enabled" ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => handleEditVariant(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => handleDeleteVariant(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button 
          disabled={allColors.length === 0 && allSizes.length === 0}
          type="button" className="disabled:cursor-not-allowed bg-teal-600 hover:bg-teal-700">
            {editingIndex !== null ? "Edit Variant" : "Add Variant"}
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[80%]">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Variant" : "Add New Variant"}
            </DialogTitle>
            <DialogDescription>
              {editingIndex !== null
                ? "Update the variant details below."
                : "Fill in the details for the new variant."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <ImageUploader
              images={variantImages}
              setImages={setVariantImages}
              single={false}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color" className="flex items-center gap-1">
                  Color <RequiredIndicator />
                </Label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 w-full"
                >
                  <option value="">Select a color</option>
                  {allColors.map((color) => (
                    <option key={color.name} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <select
                  id="size"
                  value={formData.size || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 w-full"
                >
                  <option value="">Select a size</option>
                  {allSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="flex items-center gap-1">
                  SKU <RequiredIndicator />
                </Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="e.g., PROD-BLK-M"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-1">
                  Price <RequiredIndicator />
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-1">
                  Stock Quantity <RequiredIndicator />
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "enabled" | "disabled",
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  {editingIndex !== null ? "Update Variant" : "Add Variant"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
