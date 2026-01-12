"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RequiredIndicator,
  InfoIndcator,
} from "@/app/components/ui/form-essential";
import { toast } from "sonner";
import { InsertProductPayLoad } from "@/lib/types";
import VariantForm from "@/app/components/variant-form";
import ImageUploader from "./ui/image-uploader";
import { Checkbox } from "@/components/ui/checkbox";

type Variant = {
  sku: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  status: "enabled" | "disabled";
  images?: string[];
  imageFiles?: File[]; // Add this to track the File objects
};

type ProductFormProps = {
  initialData?: InsertProductPayLoad | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function ProductForm({
  initialData,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  // Product-level images (separate from variant images)
  const [allColors, setAllCColors] = useState<{ name: string; hex: string }[]>([]);
  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [allSizes , setAllSizes] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>(
    initialData &&
      "variants" in initialData &&
      Array.isArray((initialData as any).variants)
      ? (initialData as any).variants
      : []
  );
  console.log("Initial  data:", initialData?.taxClass);

  // Extract first variant data if available
  const firstVariant = variants.length > 0 ? variants[0] : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const form = event.currentTarget;
    const data = new FormData(form);

    const productName = data.get("productName")?.toString().trim();
    const status = data.get("status")?.toString().trim();
    const price = data.get("price")?.toString().trim();
    const taxClass = data.get("taxClass")?.toString().trim();
    const category = data.get("category")?.toString().trim();
    const sku = data.get("sku")?.toString().trim();
    const description = data.get("description")?.toString().trim();

    const errors: string[] = [];
    
    if (!productName) errors.push("Product name is required.");
    if (!price || Number(price) < 0)
      errors.push("Price is required and must be zero or greater.");
    if (!taxClass) errors.push("Select a tax class.");
    if (!category) errors.push("Select a category.");
    if (!description) errors.push("Description is required.");
    if (!sku) errors.push("SKU is required.");
    if (!status) errors.push("Status is required.");

    if(allSizes.length === 0) errors.push("At least one size must be selected.");
    if(allColors.length === 0) errors.push("At least one color must be added.");
    if (variants.length === 0) errors.push("At least one variant is required.");
    if (errors.length) {
      errors.forEach((msg) => toast.error(msg));
      setSaving(false);
      return;
    }

    const body = new FormData();
    body.append("productName", productName!);
    body.append("price", price!);
    body.append("taxClass", taxClass!);
    body.append("category", category!);
    body.append("description", description!);
    body.append("sku", sku!);
    body.append("status", status!);
    allSizes.forEach((size) => body.append("productAvailableSizes", size));
    allColors.forEach((color) =>
      body.append("productAvailableColors", JSON.stringify(color))
    );                                                

    // Prepare variant data and images
    variants.forEach((variant, index) => {
      // Add variant image files with index
      if (variant.imageFiles && variant.imageFiles.length > 0) {
        variant.imageFiles.forEach((file) => {
          body.append(`variantImages_${index}`, file);
        });
      }


      // Create variant metadata without the File objects
      const variantData = {
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        price: variant.price,
        quantity: variant.quantity,
        status: variant.status,
        imageCount: variant.imageFiles?.length || 0,
      };

      body.append("variants", JSON.stringify(variantData));
    });

    try {
      const res = await fetch("/api/add-new-item", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to add product");
      }

      toast.success("Product added successfully.");
      if (onSuccess) onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center flex-1 px-4 py-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {initialData ? "Edit Product" : "Create a new product"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Provide the essential details and inventory settings below.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button type="submit" form="add-product-form" disabled={saving}>
              {saving ? (
                <svg
                  className="mr-3 size-5 animate-spin ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Save Product"
              )}
            </Button>
          </div>
        </div>

        <form
          id="add-product-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1  gap-6"
        >
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Product Details</CardTitle>
                  <InfoIndcator message="Core product information shown to customers." />
                </div>
                <CardDescription>
                  All fields are required unless noted.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Product Name <RequiredIndicator />
                    </Label>
                    <Input
                      name="productName"
                      placeholder="e.g. Classic Cotton Tee"
                      defaultValue={initialData?.productName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Status <RequiredIndicator />
                    </Label>
                    <select
                      name="status"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      defaultValue={initialData?.status || ""}
                    >
                      <option value="">Select status</option>
                      <option value="standard">Enabled</option>
                      <option value="reduced">Disabled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Price <RequiredIndicator />
                    </Label>
                    <Input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      defaultValue={initialData?.price}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Tax Class <RequiredIndicator />
                    </Label>
                    <select
                      name="taxClass"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      defaultValue={initialData?.taxClass || ""}
                    >
                      <option value="">Select tax class</option>
                      <option value="standard">Standard</option>
                      <option value="reduced">Reduced</option>
                      <option value="exempt">Exempt</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Category <RequiredIndicator />
                    </Label>
                    <select
                      name="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      defaultValue={initialData?.category}
                    >
                      <option value="">Choose category</option>
                      <option value="tshirt">T-Shirt</option>
                      <option value="long-sleeve">Long Sleeve</option>
                      <option value="jersey">Jersey</option>
                      <option value="hoodie">Hoodie</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      SKU <RequiredIndicator />
                    </Label>
                    <Input
                      name="sku"
                      placeholder="e.g. COTTEE-001"
                      defaultValue={firstVariant?.sku || initialData?.sku || ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <Label className="">
                      All Available Sizes <RequiredIndicator />
                    </Label>
                    <div className="space-y-2 flex gap-3 items-baseline justify-start flex-wrap">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                          key={size}
                          className="flex align-center flex-col items-center cursor-pointer justify-center gap-1"
                        >
                          <Checkbox
                            id={`size-${size}`}
                            value={size}
                            defaultChecked={initialData?.productAvailableSizes?.includes(
                              size
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setAllSizes([...allSizes, size]);
                              } else {
                                setAllSizes(allSizes.filter((s) => s !== size));
                              }
                            }}
                            className="cursor-pointer data-[state=unchecked]:border-black data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                          />
                          <Label
                            htmlFor={`size-${size}`}
                            className="cursor-pointer"
                          >
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      All Available Colors <RequiredIndicator />
                    </Label>
                    <div className="grid grid-cols-12 gap-2 items-end">
                      <span className="col-span-3 flex items-start flex-col">
                        <label htmlFor="background" className="text-sm mb-1">Choose a color</label>
                        <input
                          type="color"
                          id="background"
                          name="background"
                          value={colorHex}
                          onChange={(e) => setColorHex(e.target.value)}
                          className="w-full h-10 rounded border border-input cursor-pointer"
                        />
                      </span>

                      <span className="col-span-6 gap-1 flex flex-col">
                        <Label className="flex items-center gap-1">
                          Color Name <RequiredIndicator />
                        </Label>
                        <Input
                          name="colorName"
                          placeholder="eg. Lavender Red"
                          value={colorName}
                          onChange={(e) => setColorName(e.target.value)}
                        />
                      </span>
                      <Button
                        type="button"
                        className="col-span-3"
                        onClick={() => {
                          if (!colorName.trim()) {
                            toast.error("Color name cannot be empty.");
                            return;
                          }
                          if (!colorHex) {
                            toast.error("Select a color.");
                            return;
                          }
                          console.log("Adding color:", colorName, colorHex);
                          setAllCColors([...allColors, { name: colorName, hex: colorHex }]);
                          setColorName("");
                          setColorHex("#000000");
                        }}
                      >Add Color</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {allColors.map((color, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 border rounded-md"
                        >
                          <div
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm">{color.name}</span>
                          <button
                            type="button"
                            onClick={() => setAllCColors(allColors.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Description <RequiredIndicator />
                    <InfoIndcator message="A concise, customer-facing summary." />
                  </Label>
                  <textarea
                    name="description"
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Describe the product's key features, materials, and care instructions"
                    defaultValue={initialData?.description}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Variants</CardTitle>
                  <InfoIndcator message="Manage product variants with different colors, sizes, prices, and stock levels." />
                </div>
              </CardHeader>
              <p className="px-6 text-sm text-muted-foreground">
                Please ensure all colors and sizes are defined above before
                adding variants.
              </p>
              <CardContent>
                <VariantForm
                  allColors={allColors}
                  allSizes={allSizes}
                  variants={variants}
                  onVariantsChange={setVariants}
                />
              </CardContent>
            </Card>
          </div>
        </form>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" form="add-product-form" disabled={saving}>
            {saving ? (
              <svg
                className="mr-3 size-5 animate-spin ..."
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Save Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
