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

type Variant = {
  sku: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  status: "enabled" | "disabled";
  images?: string[];
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
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || []
  );
    const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [saving, setSaving] = useState(false);
  const [variants, setVariants] = useState<Variant[]>(
    initialData &&
      "variants" in initialData &&
      Array.isArray((initialData as any).variants)
      ? (initialData as any).variants
      : []
  );

  // Extract first variant data if available
  const firstVariant = variants.length > 0 ? variants[0] : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const form = event.currentTarget;
    const data = new FormData(form);

    const productName = data.get("productName")?.toString().trim();
    const price = data.get("price")?.toString().trim();
    const taxClass = data.get("taxClass")?.toString().trim();
    const category = data.get("category")?.toString().trim();
    const description = data.get("description")?.toString().trim();
    const checkpoint = data.get("checkpoint")?.toString().trim();
    const quantity = data.get("quantity")?.toString().trim();
    const color = data.get("color")?.toString().trim();
    const size = data.get("size")?.toString().trim();
    const status = data.get("status")?.toString().trim();
    const sku = data.get("sku")?.toString().trim();

    const errors: string[] = [];

    if (!productName) errors.push("Product name is required.");
    if (!price || Number(price) < 0)
      errors.push("Price is required and must be zero or greater.");
    if (!taxClass) errors.push("Select a tax class.");
    if (!category) errors.push("Select a category.");
    if (!description) errors.push("Description is required.");
    if (imageFiles.length === 0 && !initialData?.images?.length)
      errors.push("At least one image is required.");
    if (!checkpoint) errors.push("Select a stock checkpoint.");
    if (!quantity || Number(quantity) < 0)
      errors.push("Quantity is required and must be zero or greater.");
    if (!color) errors.push("Select a color.");
    if (!size) errors.push("Select a size.");
    if (!status) errors.push("Select a status.");

    if (errors.length) {
      errors.forEach((msg) => toast.error(msg));
      setSaving(false);
      return;
    }

    const body = new FormData();
    body.append("productName", productName);
    body.append("price", price);
    body.append("taxClass", taxClass);
    body.append("category", category);
    body.append("description", description);
    body.append("checkpoint", checkpoint);
    body.append("quantity", quantity);
    body.append("color", color);
    body.append("size", size);
    body.append("status", status || "");
    body.append("sku", sku || "");

    imageFiles.forEach((file) => body.append("images", file));

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

  const handleImages = (files?: FileList | null) => {
    if (!files) {
      setImagePreviews(initialData?.images || []);
      setImageFiles([]);
      return;
    }

    const next = Array.from(files).map((file) => URL.createObjectURL(file));
    setImageFiles(Array.from(files));
    setImagePreviews(next);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreviews]);

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
                  <CardTitle>Media</CardTitle>
                  <InfoIndcator message="Upload product imagery. Preview updates immediately." />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <ImageUploader
                  onImageSelect={(files) => {
                    setImageFiles(files);
                  }}
                  previewImageUrl={imageFiles.length > 0 ? imageFiles : null}
                  onRemoveImage={removeImage}
                />
              </CardContent>
            </Card>

            {initialData && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>Variants</CardTitle>
                    <InfoIndcator message="Manage product variants with different colors, sizes, prices, and stock levels." />
                  </div>
                </CardHeader>
                <CardContent>
                  <VariantForm
                    variants={variants}
                    onVariantsChange={setVariants}
                  />
                </CardContent>
              </Card>
            )}
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
